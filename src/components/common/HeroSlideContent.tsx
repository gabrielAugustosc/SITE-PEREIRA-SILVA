import { ImageElementStyle, TextElementStyle } from '../../types/banner';
import {
  DEFAULT_IMAGE_STYLE,
  DEFAULT_TITLE_STYLE,
  DEFAULT_SUBTITLE_STYLE,
} from '../../contexts/BannerContext';

interface HeroSlideContentProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  imageStyle?: ImageElementStyle;
  titleStyle?: TextElementStyle;
  subtitleStyle?: TextElementStyle;
  isEditing?: boolean;
  selectedElement?: 'image' | 'title' | 'subtitle' | null;
  onSelectElement?: (element: 'image' | 'title' | 'subtitle') => void;
}

export function HeroSlideContent({
  title,
  subtitle,
  imageUrl,
  imageStyle = DEFAULT_IMAGE_STYLE,
  titleStyle = DEFAULT_TITLE_STYLE,
  subtitleStyle = DEFAULT_SUBTITLE_STYLE,
  isEditing = false,
  selectedElement = null,
  onSelectElement,
}: HeroSlideContentProps) {
  const imgStyle = imageStyle || DEFAULT_IMAGE_STYLE;
  const tStyle = titleStyle || DEFAULT_TITLE_STYLE;
  const subStyle = subtitleStyle || DEFAULT_SUBTITLE_STYLE;

  return (
    <div className="w-full flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-24 select-none">
      {/* Coluna 1: Imagem com estilos visuais */}
      <div className="flex-1 flex justify-center lg:justify-end mb-6 lg:mb-0 max-w-sm">
        <div
          onClick={(e) => {
            if (isEditing && onSelectElement) {
              e.stopPropagation();
              onSelectElement('image');
            }
          }}
          style={{
            transform: `translate(${imgStyle.x}px, ${imgStyle.y}px) scale(${imgStyle.scale}) rotate(${imgStyle.rotation}deg)`,
            transformOrigin: 'center center',
          }}
          className={`relative inline-block transition-transform duration-75 ${
            isEditing ? 'cursor-pointer p-1.5 rounded-xl' : ''
          } ${
            isEditing && selectedElement === 'image'
              ? 'ring-2 ring-dashed ring-[#DCC48F] bg-black/20 shadow-2xl'
              : isEditing
              ? 'hover:ring-1 hover:ring-dashed hover:ring-[#DCC48F]/50'
              : ''
          }`}
        >
          {isEditing && selectedElement === 'image' && (
            <>
              <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#DCC48F] border border-black rounded-sm shadow pointer-events-none" />
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#DCC48F] border border-black rounded-sm shadow pointer-events-none" />
              <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[#DCC48F] border border-black rounded-sm shadow pointer-events-none" />
              <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#DCC48F] border border-black rounded-sm shadow pointer-events-none" />
              <span className="absolute -top-6 left-0 px-2 py-0.5 rounded bg-[#DCC48F] text-black text-[10px] font-black uppercase shadow tracking-wider whitespace-nowrap pointer-events-none">
                Imagem
              </span>
            </>
          )}

          <img
            src={imageUrl}
            alt={title}
            className="max-h-64 sm:max-h-72 md:max-h-80 w-auto object-contain drop-shadow-2xl pointer-events-none"
            style={{
              maxWidth: '360px',
            }}
          />
        </div>
      </div>

      {/* Coluna 2: Textos */}
      <div className="flex-1 flex flex-col justify-center text-center lg:text-left max-w-2xl lg:pl-12">
        {/* Título */}
        <div
          onClick={(e) => {
            if (isEditing && onSelectElement) {
              e.stopPropagation();
              onSelectElement('title');
            }
          }}
          style={{
            transform: `translate(${tStyle.x}px, ${tStyle.y}px)`,
          }}
          className={`relative transition-transform duration-75 ${
            isEditing ? 'cursor-pointer p-1 rounded-lg' : ''
          } ${
            isEditing && selectedElement === 'title'
              ? 'ring-2 ring-dashed ring-[#DCC48F] bg-black/20'
              : isEditing
              ? 'hover:ring-1 hover:ring-dashed hover:ring-[#DCC48F]/50'
              : ''
          }`}
        >
          {isEditing && selectedElement === 'title' && (
            <>
              <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#DCC48F] border border-black rounded-sm shadow pointer-events-none" />
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#DCC48F] border border-black rounded-sm shadow pointer-events-none" />
              <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[#DCC48F] border border-black rounded-sm shadow pointer-events-none" />
              <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#DCC48F] border border-black rounded-sm shadow pointer-events-none" />
              <span className="absolute -top-6 left-0 px-2 py-0.5 rounded bg-[#DCC48F] text-black text-[10px] font-black uppercase shadow tracking-wider whitespace-nowrap pointer-events-none">
                Título
              </span>
            </>
          )}

          <h1
            className="break-words mb-3 sm:mb-4 leading-tight font-bold transition-all"
            style={{
              fontSize: `${tStyle.fontSize}px`,
              textAlign: tStyle.textAlign,
              color: tStyle.color || '#DCC48F',
            }}
          >
            {title}
          </h1>
        </div>

        {/* Subtítulo */}
        {subtitle && (
          <div
            onClick={(e) => {
              if (isEditing && onSelectElement) {
                e.stopPropagation();
                onSelectElement('subtitle');
              }
            }}
            style={{
              transform: `translate(${subStyle.x}px, ${subStyle.y}px)`,
            }}
            className={`relative transition-transform duration-75 ${
              isEditing ? 'cursor-pointer p-1 rounded-lg' : ''
            } ${
              isEditing && selectedElement === 'subtitle'
                ? 'ring-2 ring-dashed ring-[#DCC48F] bg-black/20'
                : isEditing
                ? 'hover:ring-1 hover:ring-dashed hover:ring-[#DCC48F]/50'
                : ''
            }`}
          >
            {isEditing && selectedElement === 'subtitle' && (
              <>
                <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#DCC48F] border border-black rounded-sm shadow pointer-events-none" />
                <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#DCC48F] border border-black rounded-sm shadow pointer-events-none" />
                <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[#DCC48F] border border-black rounded-sm shadow pointer-events-none" />
                <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#DCC48F] border border-black rounded-sm shadow pointer-events-none" />
                <span className="absolute -top-6 left-0 px-2 py-0.5 rounded bg-[#DCC48F] text-black text-[10px] font-black uppercase shadow tracking-wider whitespace-nowrap pointer-events-none">
                  Subtítulo
                </span>
              </>
            )}

            <p
              className="break-words leading-relaxed transition-all"
              style={{
                fontSize: `${subStyle.fontSize}px`,
                textAlign: subStyle.textAlign,
                color: subStyle.color || 'rgba(220, 196, 143, 0.9)',
              }}
            >
              {subtitle}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

