import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
}

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const STORAGE_KEY = 'pereira_silva_admin_session';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Credenciais de demonstração inicial
export const DEMO_CREDENTIALS = {
  email: 'admin@pereirasilva.adv.br',
  password: 'admin123',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Recupera sessão existente ao iniciar
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem(STORAGE_KEY);
      if (savedSession) {
        const parsedUser = JSON.parse(savedSession) as AdminUser;
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Erro ao carregar sessão administrativa:', error);
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Realiza o login.
   * Atualmente implementado com mock para desenvolvimento da interface.
   * 
   * FUTURA INTEGRAÇÃO COM SUPABASE / FIREBASE:
   * - Supabase:
   *   const { data, error } = await supabase.auth.signInWithPassword({ email, password });
   * - Firebase:
   *   const userCredential = await signInWithEmailAndPassword(auth, email, password);
   */
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    // Simulação de latência de rede (500ms) para sensação realista de requisição
    await new Promise((resolve) => setTimeout(resolve, 500));

    const normalizedEmail = email.trim().toLowerCase();

    // Verificação de credenciais (substituir futuramente pelo BaaS)
    if (normalizedEmail === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      const authenticatedUser: AdminUser = {
        id: 'usr_admin_01',
        name: 'Dra. Pereira & Dr. Silva',
        email: normalizedEmail,
        role: 'admin',
      };

      setUser(authenticatedUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authenticatedUser));
      setIsLoading(false);
      return { success: true };
    }

    setIsLoading(false);
    return {
      success: false,
      error: 'E-mail ou senha incorretos. Verifique os dados informados.',
    };
  };

  /**
   * Encerra a sessão do usuário.
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook utilitário para consumir o contexto de autenticação
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um <AuthProvider>');
  }
  return context;
}

