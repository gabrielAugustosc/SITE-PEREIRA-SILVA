
import { Award, Users, TrendingUp, Shield } from 'lucide-react';

export function About() {
  const stats = [
    { icon: Award, value: '10+', label: 'Anos de Experiência' },
    { icon: Users, value: '300+', label: 'Clientes Atendidos' },
    { icon: TrendingUp, value: '95%', label: 'Taxa de Sucesso' },
    { icon: Shield, value: '100%', label: 'Confidencialidade' }
  ];

  return (
    <section id="about" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#5E0D13] mb-3 sm:mb-4">
            Sobre Nosso Escritório
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-[#AC8B57] mx-auto mb-4 sm:mb-6"></div>
          <p className="text-sm xs:text-base sm:text-lg text-gray-700 max-w-3xl mx-auto">
            Somos um escritório de advocacia reconhecido por nossa dedicação, ética profissional 
            e comprometimento com os melhores resultados para nossos clientes.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-[#5E0D13] to-[#2E0506] p-3 xs:p-4 sm:p-5 md:p-6 rounded-lg text-center border-2 border-[#AC8B57] hover:scale-105 transition-transform"
              >
                <Icon className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#DCC48F] mx-auto mb-2 sm:mb-3 md:mb-4" />
                <div className="text-xl xs:text-2xl sm:text-3xl text-[#AC8B57] mb-1 sm:mb-2">{stat.value}</div>
                <div className="text-[10px] xs:text-xs sm:text-sm text-[#DCC48F]">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* About Content */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          <div>
            <h3 className="text-xl xs:text-2xl sm:text-3xl text-[#5E0D13] mb-3 sm:mb-4 md:mb-6">
              Tradição e Excelência Jurídica
            </h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              O escritório Pereira & Silva tem sido um pilar de confiança 
              e excelência no mercado jurídico. Nossos advogados altamente qualificados 
              trabalham incansavelmente para proteger os direitos e interesses de nossos clientes.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Especializamos-nos em diversas áreas do direito, oferecendo soluções personalizadas 
              e estratégicas que atendem às necessidades específicas de cada cliente, seja pessoa 
              física ou jurídica.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Nossa missão é fornecer assessoria jurídica de alto nível, pautada pela ética e 
              transparência.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#5E0D13] to-[#2E0506] p-4 xs:p-5 sm:p-6 md:p-8 rounded-lg border-2 border-[#AC8B57]">
            <h4 className="text-lg xs:text-xl sm:text-2xl text-[#DCC48F] mb-3 sm:mb-4 md:mb-6">Nossos Valores</h4>
            <ul className="space-y-4">
              {[
                'Ética e integridade profissional',
                'Excelência no atendimento',
                'Compromisso com resultados',
                'Atualização constante',
                'Relacionamento de confiança',
                'Responsabilidade social'
              ].map((value, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#AC8B57] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-[#DCC48F]">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
