import { useState, useEffect, useRef, ChangeEvent, FormEvent, DragEvent } from 'react';
import { Banner, BannerFormData } from '../../types/banner';
import { X, Upload, Image as ImageIcon, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface BannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: BannerFormData) => void;
  bannerToEdit?: Banner | null;
}

export function BannerModal({
  isOpen,
  onClose,
  onSave,
  bannerToEdit,
}: BannerModalProps) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [active, setActive] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Inicializa ou limpa formulário quando o modal abre
  useEffect(() => {
    if (bannerToEdit) {
      setTitle(bannerToEdit.title);
      setSubtitle(bannerToEdit.subtitle);
      setImageUrl(bannerToEdit.imageUrl);
      setActive(bannerToEdit.active);
    } else {
      setTitle('');
      setSubtitle('');
      setImageUrl('');
      setActive(true);
    }
    setImageError(null);
  }, [bannerToEdit, isOpen]);

  if (!isOpen) return null;

  // Processa o arquivo selecionado para Base64 (Data URL)
  const handleFileProcess = (file: File) => {
    setImageError(null);

    // Validação de tipo
    if (!file.type.startsWith('image/')) {
      setImageError('Por favor, selecione um arquivo de imagem válido (PNG, JPG ou WEBP).');
      toast.error('Formato de arquivo inválido.');
      return;
    }

    // Validação de tamanho (máximo 4MB para armazenamento local)
    if (file.size > 4 * 1024 * 1024) {
      setImageError('A imagem selecionada é muito grande (máximo recomendado: 4MB).');
      toast.error('Imagem muito grande.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageUrl(reader.result);
        toast.success('Imagem carregada com sucesso!');
      }
    };
    reader.onerror = () => {
      setImageError('Erro ao ler a imagem.');
      toast.error('Não foi possível carregar a imagem.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('Informe o título do banner.');
      return;
    }

    if (!imageUrl) {
      setImageError('Faça o upload de uma imagem para o banner.');
      toast.error('Uma imagem é obrigatória.');
      return;
    }

    onSave({
      title: title.trim(),
      subtitle: subtitle.trim(),
      imageUrl,
      active,
    });

    toast.success(
      bannerToEdit ? 'Banner atualizado com sucesso!' : 'Novo banner cadastrado com sucesso!'
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[90vh]">
        {/* Cabeçalho do Modal */}
        <div className="bg-[#5E0D13] text-white px-6 py-4 flex items-center justify-between border-b-2 border-[#AC8B57]">
          <div>
            <h2 className="text-lg font-bold text-[#DCC48F]">
              {bannerToEdit ? 'Editar Banner do Carrossel' : 'Novo Banner do Carrossel'}
            </h2>
            <p className="text-xs text-stone-300">
              Personalize o título, subtítulo e imagem do banner em destaque
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Título */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Título do Banner <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Excelência em Direito Previdenciário"
              required
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 text-sm focus:outline-none focus:border-[#5E0D13] focus:ring-1 focus:ring-[#5E0D13] transition-all"
            />
          </div>

          {/* Subtítulo */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Subtítulo / Descrição
            </label>
            <textarea
              rows={3}
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Ex: Atuação estratégica com foco em resultados seguros e atendimento humanizado para nossos clientes."
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 text-sm focus:outline-none focus:border-[#5E0D13] focus:ring-1 focus:ring-[#5E0D13] transition-all resize-none"
            />
          </div>

          {/* Upload de Imagem */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Imagem de Destaque <span className="text-red-600">*</span>
            </label>

            {/* Input oculto */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/jpg, image/webp"
              className="hidden"
            />

            {/* Caixa de Upload / Drag & Drop */}
            {!imageUrl ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-[#5E0D13] bg-[#5E0D13]/5'
                    : 'border-stone-300 hover:border-[#AC8B57] bg-stone-50 hover:bg-stone-100/60'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-amber-50 text-[#AC8B57] flex items-center justify-center mx-auto mb-3 border border-[#AC8B57]/30">
                  <Upload className="w-5 h-5" />
                </div>
                <p className="text-sm font-semibold text-stone-800">
                  Clique para selecionar uma imagem ou arraste até aqui
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  Formatos aceitos: PNG, JPG ou WEBP (máx. 4MB)
                </p>
              </div>
            ) : (
              /* Preview da imagem carregada */
              <div className="relative border border-stone-200 rounded-xl overflow-hidden bg-stone-900/90 p-3 flex flex-col sm:flex-row items-center gap-4">
                <div className="w-32 h-24 rounded-lg overflow-hidden bg-black/40 flex items-center justify-center shrink-0 border border-stone-700">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Imagem Pronta</span>
                  </div>
                  <p className="text-xs text-stone-300">
                    A imagem será exibida em destaque no slide público.
                  </p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-2 text-xs font-semibold text-[#DCC48F] hover:underline cursor-pointer"
                  >
                    Trocar imagem
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="sm:self-start p-1.5 rounded-lg bg-white/10 hover:bg-red-500/20 text-stone-300 hover:text-red-400 transition-colors"
                  title="Remover imagem"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {imageError && (
              <div className="mt-2 text-xs text-red-600 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{imageError}</span>
              </div>
            )}

            {/* Imagens prévias rápidas do projeto */}
            {!imageUrl && (
              <div className="mt-2.5 flex items-center gap-2">
                <span className="text-[11px] text-stone-500">Usar imagem existente:</span>
                <button
                  type="button"
                  onClick={() => setImageUrl('/assets/logo.png')}
                  className="text-[11px] font-medium text-[#5E0D13] hover:underline bg-stone-100 px-2 py-0.5 rounded"
                >
                  Logo da Banca
                </button>
                <button
                  type="button"
                  onClick={() => setImageUrl('/assets/bpc.jpg')}
                  className="text-[11px] font-medium text-[#5E0D13] hover:underline bg-stone-100 px-2 py-0.5 rounded"
                >
                  Banner BPC
                </button>
              </div>
            )}
          </div>

          {/* Ativo no carrossel */}
          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="active"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="w-4 h-4 rounded text-[#5E0D13] focus:ring-[#5E0D13] border-stone-300 cursor-pointer"
            />
            <label htmlFor="active" className="text-xs font-semibold text-stone-700 cursor-pointer">
              Exibir este banner no carrossel público da página inicial
            </label>
          </div>

          {/* Rodapé / Botões */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-[#5E0D13] hover:bg-[#43080c] rounded-lg shadow-md hover:shadow transition-all cursor-pointer"
            >
              {bannerToEdit ? 'Salvar Alterações' : 'Adicionar Banner'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

