import { practiceAreas } from '../../data/practiceAreas';

export function PracticeAreas() {
  return (
    <section id="areas" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#5E0D13] mb-3 sm:mb-4">
            Áreas de Atuação
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-[#AC8B57] mx-auto mb-4 sm:mb-6"></div>
          <p className="text-sm xs:text-base sm:text-lg text-gray-700 max-w-3xl mx-auto">
            Oferecemos soluções jurídicas especializadas em diversas áreas do direito, 
            sempre com foco na excelência e nos melhores resultados.
          </p>
        </div>

        {/* Areas Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {practiceAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <div
                key={index}
                className="group bg-white p-4 xs:p-5 sm:p-6 md:p-8 rounded-lg border-2 border-[#AC8B57]/20 hover:border-[#AC8B57] hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="bg-gradient-to-br from-[#5E0D13] to-[#2E0506] w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mb-3 xs:mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-[#DCC48F]" />
                </div>
                <h3 className="text-base xs:text-lg sm:text-xl text-[#5E0D13] mb-2 sm:mb-3">
                  {area.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {area.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 bg-gradient-to-r from-[#5E0D13] to-[#2E0506] p-4 xs:p-5 sm:p-6 md:p-8 lg:p-12 rounded-lg text-center border-2 border-[#AC8B57]">
          <h3 className="text-xl xs:text-2xl sm:text-3xl text-[#DCC48F] mb-3 sm:mb-4">
            Não encontrou sua necessidade?
          </h3>
          <p className="text-[#DCC48F]/80 mb-6 max-w-2xl mx-auto">
            Nossa equipe está preparada para atender diversas outras demandas jurídicas. 
            Entre em contato para uma consulta personalizada.
          </p>
          <a 
            href="https://wa.me/5511984208056?text=Olá,%20gostaria%20de%20falar%20com%20um%20advogado" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-[#AC8B57] hover:bg-[#DCC48F] text-[#2E0506] px-8 py-3 rounded-lg transition-all font-medium"
          >
            Fale com um Advogado
          </a>
        </div>
      </div>
    </section>
  );
}
