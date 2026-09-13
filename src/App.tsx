import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BannerProvider } from './contexts/BannerContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { PublicSite } from './pages/PublicSite';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/admin/AdminDashboard';

export default function App() {
  return (
    <AuthProvider>
      <BannerProvider>
        <BrowserRouter>
          <Routes>
            {/* Site público da advocacia */}
            <Route path="/" element={<PublicSite />} />

            {/* Autenticação */}
            <Route path="/login" element={<Login />} />

            {/* Área protegida da administração */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Redirecionamento padrão para rotas não encontradas */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </BannerProvider>
    </AuthProvider>
  );
}

