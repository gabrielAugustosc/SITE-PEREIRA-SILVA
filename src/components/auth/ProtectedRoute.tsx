import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1A0405] flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 text-[#DCC48F] animate-spin mb-4" />
        <p className="text-sm font-medium text-[#DCC48F]/80">Verificando credenciais...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redireciona para o login e salva a rota que o usuário tentou acessar
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}

