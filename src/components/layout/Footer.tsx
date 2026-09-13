import { Scale, Instagram, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    escritorio: [
      { label: 'Sobre Nós', href: '#about' },
      { label: 'Nossa Equipe', href: '#team' },
      { label: 'Áreas de Atuação', href: '#areas' },
    ],
    servicos: [
      { label: 'Assessoria e Consultoria Jurídica', href: 'https://wa.me/5511984208056?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20assessoria%20e%20consultoria%20jurídica' },
      { label: 'Palestra', href: 'https://wa.me/5511984208056?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20as%20palestras%20de%20vocês' },
      { label: 'Formações', href: 'https://wa.me/5511984208056?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20as%20formações%20' },
    ],
    contato: [
      { label: 'Fale Conosco', href: '#contact' },
    ]
  };

  return (
    <footer className="bg-gradient-to-b from-[#2E0506] to-[#5E0D13] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        {/* Main Footer Content */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-10 md:mb-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#AC8B57] p-2 rounded-md">
                <Scale className="w-6 h-6 text-[#2E0506]" />
              </div>
              <div>
                <h3 className="text-[#DCC48F] text-lg">Pereira & Silva</h3>
                <p className="text-[#AC8B57] text-xs">Advocacia e Consultoria</p>
              </div>
            </div>
            <p className="text-[#DCC48F]/70 text-sm mb-4">
              Excelência jurídica com mais de 10 anos de tradição, 
              protegendo os direitos e interesses de nossos clientes.
            </p>
            <div className="flex gap-3">
              <button className="bg-[#AC8B57] hover:bg-[#DCC48F] text-[#2E0506] p-2 rounded transition-colors">
                <Instagram className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Escritório Links */}
          <div>
            <h4 className="text-[#DCC48F] mb-4">Escritório</h4>
            <ul className="space-y-2">
              {footerLinks.escritorio.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-[#DCC48F]/70 hover:text-[#AC8B57] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Serviços Links */}
          <div>
            <h4 className="text-[#DCC48F] mb-4">Serviços</h4>
            <ul className="space-y-2">
              {footerLinks.servicos.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#DCC48F]/70 hover:text-[#AC8B57] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato Links */}
          <div>
            <h4 className="text-[#DCC48F] mb-4">Informações</h4>
            <ul className="space-y-2">
              {footerLinks.contato.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-[#DCC48F]/70 hover:text-[#AC8B57] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#70522B] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#DCC48F]/60 text-sm text-center md:text-left">
              © {currentYear} Pereira & Silva. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4">
              <p className="text-[#DCC48F]/60 text-sm text-center md:text-right">
                OAB/SP - Inscrição Principal: 398.623
              </p>
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 text-xs text-[#DCC48F]/40 hover:text-[#DCC48F] transition-colors pl-3 border-l border-[#70522B]/60"
                title="Acesso Administrativo"
              >
                <Lock className="w-3 h-3" />
                <span>Área Restrita</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
