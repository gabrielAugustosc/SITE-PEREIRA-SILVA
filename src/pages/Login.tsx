import { useState, FormEvent, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth, DEMO_CREDENTIALS } from '../contexts/AuthContext';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import Logo from '/assets/logo.png';
import FundoImg from '/assets/ImagemFundoHero.png';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Destino após login (caso o usuário tenha tentado acessar uma rota específica)
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin';

  // Se já estiver logado, redireciona para o admin
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        toast.success('Login realizado com sucesso! Bem-vindo ao painel.');
        navigate(from, { replace: true });
      } else {
        setErrorMessage(result.error || 'Falha ao autenticar.');
        toast.error(result.error || 'Credenciais inválidas.');
      }
    } catch {
      setErrorMessage('Ocorreu um erro inesperado. Tente novamente mais tarde.');
      toast.error('Erro de conexão.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
    setErrorMessage(null);
    toast.info('Credenciais de demonstração preenchidas!');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 select-none">
      {/* Background institucional com overlay degradê escuro */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={FundoImg}
          alt="Pereira & Silva Advogados"
          className="w-full h-full object-cover filter blur-[2px] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A0405]/95 via-[#2E0506]/90 to-[#5E0D13]/85" />
      </div>

      {/* Card de Login */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-[#240608]/90 backdrop-blur-md rounded-2xl p-8 sm:p-10 shadow-2xl border border-[#AC8B57]/40">
          {/* Topo / Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-[#5E0D13]/60 border border-[#AC8B57]/40 shadow-inner mb-4">
              <img src={Logo} alt="Logo Pereira & Silva" className="w-16 h-16 object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-[#DCC48F] tracking-wide">
              Área Administrativa
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 mt-1">
              Pereira & Silva Sociedade de Advogados
            </p>
          </div>

          {/* Mensagem de Erro Inline */}
          {errorMessage && (
            <div className="mb-6 p-3.5 bg-red-950/70 border border-red-500/50 rounded-lg flex items-center gap-3 text-red-200 text-sm animate-shake">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Formulário de Acesso */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Campo E-mail */}
            <div>
              <label className="block text-xs font-semibold text-[#DCC48F] uppercase tracking-wider mb-2">
                E-mail Corporativo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#AC8B57]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ex: advogado@pereirasilva.adv.br"
                  required
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#170304]/80 border border-[#AC8B57]/40 rounded-lg text-white placeholder-stone-400 text-sm focus:outline-none focus:border-[#DCC48F] focus:ring-1 focus:ring-[#DCC48F] transition-all"
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div>
              <label className="block text-xs font-semibold text-[#DCC48F] uppercase tracking-wider mb-2">
                Senha de Acesso
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#AC8B57]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-11 py-2.5 bg-[#170304]/80 border border-[#AC8B57]/40 rounded-lg text-white placeholder-stone-400 text-sm focus:outline-none focus:border-[#DCC48F] focus:ring-1 focus:ring-[#DCC48F] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-[#DCC48F] transition-colors"
                  aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Botão Entrar */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-[#AC8B57] to-[#DCC48F] hover:from-[#9c7d4b] hover:to-[#cbb17b] text-[#1A0405] font-bold text-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Validando credenciais...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Acessar Painel</span>
                </>
              )}
            </button>
          </form>

          {/* Dica para demonstração / testes rápidos */}
          <div className="mt-6 pt-5 border-t border-[#AC8B57]/20 text-center">
            <p className="text-xs text-stone-400 mb-2">Ambiente de Desenvolvimento</p>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="text-xs text-[#DCC48F] hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
            >
              Preencher com credenciais de teste ({DEMO_CREDENTIALS.email})
            </button>
          </div>

          {/* Link voltar para o site público */}
          <div className="mt-5 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar ao site público</span>
            </Link>
          </div>
        </div>

        {/* Rodapé seguro */}
        <p className="text-center text-xs text-stone-400/80 mt-6">
          Área restrita e monitorada • Pereira & Silva Advogados © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}

