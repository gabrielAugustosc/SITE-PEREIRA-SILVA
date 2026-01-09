import { ImagemDeSeguranca } from '../common/ImagemDeSeguranca';
import FundoImg from '/assets/ImagemFundoHero.png'
import Logo from '/assets/logo.png';

export function Hero() {
  return (
    <section id="home" className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <ImagemDeSeguranca
          src={FundoImg} alt="Escritório de advocacia"className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2E0506] via-[#5E0D13]/95 to-[#5E0D13]/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-24">
        <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8 max-w-5xl">
          
          <img src={Logo} alt="Logo" className="h-24 w-24 xs:h-28 xs:w-28 sm:h-36 sm:w-36 md:h-44 md:w-44 lg:h-52 lg:w-52 xl:h-56 xl:w-56 flex-shrink-0"/>

          <div className="flex flex-col justify-center text-center md:text-left">
            <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#DCC48F] mb-2 sm:mb-3 leading-tight">
              Protegendo seus
              <span className="block text-white mt-0.5 sm:mt-1">Direitos e Interesses</span>
            </h1>
            
            <p className="text-xs xs:text-sm sm:text-base md:text-lg text-[#DCC48F]/90 leading-relaxed">
              Oferecemos soluções jurídicas personalizadas e estratégicas com mais de 10 anos de experiência. Nossa equipe está comprometida com a excelência e os melhores resultados para nossos clientes.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
