import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { Banner, BannerFormData, ImageElementStyle, TextElementStyle } from '../../types/banner';
import {
  X,
  Upload,
  Image as ImageIcon,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ZoomIn,
  Move,
  RotateCw,
  Sparkles,
  Layers,
  Save,
  RotateCcw,
  Check,
  MousePointerClick,
  Sliders,
  Maximize2,
} from 'lucide-react';
import { toast } from 'sonner';
import FundoImg from '/assets/ImagemFundoHero.png';
import Logo from '/assets/logo.png';
import {
  DEFAULT_IMAGE_STYLE,
  DEFAULT_TITLE_STYLE,
  DEFAULT_SUBTITLE_STYLE,
} from '../../contexts/BannerContext';
import { HeroSlideContent } from '../common/HeroSlideContent';

interface VisualBannerEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: BannerFormData) => void;
  bannerToEdit?: Banner | null;
}

type SelectedElementType = 'image' | 'title' | 'subtitle' | null;

export function VisualBannerEditor({
  isOpen,
  onClose,
  onSave,
  bannerToEdit,
}: VisualBannerEditorProps) {
  // Dados fundamentais do banner
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [active, setActive] = useState(true);

  // Elemento atualmente selecionado no Canvas
  const [selectedElement, setSelectedElement] = useState<SelectedElementType>('image');

  // Estilos da Imagem
  const [imageStyle, setImageStyle] = useState<ImageElementStyle>({ ...DEFAULT_IMAGE_STYLE });

  // Estilos do Título
  const [titleStyle, setTitleStyle] = useState<TextElementStyle>({ ...DEFAULT_TITLE_STYLE });

  // Estilos do Subtítulo
  const [subtitleStyle, setSubtitleStyle] = useState<TextElementStyle>({
    ...DEFAULT_SUBTITLE_STYLE,
  });

  // Ref para o container principal do preview

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Inicializa estado ao abrir ou mudar banner
  useEffect(() => {
    if (bannerToEdit) {
      setTitle(bannerToEdit.title);
      setSubtitle(bannerToEdit.subtitle);
      setImageUrl(bannerToEdit.imageUrl);
      setActive(bannerToEdit.active);
      setImageStyle(bannerToEdit.imageStyle || { ...DEFAULT_IMAGE_STYLE });
      setTitleStyle(bannerToEdit.titleStyle || { ...DEFAULT_TITLE_STYLE });
      setSubtitleStyle(bannerToEdit.subtitleStyle || { ...DEFAULT_SUBTITLE_STYLE });
    } else {
      setTitle('Protegendo seus Direitos e Interesses');
      setSubtitle(
        'Oferecemos soluções jurídicas personalizadas e estratégicas com mais de 10 anos de experiência. Nossa equipe está comprometida com a excelência e os melhores resultados para nossos clientes.'
      );
      setImageUrl(Logo);
      setActive(true);
      setImageStyle({ ...DEFAULT_IMAGE_STYLE });
      setTitleStyle({ ...DEFAULT_TITLE_STYLE });
      setSubtitleStyle({ ...DEFAULT_SUBTITLE_STYLE });
    }
    setSelectedElement('image');
  }, [bannerToEdit, isOpen]);



  if (!isOpen) return null;

  // Processa upload de arquivo local
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecione um arquivo de imagem válido (PNG, JPG, WEBP).');
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      toast.error('Imagem muito grande (máx: 4MB).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageUrl(reader.result);
        toast.success('Imagem carregada com sucesso!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!title.trim()) {
      toast.error('O título do banner não pode estar vazio.');
      return;
    }
    if (!imageUrl) {
      toast.error('Uma imagem é obrigatória.');
      return;
    }

    onSave({
      title: title.trim(),
      subtitle: subtitle.trim(),
      imageUrl,
      active,
      imageStyle,
      titleStyle,
      subtitleStyle,
    });

    toast.success('Banner salvo com sucesso!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0e0e11] animate-in fade-in duration-200 select-none">
      <div className="flex-1 flex flex-col text-stone-100 overflow-hidden font-sans">
        {/* =========================================
            BARRA SUPERIOR DO EDITOR
           ========================================= */}
        <header className="bg-[#101012] px-6 py-3 border-b border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#5E0D13] border border-[#AC8B57]/40 text-[#DCC48F]">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>Editor Visual de Banner</span>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#AC8B57]/20 text-[#DCC48F] border border-[#AC8B57]/30">
                  Prévia 100% Real (WYSIWYG)
                </span>
              </h1>
              <p className="text-[11px] text-stone-400">
                O que você vê aqui é exatamente como o banner aparecerá na página inicial
              </p>
            </div>
          </div>

          {/* Abas Rápidas de Seleção de Elemento */}
          <div className="hidden md:flex items-center bg-stone-900/90 p-1 rounded-xl border border-stone-800">
            <button
              type="button"
              onClick={() => setSelectedElement('image')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                selectedElement === 'image'
                  ? 'bg-[#5E0D13] text-[#DCC48F] shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Imagem</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedElement('title')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                selectedElement === 'title'
                  ? 'bg-[#5E0D13] text-[#DCC48F] shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>Título</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedElement('subtitle')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                selectedElement === 'subtitle'
                  ? 'bg-[#5E0D13] text-[#DCC48F] shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Subtítulo</span>
            </button>
          </div>

          {/* Botões Salvar e Cancelar */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-medium text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#AC8B57] to-[#DCC48F] hover:from-[#9b7b48] hover:to-[#cdb17b] text-[#1A0405] font-bold text-xs sm:text-sm rounded-lg shadow-lg transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Banner</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* =========================================
            CORPO: PAINEL LATERAL + PALCO REAL
           ========================================= */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* BARRA LATERAL DE PROPRIEDADES (ESQUERDA) */}
          <aside className="w-full lg:w-72 xl:w-80 bg-[#111113] border-b lg:border-b-0 lg:border-r border-stone-800 flex flex-col shrink-0 overflow-y-auto max-h-[36vh] lg:max-h-full">
            {/* Header do Painel Dinâmico */}
            <div className="p-4 border-b border-stone-800/80 bg-[#151518] flex items-center justify-between">
              <div className="flex items-center gap-2">
                {selectedElement === 'image' && <ImageIcon className="w-4 h-4 text-[#DCC48F]" />}
                {selectedElement === 'title' && <Type className="w-4 h-4 text-[#DCC48F]" />}
                {selectedElement === 'subtitle' && <Layers className="w-4 h-4 text-[#DCC48F]" />}
                {!selectedElement && <MousePointerClick className="w-4 h-4 text-stone-400" />}

                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  {selectedElement === 'image' && 'Propriedades da Imagem'}
                  {selectedElement === 'title' && 'Propriedades do Título'}
                  {selectedElement === 'subtitle' && 'Propriedades do Subtítulo'}
                  {!selectedElement && 'Configurações do Banner'}
                </span>
              </div>

              {selectedElement && (
                <button
                  type="button"
                  onClick={() => setSelectedElement(null)}
                  className="text-[10px] text-stone-400 hover:text-stone-200 underline cursor-pointer"
                >
                  Deselecionar
                </button>
              )}
            </div>

            <div className="p-5 space-y-6 flex-1">
              {/* CONTROLES DA IMAGEM */}
              {selectedElement === 'image' && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  {/* Escala / Zoom */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
                        <ZoomIn className="w-3.5 h-3.5 text-[#AC8B57]" />
                        <span>Escala / Tamanho da Imagem</span>
                      </label>
                      <span className="text-xs font-mono font-bold text-[#DCC48F]">
                        {Math.round(imageStyle.scale * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="2.0"
                      step="0.05"
                      value={imageStyle.scale}
                      onChange={(e) =>
                        setImageStyle({ ...imageStyle, scale: parseFloat(e.target.value) })
                      }
                      className="w-full accent-[#DCC48F] bg-stone-800 rounded-lg cursor-pointer h-1.5"
                    />
                    <div className="flex justify-between mt-1.5 text-[10px] text-stone-500">
                      <button
                        type="button"
                        onClick={() => setImageStyle({ ...imageStyle, scale: 0.8 })}
                        className="hover:text-stone-300"
                      >
                        Pequeno (80%)
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageStyle({ ...imageStyle, scale: 1.0 })}
                        className="hover:text-stone-300 font-bold text-[#AC8B57]"
                      >
                        Normal (100%)
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageStyle({ ...imageStyle, scale: 1.3 })}
                        className="hover:text-stone-300"
                      >
                        Grande (130%)
                      </button>
                    </div>
                  </div>

                  {/* Posição X (Horizontal) */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
                        <Move className="w-3.5 h-3.5 text-[#AC8B57]" />
                        <span>Ajuste Horizontal (X)</span>
                      </label>
                      <span className="text-xs font-mono text-stone-400">{imageStyle.x}px</span>
                    </div>
                    <input
                      type="range"
                      min="-100"
                      max="100"
                      step="2"
                      value={imageStyle.x}
                      onChange={(e) =>
                        setImageStyle({ ...imageStyle, x: parseInt(e.target.value) })
                      }
                      className="w-full accent-[#DCC48F] bg-stone-800 rounded-lg cursor-pointer h-1.5"
                    />
                  </div>

                  {/* Posição Y (Vertical) */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
                        <Move className="w-3.5 h-3.5 text-[#AC8B57] rotate-90" />
                        <span>Ajuste Vertical (Y)</span>
                      </label>
                      <span className="text-xs font-mono text-stone-400">{imageStyle.y}px</span>
                    </div>
                    <input
                      type="range"
                      min="-80"
                      max="80"
                      step="2"
                      value={imageStyle.y}
                      onChange={(e) =>
                        setImageStyle({ ...imageStyle, y: parseInt(e.target.value) })
                      }
                      className="w-full accent-[#DCC48F] bg-stone-800 rounded-lg cursor-pointer h-1.5"
                    />
                  </div>

                  {/* Rotação */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
                        <RotateCw className="w-3.5 h-3.5 text-[#AC8B57]" />
                        <span>Rotação</span>
                      </label>
                      <span className="text-xs font-mono text-stone-400">
                        {imageStyle.rotation}°
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-45"
                      max="45"
                      step="1"
                      value={imageStyle.rotation}
                      onChange={(e) =>
                        setImageStyle({ ...imageStyle, rotation: parseInt(e.target.value) })
                      }
                      className="w-full accent-[#DCC48F] bg-stone-800 rounded-lg cursor-pointer h-1.5"
                    />
                  </div>

                  {/* Reset da Imagem */}
                  <button
                    type="button"
                    onClick={() => setImageStyle({ ...DEFAULT_IMAGE_STYLE })}
                    className="w-full py-2 px-3 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Redefinir Posição e Zoom da Imagem</span>
                  </button>

                  {/* Upload / Troca de Imagem */}
                  <div className="pt-4 border-t border-stone-800">
                    <label className="block text-xs font-bold text-[#DCC48F] uppercase tracking-wider mb-2">
                      Trocar Imagem
                    </label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/png, image/jpeg, image/jpg, image/webp"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-2.5 px-3 bg-[#5E0D13]/60 hover:bg-[#5E0D13] border border-[#AC8B57]/40 text-[#DCC48F] hover:text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Fazer Upload do Seu Computador</span>
                    </button>

                    <div className="mt-3 flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] text-stone-400">Padrões:</span>
                      <button
                        type="button"
                        onClick={() => setImageUrl('/assets/logo.png')}
                        className="text-[10px] font-medium bg-stone-800 hover:bg-stone-700 text-stone-300 px-2 py-1 rounded"
                      >
                        Logo Dourado
                      </button>
                      <button
                        type="button"
                        onClick={() => setImageUrl('/assets/bpc.jpg')}
                        className="text-[10px] font-medium bg-stone-800 hover:bg-stone-700 text-stone-300 px-2 py-1 rounded"
                      >
                        Banner BPC
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* CONTROLES DO TÍTULO */}
              {selectedElement === 'title' && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                      Texto do Título
                    </label>
                    <textarea
                      rows={3}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#DCC48F] transition-all resize-none"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-semibold text-stone-300">
                        Tamanho da Fonte
                      </label>
                      <span className="text-xs font-mono font-bold text-[#DCC48F]">
                        {titleStyle.fontSize}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="28"
                      max="72"
                      step="2"
                      value={titleStyle.fontSize}
                      onChange={(e) =>
                        setTitleStyle({ ...titleStyle, fontSize: parseInt(e.target.value) })
                      }
                      className="w-full accent-[#DCC48F] bg-stone-800 rounded-lg cursor-pointer h-1.5"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                      Alinhamento
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setTitleStyle({ ...titleStyle, textAlign: 'left' })}
                        className={`py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                          titleStyle.textAlign === 'left'
                            ? 'bg-[#5E0D13] text-[#DCC48F] border-[#AC8B57]'
                            : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-white'
                        }`}
                      >
                        <AlignLeft className="w-3.5 h-3.5" />
                        <span>Esquerda</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setTitleStyle({ ...titleStyle, textAlign: 'center' })}
                        className={`py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                          titleStyle.textAlign === 'center'
                            ? 'bg-[#5E0D13] text-[#DCC48F] border-[#AC8B57]'
                            : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-white'
                        }`}
                      >
                        <AlignCenter className="w-3.5 h-3.5" />
                        <span>Centro</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setTitleStyle({ ...titleStyle, textAlign: 'right' })}
                        className={`py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                          titleStyle.textAlign === 'right'
                            ? 'bg-[#5E0D13] text-[#DCC48F] border-[#AC8B57]'
                            : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-white'
                        }`}
                      >
                        <AlignRight className="w-3.5 h-3.5" />
                        <span>Direita</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                      Cor do Título
                    </label>
                    <div className="flex items-center gap-2">
                      {[
                        { label: 'Dourado Nobre', color: '#DCC48F' },
                        { label: 'Branco Puro', color: '#FFFFFF' },
                        { label: 'Dourado Escuro', color: '#AC8B57' },
                      ].map((item) => (
                        <button
                          key={item.color}
                          type="button"
                          onClick={() => setTitleStyle({ ...titleStyle, color: item.color })}
                          className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                            titleStyle.color === item.color
                              ? 'border-white scale-110 shadow-md'
                              : 'border-transparent hover:scale-105'
                          }`}
                          style={{ backgroundColor: item.color }}
                          title={item.label}
                        >
                          {titleStyle.color === item.color && (
                            <Check className="w-3.5 h-3.5 text-black" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* CONTROLES DO SUBTÍTULO */}
              {selectedElement === 'subtitle' && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                      Texto do Subtítulo / Descrição
                    </label>
                    <textarea
                      rows={4}
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-700 rounded-lg text-white text-xs focus:outline-none focus:border-[#DCC48F] transition-all resize-none"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-semibold text-stone-300">
                        Tamanho da Fonte
                      </label>
                      <span className="text-xs font-mono font-bold text-[#DCC48F]">
                        {subtitleStyle.fontSize}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="14"
                      max="28"
                      step="1"
                      value={subtitleStyle.fontSize}
                      onChange={(e) =>
                        setSubtitleStyle({
                          ...subtitleStyle,
                          fontSize: parseInt(e.target.value),
                        })
                      }
                      className="w-full accent-[#DCC48F] bg-stone-800 rounded-lg cursor-pointer h-1.5"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                      Alinhamento
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setSubtitleStyle({ ...subtitleStyle, textAlign: 'left' })}
                        className={`py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                          subtitleStyle.textAlign === 'left'
                            ? 'bg-[#5E0D13] text-[#DCC48F] border-[#AC8B57]'
                            : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-white'
                        }`}
                      >
                        <AlignLeft className="w-3.5 h-3.5" />
                        <span>Esquerda</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSubtitleStyle({ ...subtitleStyle, textAlign: 'center' })}
                        className={`py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                          subtitleStyle.textAlign === 'center'
                            ? 'bg-[#5E0D13] text-[#DCC48F] border-[#AC8B57]'
                            : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-white'
                        }`}
                      >
                        <AlignCenter className="w-3.5 h-3.5" />
                        <span>Centro</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSubtitleStyle({ ...subtitleStyle, textAlign: 'right' })}
                        className={`py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                          subtitleStyle.textAlign === 'right'
                            ? 'bg-[#5E0D13] text-[#DCC48F] border-[#AC8B57]'
                            : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-white'
                        }`}
                      >
                        <AlignRight className="w-3.5 h-3.5" />
                        <span>Direita</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* NENHUM ELEMENTO SELECIONADO */}
              {!selectedElement && (
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-stone-800 text-[#DCC48F] flex items-center justify-center mx-auto border border-stone-700">
                    <MousePointerClick className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                      Selecione um Elemento
                    </h3>
                    <p className="text-xs text-stone-400 mt-1 max-w-xs mx-auto">
                      Clique diretamente na Imagem, no Título ou no Subtítulo na pré-visualização ao lado para editá-los.
                    </p>
                  </div>
                </div>
              )}

              {/* Status Ativo/Inativo */}
              <div className="pt-4 border-t border-stone-800">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="w-4 h-4 rounded text-[#5E0D13] focus:ring-[#AC8B57] bg-stone-900 border-stone-700 cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-stone-300">
                    Exibir no Carrossel Público
                  </span>
                </label>
              </div>
            </div>
          </aside>

          {/* =========================================================================
              PALCO DE PRÉ-VISUALIZAÇÃO — TAMANHO REAL, SEM CORTE
             ========================================================================= */}
          <main
            className="flex-1 flex flex-col overflow-hidden bg-[#09090b]"
          >
            {/* Barra de Informação */}
            <div className="shrink-0 flex items-center justify-between text-[11px] text-stone-400 px-4 py-1.5 bg-[#0a0a0c] border-b border-stone-800/50">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#DCC48F]" />
                <span>Prévia em Tamanho Real — O que você vê aqui é exatamente o resultado final</span>
              </span>
              <span className="text-[10px] text-stone-500 flex items-center gap-1">
                <Maximize2 className="w-3 h-3" />
                <span>Tela Cheia • 100%</span>
              </span>
            </div>

            {/* Área de Preview — replica a section#home do site público */}
            <div
              className="flex-1 relative overflow-y-auto overflow-x-hidden"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setSelectedElement(null);
                }
              }}
            >
              <section
                className="relative w-full"
                style={{ minHeight: '100%' }}
              >
                {/* Background & Overlay — idênticos ao Hero.tsx */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <img
                    src={FundoImg}
                    alt="Fundo"
                    className="w-full h-full object-cover filter blur-[1px] scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2E0506] via-[#5E0D13]/95 to-[#5E0D13]/80" />
                </div>

                {/* Barra de Progresso do Carrossel */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-red-950/40 z-20 pointer-events-none">
                  <div className="h-full bg-[#DCC48F] w-2/5 shadow-[0_0_8px_rgba(220,196,143,0.8)]" />
                </div>

                {/* Conteúdo — mesma estrutura do Hero.tsx via HeroSlideContent */}
                <div className="relative z-10 w-full min-h-[500px] md:min-h-[600px] flex items-center">
                  <HeroSlideContent
                    title={title}
                    subtitle={subtitle}
                    imageUrl={imageUrl}
                    imageStyle={imageStyle}
                    titleStyle={titleStyle}
                    subtitleStyle={subtitleStyle}
                    isEditing={true}
                    selectedElement={selectedElement}
                    onSelectElement={setSelectedElement}
                  />
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
