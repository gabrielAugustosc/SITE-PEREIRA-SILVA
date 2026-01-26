import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { ImagemDeSeguranca } from '../common/ImagemDeSeguranca';
import FundoImg from '/assets/ImagemFundoHero.png'
import Logo from '/assets/logo.png';
import Bpc from '/assets/bpc.jpg';

export function Hero() {
  return (
    <section id="home" className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <ImagemDeSeguranca
          src={FundoImg} alt="Escritório de advocacia" className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2E0506] via-[#5E0D13]/95 to-[#5E0D13]/80"></div>
      </div>

      {/* Swiper Carousel */}
      <div className="relative z-10 w-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center">
        <Swiper
          pagination={{
            type: 'progressbar',
          }}
          navigation={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="w-full flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-3 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-24">
              {/* Logo */}
              <div className="flex-1 flex justify-center lg:justify-end mb-6 lg:mb-0 max-w-xs">
                <img src={Logo} alt="Logo" className="max-h-64 w-auto" style={{ maxWidth: '320px' }} />
              </div>
              {/* Textos */}
              <div className="flex-1 flex flex-col justify-center text-center lg:text-left max-w-2xl lg:pl-12">
                <h1 className="break-words text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-[#DCC48F] mb-3 sm:mb-4 leading-tight font-bold">
                  Protegendo seus
                  <span className="block text-white mt-1 sm:mt-2">Direitos e Interesses</span>
                </h1>
                <p className="break-words text-sm sm:text-base md:text-xl lg:text-2xl text-[#DCC48F]/90 leading-relaxed">
                  Oferecemos soluções jurídicas personalizadas e estratégicas com mais de 10 anos de experiência. Nossa equipe está comprometida com a excelência e os melhores resultados para nossos clientes.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-3 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-24">
              {/* Logo */}
              <div className="flex-1 flex justify-center lg:justify-end mb-6 lg:mb-0 max-w-xs">
                <img src={Logo} alt="Logo" className="max-h-64 w-auto" style={{ maxWidth: '320px' }} />
              </div>
              {/* Textos */}
              <div className="flex-1 flex flex-col justify-center text-center lg:text-left max-w-2xl lg:pl-12">
                <h1 className="break-words text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-[#DCC48F] mb-3 sm:mb-4 leading-tight font-bold">
                  Protegendo seus
                  <span className="block text-white mt-1 sm:mt-2">VAI CORINTHIANSS</span>
                </h1>
                <p className="break-words text-sm sm:text-base md:text-xl lg:text-2xl text-[#DCC48F]/90 leading-relaxed">
                  Oferecemos goleados e humilhações
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-3 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-24">
              {/* Logo */}
              <div className="flex-1 flex justify-center lg:justify-end mb-6 lg:mb-0 max-w-xs">
                <img src={Bpc} alt="Logo" className="max-h-64 w-auto" style={{ maxWidth: '320px' }} />
              </div>
              {/* Textos */}
              <div className="flex-1 flex flex-col justify-center text-center lg:text-left max-w-2xl lg:pl-12">
                <h1 className="break-words text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-[#DCC48F] mb-3 sm:mb-4 leading-tight font-bold">
                  Protegendo seus
                  <span className="block text-white mt-1 sm:mt-2">VAI CORINTHIANSS</span>
                </h1>
                <p className="break-words text-sm sm:text-base md:text-xl lg:text-2xl text-[#DCC48F]/90 leading-relaxed">
                  Oferecemos goleados e humilhações
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-3 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-24">
              {/* Logo */}
              <div className="flex-1 flex justify-center lg:justify-end mb-6 lg:mb-0 max-w-xs">
                <img src={Logo} alt="Logo" className="max-h-64 w-auto" style={{ maxWidth: '320px' }} />
              </div>
              {/* Textos */}
              <div className="flex-1 flex flex-col justify-center text-center lg:text-left max-w-2xl lg:pl-12">
                <h1 className="break-words text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-[#DCC48F] mb-3 sm:mb-4 leading-tight font-bold">
                  Protegendo seus
                  <span className="block text-white mt-1 sm:mt-2">VAI CORINTHIANSS</span>
                </h1>
                <p className="break-words text-sm sm:text-base md:text-xl lg:text-2xl text-[#DCC48F]/90 leading-relaxed">
                  Oferecemos goleados e humilhações
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
