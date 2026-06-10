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
    <header className="w-full bg-white border-b border-slate-200 py-4 px-4 md:px-8 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center">
          <svg className="text-white w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">NexaFin</h1>
      </div>
      <div className="hidden md:flex items-center gap-6">
        <button onClick={() => switchView('schemesView')} className="text-sm font-medium text-slate-600 hover:text-slate-900">
          Services
        </button>
        <button onClick={() => switchView('submissionsView')} className="text-sm font-medium text-slate-600 hover:text-slate-900">
          Submissions
        </button>
        <button onClick={contactAdmin} className="text-sm font-medium text-slate-600 hover:text-slate-900">
          Contact Admin
        </button>
        <button onClick={handleLogout} className="text-sm font-medium text-slate-500 hover:text-slate-900">
          Logout
        </button>
      </div>
    </header>
  );
}
