import { useApp } from '../contexts/AppContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Navbar() {
  const { switchView, contactAdmin } = useApp();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    switchView('loginView');
  }

  return (
    <header className="bg-theme-dark shadow-md py-3 px-4 md:px-8 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <img src="/logo.jpeg" alt="NexaFin" className="w-9 h-9 rounded-lg ring-2 ring-white/20" />
        <h1 className="text-xl font-bold text-white tracking-tight">NexaFin</h1>
      </div>
      <div className="hidden md:flex items-center gap-6">
        <button onClick={() => switchView('schemesView')} className="text-sm font-medium text-blue-200 hover:text-white transition-colors">
          Services
        </button>
        <button onClick={() => switchView('submissionsView')} className="text-sm font-medium text-blue-200 hover:text-white transition-colors">
          Submissions
        </button>
        <button onClick={contactAdmin} className="text-sm font-medium text-blue-200 hover:text-white transition-colors">
          Contact Admin
        </button>
        <button onClick={handleLogout} className="text-sm font-medium text-blue-300/70 hover:text-white transition-colors">
          Logout
        </button>
      </div>
    </header>
  );
}
