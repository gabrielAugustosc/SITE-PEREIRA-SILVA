import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useBanners } from '../../contexts/BannerContext';
import { Banner, BannerFormData } from '../../types/banner';
import { VisualBannerEditor } from '../../components/admin/VisualBannerEditor';
import {
  LogOut,
  ExternalLink,
  Image as ImageIcon,
  Sparkles,
  PlusCircle,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  RotateCcw,
  CheckCircle2,
  Shield,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import Logo from '/assets/logo.png';

export function AdminDashboard() {
  const { user, logout } = useAuth();
  const {
    banners,
    addBanner,
    updateBanner,
    deleteBanner,
    toggleBannerActive,
    resetToDefaults,
  } = useBanners();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bannerToEdit, setBannerToEdit] = useState<Banner | null>(null);

  const activeBannersCount = banners.filter((b) => b.active).length;

  const handleOpenNew = () => {
    setBannerToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (banner: Banner) => {
    setBannerToEdit(banner);
    setIsModalOpen(true);
  };

  const handleSaveBanner = (data: BannerFormData) => {
    if (bannerToEdit) {
      updateBanner(bannerToEdit.id, data);
    } else {
      addBanner(data);
    }
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Tem certeza de que deseja excluir o banner "${title}"?`)) {
      deleteBanner(id);
      toast.success('Banner excluído com sucesso.');
    }
  };

  const handleReset = () => {
    if (confirm('Deseja restaurar os banners padrão do escritório?')) {
      resetToDefaults();
      toast.success('Banners originais restaurados com sucesso.');
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-sans">
      {/* Topo Administrativo */}
      <header className="bg-[#5E0D13] text-white border-b-2 border-[#AC8B57] sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Identificação */}
          <div className="flex items-center gap-3">
            <img src={Logo} alt="Pereira & Silva" className="h-10 w-auto object-contain" />
            <div className="hidden sm:block border-l border-[#AC8B57]/50 pl-3">
              <span className="text-sm font-bold text-[#DCC48F] tracking-wide block">
                PAINEL ADMINISTRATIVO
              </span>
              <span className="text-[10px] text-stone-300 block -mt-0.5">
                Pereira & Silva Sociedade de Advogados
              </span>
            </div>
          </div>

          {/* Ações do Topo */}
          <div className="flex items-center gap-3 sm:gap-6">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#DCC48F] hover:text-white transition-colors"
            >
              <span>Ver site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {/* Usuário logado */}
            <div className="flex items-center gap-3 pl-3 border-l border-[#AC8B57]/40">
              <div className="text-right hidden md:block">
                <span className="text-xs font-semibold text-white block">
                  {user?.name || 'Administrador'}
                </span>
                <span className="text-[10px] text-[#DCC48F] block">
                  {user?.email}
                </span>
              </div>

              {/* Botão Sair */}
              <button
                onClick={logout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2E0506] hover:bg-[#1A0405] text-[#DCC48F] hover:text-white text-xs font-medium rounded-lg border border-[#AC8B57]/50 transition-all cursor-pointer"
                title="Encerrar Sessão"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner de Boas-vindas */}
        <div className="bg-gradient-to-r from-[#5E0D13] to-[#2E0506] rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-[#AC8B57]/30 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#DCC48F]/20 text-[#DCC48F] text-xs font-semibold mb-3 border border-[#DCC48F]/30">
              <Shield className="w-3.5 h-3.5" />
              <span>Sessão Segura Autenticada</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Gerenciador do Carrossel Institucional
            </h1>
            <p className="text-stone-300 text-sm mt-1 max-w-xl">
              Cadastre, edite ou remova os banners exibidos na página inicial. As alterações refletem imediatamente no site público.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <button
              type="button"
              onClick={handleOpenNew}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#AC8B57] to-[#DCC48F] hover:from-[#9b7b48] hover:to-[#cdb17b] text-[#1A0405] font-bold text-xs sm:text-sm rounded-lg shadow-lg transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Novo Banner</span>
            </button>
          </div>
        </div>

        {/* Métricas / Cards Informativos */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#5E0D13]/10 text-[#5E0D13] flex items-center justify-center shrink-0">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-stone-500 font-medium">Total de Banners</p>
              <p className="text-xl font-bold text-stone-900">{banners.length} cadastrados</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-stone-500 font-medium">Banners Ativos no Site</p>
              <p className="text-xl font-bold text-emerald-600">{activeBannersCount} ativos</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-stone-500 font-medium">Persistência Local</p>
              <p className="text-xl font-bold text-stone-900">Ativa (LocalStorage)</p>
            </div>
          </div>
        </div>

        {/* Lista de Banners */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden mb-8">
          <div className="p-5 sm:p-6 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#5E0D13]" />
                <span>Banners Cadastrados</span>
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Alterne a visibilidade ou edite as informações de cada slide
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                title="Restaurar banners padrão da banca"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurar Padrão</span>
              </button>

              <button
                type="button"
                onClick={handleOpenNew}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#5E0D13] hover:bg-[#45090e] text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Adicionar</span>
              </button>
            </div>
          </div>

          {banners.length === 0 ? (
            <div className="p-12 text-center">
              <ImageIcon className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <p className="text-stone-700 font-semibold text-sm">Nenhum banner cadastrado</p>
              <p className="text-xs text-stone-400 mt-1 mb-4">
                Clique no botão abaixo para adicionar seu primeiro slide ao carrossel.
              </p>
              <button
                type="button"
                onClick={handleOpenNew}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#5E0D13] text-white text-xs font-semibold rounded-lg cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Criar Novo Banner</span>
              </button>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {banners.map((banner, index) => (
                <div
                  key={banner.id}
                  className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 hover:bg-stone-50/70 transition-colors"
                >
                  {/* Imagem e Textos */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1 min-w-0">
                    {/* Thumbnail */}
                    <div className="relative w-28 h-20 sm:w-32 sm:h-20 rounded-xl overflow-hidden bg-gradient-to-br from-[#2E0506] to-[#5E0D13] flex items-center justify-center shrink-0 border border-stone-200 shadow-sm p-2">
                      <img
                        src={banner.imageUrl}
                        alt={banner.title}
                        className="max-w-full max-h-full object-contain"
                      />
                      <span className="absolute top-1 left-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/60 text-[#DCC48F]">
                        #{index + 1}
                      </span>
                    </div>

                    {/* Detalhes */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            banner.active
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-stone-100 text-stone-500 border border-stone-200'
                          }`}
                        >
                          {banner.active ? '● Ativo no Carrossel' : '○ Oculto'}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-stone-900 truncate">
                        {banner.title}
                      </h3>
                      <p className="text-xs text-stone-500 line-clamp-2 mt-0.5">
                        {banner.subtitle || 'Sem subtítulo cadastrado.'}
                      </p>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    {/* Ativar/Desativar */}
                    <button
                      type="button"
                      onClick={() => toggleBannerActive(banner.id)}
                      className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                        banner.active
                          ? 'text-stone-700 bg-stone-100 hover:bg-stone-200 border-stone-200'
                          : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-emerald-200'
                      }`}
                      title={banner.active ? 'Ocultar banner do site' : 'Exibir banner no site'}
                    >
                      {banner.active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      <span className="text-xs hidden lg:inline">
                        {banner.active ? 'Ocultar' : 'Exibir'}
                      </span>
                    </button>

                    {/* Editar */}
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(banner)}
                      className="p-2 rounded-lg text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200 transition-colors cursor-pointer flex items-center gap-1.5"
                      title="Editar banner"
                    >
                      <Pencil className="w-4 h-4 text-stone-600" />
                      <span className="text-xs hidden lg:inline">Editar</span>
                    </button>

                    {/* Excluir */}
                    <button
                      type="button"
                      onClick={() => handleDelete(banner.id, banner.title)}
                      className="p-2 rounded-lg text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors cursor-pointer flex items-center gap-1.5"
                      title="Excluir banner"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                      <span className="text-xs hidden lg:inline">Excluir</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Editor Visual de Banners (Estilo Canva) */}
      <VisualBannerEditor
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveBanner}
        bannerToEdit={bannerToEdit}
      />
    </div>
  );
}

