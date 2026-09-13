import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Banner, BannerFormData, ImageElementStyle, TextElementStyle } from '../types/banner';

interface BannerContextType {
  banners: Banner[];
  addBanner: (data: BannerFormData) => void;
  updateBanner: (id: string, data: Partial<BannerFormData>) => void;
  deleteBanner: (id: string) => void;
  toggleBannerActive: (id: string) => void;
  resetToDefaults: () => void;
}

const STORAGE_KEY = 'pereira_silva_banners';

export const DEFAULT_IMAGE_STYLE: ImageElementStyle = {
  scale: 1,
  x: 0,
  y: 0,
  rotation: 0,
};

export const DEFAULT_TITLE_STYLE: TextElementStyle = {
  fontSize: 48,
  textAlign: 'left',
  x: 0,
  y: 0,
  color: '#DCC48F',
};

export const DEFAULT_SUBTITLE_STYLE: TextElementStyle = {
  fontSize: 18,
  textAlign: 'left',
  x: 0,
  y: 0,
  color: 'rgba(220, 196, 143, 0.9)',
};

// Banners padrão profissionais do escritório
export const DEFAULT_BANNERS: Banner[] = [
  {
    id: 'banner_01',
    title: 'Protegendo seus Direitos e Interesses',
    subtitle:
      'Oferecemos soluções jurídicas personalizadas e estratégicas com mais de 10 anos de experiência. Nossa equipe está comprometida com a excelência e os melhores resultados para nossos clientes.',
    imageUrl: '/assets/logo.png',
    active: true,
    createdAt: '2025-01-01T10:00:00.000Z',
    imageStyle: { scale: 1, x: 0, y: 0, rotation: 0 },
    titleStyle: { fontSize: 48, textAlign: 'left', x: 0, y: 0, color: '#DCC48F' },
    subtitleStyle: { fontSize: 18, textAlign: 'left', x: 0, y: 0, color: 'rgba(220, 196, 143, 0.9)' },
  },
  {
    id: 'banner_02',
    title: 'Especialistas em Benefícios Previdenciários e BPC/LOAS',
    subtitle:
      'Atuação técnica e humanizada para garantir o amparo legal às pessoas com deficiência e idosos. Defendemos os seus direitos perante a Previdência Social.',
    imageUrl: '/assets/bpc.jpg',
    active: true,
    createdAt: '2025-01-02T10:00:00.000Z',
    imageStyle: { scale: 1.2, x: 0, y: 0, rotation: 0 },
    titleStyle: { fontSize: 44, textAlign: 'left', x: 0, y: 0, color: '#DCC48F' },
    subtitleStyle: { fontSize: 18, textAlign: 'left', x: 0, y: 0, color: 'rgba(220, 196, 143, 0.9)' },
  },
  {
    id: 'banner_03',
    title: 'Soluções Estratégicas em Direito Civil e Trabalhista',
    subtitle:
      'Assessoria jurídica consultiva e contenciosa de alto padrão, focada em segurança jurídica e resolução eficaz de litígios.',
    imageUrl: '/assets/logo.png',
    active: true,
    createdAt: '2025-01-03T10:00:00.000Z',
    imageStyle: { scale: 1, x: 0, y: 0, rotation: 0 },
    titleStyle: { fontSize: 48, textAlign: 'left', x: 0, y: 0, color: '#DCC48F' },
    subtitleStyle: { fontSize: 18, textAlign: 'left', x: 0, y: 0, color: 'rgba(220, 196, 143, 0.9)' },
  },
];

const BannerContext = createContext<BannerContextType | undefined>(undefined);

export function BannerProvider({ children }: { children: ReactNode }) {
  const [banners, setBanners] = useState<Banner[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Erro ao ler banners do localStorage:', e);
    }
    return DEFAULT_BANNERS;
  });

  // Salva no localStorage sempre que houver mudanças
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(banners));
    } catch (e) {
      console.error('Erro ao salvar banners no localStorage:', e);
    }
  }, [banners]);

  const addBanner = (data: BannerFormData) => {
    const newBanner: Banner = {
      ...data,
      id: `banner_${Date.now()}`,
      createdAt: new Date().toISOString(),
      imageStyle: data.imageStyle || { ...DEFAULT_IMAGE_STYLE },
      titleStyle: data.titleStyle || { ...DEFAULT_TITLE_STYLE },
      subtitleStyle: data.subtitleStyle || { ...DEFAULT_SUBTITLE_STYLE },
    };
    setBanners((prev) => [newBanner, ...prev]);
  };

  const updateBanner = (id: string, data: Partial<BannerFormData>) => {
    setBanners((prev) =>
      prev.map((banner) => (banner.id === id ? { ...banner, ...data } : banner))
    );
  };

  const deleteBanner = (id: string) => {
    setBanners((prev) => prev.filter((banner) => banner.id !== id));
  };

  const toggleBannerActive = (id: string) => {
    setBanners((prev) =>
      prev.map((banner) =>
        banner.id === id ? { ...banner, active: !banner.active } : banner
      )
    );
  };

  const resetToDefaults = () => {
    setBanners(DEFAULT_BANNERS);
  };

  return (
    <BannerContext.Provider
      value={{
        banners,
        addBanner,
        updateBanner,
        deleteBanner,
        toggleBannerActive,
        resetToDefaults,
      }}
    >
      {children}
    </BannerContext.Provider>
  );
}

export function useBanners() {
  const context = useContext(BannerContext);
  if (!context) {
    throw new Error('useBanners deve ser utilizado dentro de um <BannerProvider>');
  }
  return context;
}
