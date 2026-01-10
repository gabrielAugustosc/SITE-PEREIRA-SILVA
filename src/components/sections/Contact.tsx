import { MapPin } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import DOMPurify from 'dompurify';
import validator from 'validator';
import { ContactFormData } from '../../types/contact';
import { contactInfo } from '../../data/contact';

export function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!executeRecaptcha) {
      toast.error('reCAPTCHA não está pronto. Tente novamente.');
      return;
    }

    // Validações de segurança
    if (!validator.isEmail(formData.email)) {
      toast.error('Por favor, insira um e-mail válido.');
      return;
    }

    if (formData.phone && !validator.isMobilePhone(formData.phone, 'pt-BR')) {
      toast.error('Por favor, insira um telefone válido.');
      return;
    }

    if (formData.message.length < 10) {
      toast.error('A mensagem deve ter pelo menos 10 caracteres.');
      return;
    }

    if (formData.message.length > 1000) {
      toast.error('A mensagem não pode ter mais de 1000 caracteres.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Executa o reCAPTCHA v3
      const token = await executeRecaptcha('contact_form');
      
      if (!token) {
        toast.error('Falha na verificação de segurança. Tente novamente.');
        setIsSubmitting(false);
        return;
      }

      // Sanitiza os dados para prevenir XSS
      const sanitizedData = {
        name: DOMPurify.sanitize(formData.name, { ALLOWED_TAGS: [] }),
        email: DOMPurify.sanitize(formData.email, { ALLOWED_TAGS: [] }),
        phone: DOMPurify.sanitize(formData.phone, { ALLOWED_TAGS: [] }),
        subject: DOMPurify.sanitize(formData.subject, { ALLOWED_TAGS: [] }),
        message: DOMPurify.sanitize(formData.message, { ALLOWED_TAGS: [] }),
      };

      // Configurações do EmailJS vindas das variáveis de ambiente
      const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      const templateParams = {
        from_name: sanitizedData.name,
        from_email: sanitizedData.email,
        phone: sanitizedData.phone,
        subject: sanitizedData.subject,
        message: sanitizedData.message,
        to_name: 'Pereira-Silva',
        'g-recaptcha-response': token,
      };

      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      
      toast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
    } catch (error) {
      toast.error('Erro ao enviar mensagem. Por favor, tente novamente.');
      console.error('Erro ao enviar email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#5E0D13] mb-3 sm:mb-4">
            Entre em Contato
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-[#AC8B57] mx-auto mb-4 sm:mb-6"></div>
          <p className="text-sm xs:text-base sm:text-lg text-gray-700 max-w-3xl mx-auto">
            Estamos prontos para ajudá-lo. Entre em contato conosco para agendar uma consulta 
            ou tirar suas dúvidas.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {/* Contact Form */}
          <div className="bg-white p-4 xs:p-5 sm:p-6 md:p-8 rounded-lg border-2 border-[#AC8B57]/20 shadow-lg">
            <h3 className="text-xl xs:text-2xl text-[#5E0D13] mb-4 sm:mb-6">
              Envie sua Mensagem
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm sm:text-base text-gray-700 mb-1 sm:mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:border-[#AC8B57] focus:outline-none transition-colors"
                  placeholder="Seu nome completo"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#AC8B57] focus:outline-none transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#AC8B57] focus:outline-none transition-colors"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-gray-700 mb-2">
                  Assunto *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#AC8B57] focus:outline-none transition-colors"
                >
                  <option value="">Selecione um assunto</option>
                  <option value="trabalhista">Direito Trabalhista</option>
                  <option value="familia">Direito de Família</option>
                  <option value="civil">Direito Civil</option>
                  <option value="penal">Direito Penal</option>
                  <option value="assessoria">Assessoria Jurídica</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">
                  Mensagem *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#AC8B57] focus:outline-none transition-colors resize-none"
                  placeholder="Descreva sua necessidade..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#5E0D13] to-[#2E0506] hover:from-[#70522B] hover:to-[#5E0D13] text-[#DCC48F] py-4 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 sm:space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-r from-[#5E0D13] to-[#2E0506] p-4 xs:p-5 sm:p-6 rounded-lg border-2 border-[#AC8B57] flex gap-3 sm:gap-4"
                >
                  <div className="bg-[#AC8B57] w-10 h-10 xs:w-12 xs:h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-[#2E0506]" />
                  </div>
                  <div>
                    <h4 className="text-[#DCC48F] mb-2">{info.title}</h4>
                    <p className="text-[#DCC48F]/80 whitespace-pre-line text-sm">
                      {info.content}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Map Placeholder */}
            <div className="bg-gray-200 h-64 rounded-lg overflow-hidden border-2 border-[#AC8B57]">
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                <MapPin className="w-12 h-12 text-[#AC8B57]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
