import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useBanners } from '../../contexts/BannerContext';
import { HeroSlideContent } from '../common/HeroSlideContent';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { ImagemDeSeguranca } from '../common/ImagemDeSeguranca';
import FundoImg from '/assets/ImagemFundoHero.png';
import Logo from '/assets/logo.png';

export function Hero() {
  const { banners } = useBanners();
  const activeBanners = banners.filter((b) => b.active);

  // Fallback caso todos os banners tenham sido desativados
  const displayBanners =
    activeBanners.length > 0
      ? activeBanners
      : [
          {
            id: 'fallback_01',
            title: 'Protegendo seus Direitos e Interesses',
            subtitle:
              'Oferecemos soluções jurídicas personalizadas e estratégicas com mais de 10 anos de experiência. Nossa equipe está comprometida com a excelência e os melhores resultados para nossos clientes.',
            imageUrl: Logo,
            active: true,
            createdAt: '',
          },
        ];

  return (
    <section id="home" className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <ImagemDeSeguranca
          src={FundoImg}
          alt="Escritório de advocacia"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2E0506] via-[#5E0D13]/95 to-[#5E0D13]/80"></div>
      </div>

      {/* Swiper Carousel Dinâmico com suporte aos estilos visuais do editor */}
      <div className="relative z-10 w-full h-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
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
          className="mySwiper w-full h-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px]"
        >
          {displayBanners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <HeroSlideContent
                title={banner.title}
                subtitle={banner.subtitle}
                imageUrl={banner.imageUrl}
                imageStyle={banner.imageStyle}
                titleStyle={banner.titleStyle}
                subtitleStyle={banner.subtitleStyle}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
