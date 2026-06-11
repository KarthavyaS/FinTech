import { useApp } from '../contexts/AppContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Navbar() {
  const { switchView, contactAdmin, getUnreadNotifications } = useApp();
  const { logout, isAdmin, isAgent, isClient, currentUser } = useAuth();

  function handleLogout() {
    logout();
    switchView('loginView');
  }

  const unreadNotifs = getUnreadNotifications(currentUser?.role).length;

  return (
    <header className="bg-theme-dark shadow-md py-3 px-4 md:px-8 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <img src="/logo.jpeg" alt="NexaFin" className="w-9 h-9 rounded-lg ring-2 ring-white/20" />
        <h1 className="text-xl font-bold text-white tracking-tight">NexaFin</h1>
      </div>
      <div className="hidden md:flex items-center gap-6">
        {(isClient || isAgent) && (
          <button onClick={() => switchView('schemesView')} className="text-sm font-medium text-blue-200 hover:text-white transition-colors">
            Services
          </button>
        )}
        {isClient && (
          <button onClick={() => switchView('clientDashboardView')} className="text-sm font-medium text-blue-200 hover:text-white transition-colors">
            Dashboard
          </button>
        )}
        {isAgent && (
          <button onClick={() => switchView('agentDashboardView')} className="text-sm font-medium text-blue-200 hover:text-white transition-colors">
            Dashboard
          </button>
        )}
        {isAdmin && (
          <button onClick={() => switchView('adminDashboardView')} className="text-sm font-medium text-blue-200 hover:text-white transition-colors">
            Dashboard
          </button>
        )}
        <button onClick={() => switchView('submissionsView')} className="text-sm font-medium text-blue-200 hover:text-white transition-colors">
          {isClient ? 'My Applications' : isAgent ? 'All Applications' : 'Applications'}
        </button>
        <button onClick={contactAdmin} className="text-sm font-medium text-blue-200 hover:text-white transition-colors">
          Contact Admin
        </button>
        {unreadNotifs > 0 && (
          <button onClick={() => switchView(isAdmin ? 'adminDashboardView' : isAgent ? 'agentDashboardView' : 'clientDashboardView')} className="relative text-sm font-medium text-blue-200 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unreadNotifs > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{unreadNotifs}</span>}
          </button>
        )}
        <div className="flex items-center gap-2">
          <span className="text-xs text-blue-300/70">{currentUser?.name}</span>
          <span className="text-[10px] uppercase bg-blue-500/20 text-blue-200 px-2 py-0.5 rounded-full font-semibold">{currentUser?.role}</span>
        </div>
        <button onClick={handleLogout} className="text-sm font-medium text-blue-300/70 hover:text-white transition-colors">
          Logout
        </button>
      </div>
    </header>
  );
}
