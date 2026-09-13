export interface ImageElementStyle {
  scale: number;       // Zoom / Escala (ex: 1.0 = 100%)
  x: number;           // Deslocamento X em px
  y: number;           // Deslocamento Y em px
  rotation: number;    // Rotação em graus (-180 a 180)
}

export interface TextElementStyle {
  fontSize: number;    // Tamanho da fonte em px
  textAlign: 'left' | 'center' | 'right';
  x: number;           // Deslocamento X em px
  y: number;           // Deslocamento Y em px
  color?: string;      // Cor do texto (hex)
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  active: boolean;
  createdAt: string;

  // Propriedades visuais estilo Canva
  imageStyle?: ImageElementStyle;
  titleStyle?: TextElementStyle;
  subtitleStyle?: TextElementStyle;
}

export type BannerFormData = Omit<Banner, 'id' | 'createdAt'>;
