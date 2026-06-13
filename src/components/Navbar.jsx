import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../contexts/AppContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ChevronDown, LogOut, User, LayoutDashboard, Package, HeadphonesIcon, Globe } from 'lucide-react';

const languages = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { switchView, contactAdmin, getUnreadNotifications, markNotificationsRead, currentView } = useApp();
  const { logout, isAdmin, isAgent, isClient, currentUser } = useAuth();
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [bellAnim, setBellAnim] = useState(false);

  const unreadNotifs = getUnreadNotifications(currentUser?.role);

  useEffect(() => {
    if (unreadNotifs.length > 0) {
      setBellAnim(true);
      const t = setTimeout(() => setBellAnim(false), 1000);
      return () => clearTimeout(t);
    }
  }, [unreadNotifs.length]);

  function handleLogout() {
    logout();
    switchView('loginView');
  }

  function handleMarkAllRead() {
    if (unreadNotifs.length > 0) markNotificationsRead(currentUser?.role);
  }

  function changeLanguage(code) {
    i18n.changeLanguage(code);
    localStorage.setItem('app_lang', code);
    setShowLangMenu(false);
  }

  const navItems = [];
  if (isClient) navItems.push({ label: t('nav.dashboard'), view: 'clientDashboardView', icon: LayoutDashboard });
  if (isAgent) navItems.push({ label: t('nav.dashboard'), view: 'agentDashboardView', icon: LayoutDashboard });
  if (isAdmin) navItems.push({ label: t('nav.dashboard'), view: 'adminDashboardView', icon: LayoutDashboard });
  if (isClient || isAgent) navItems.push({ label: t('nav.services'), view: 'schemesView', icon: Package });
  navItems.push({
    label: isClient ? t('nav.myApplications') : isAgent ? t('nav.allApplications') : t('nav.applications'),
    view: 'submissionsView',
    icon: LayoutDashboard,
  });

  return (
    <header className="glass sticky top-0 z-50 px-4 md:px-8 border-b border-white/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="FinTech" className="w-9 h-9 object-contain" />
          <h1 className="text-lg font-bold gradient-text tracking-tight hidden sm:block">FinTech</h1>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => switchView(item.view)}
                className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'text-brand bg-blue-50/80'
                    : 'text-gray-600 hover:text-brand hover:bg-blue-50/50'
                }`}
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-brand' : ''}`} />
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute inset-0 rounded-xl bg-blue-50/80"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
          <button
            onClick={contactAdmin}
            className="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-brand rounded-xl hover:bg-blue-50/50 transition-all duration-200 flex items-center gap-1.5"
          >
            <HeadphonesIcon className="w-4 h-4" />
            {t('nav.contactAdmin')}
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="p-2 rounded-xl hover:bg-blue-50/50 transition-all duration-200 flex items-center gap-1.5 text-gray-500 hover:text-brand"
              title={t('nav.language')}
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-medium hidden sm:block">{languages.find(l => l.code === i18n.language)?.native || 'EN'}</span>
            </button>
            <AnimatePresence>
              {showLangMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-40 glass-card rounded-2xl overflow-hidden z-[60]"
                >
                  <div className="p-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-lg transition-colors ${
                          i18n.language === lang.code
                            ? 'bg-blue-50 text-brand font-semibold'
                            : 'text-gray-700 hover:bg-blue-50/50'
                        }`}
                      >
                        <span className="text-base">{lang.native}</span>
                        <span className="text-xs text-gray-400">{lang.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifPanel(!showNotifPanel)}
              className={`relative p-2 rounded-xl hover:bg-blue-50/50 transition-all duration-200 ${bellAnim ? 'bell-ring' : ''}`}
            >
              <Bell className={`w-5 h-5 ${unreadNotifs.length > 0 ? 'text-brand' : 'text-gray-500'}`} />
              {unreadNotifs.length > 0 && (
                <motion.span
                  key={unreadNotifs.length}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-red-500/30"
                >
                  {unreadNotifs.length}
                </motion.span>
              )}
            </button>
            <AnimatePresence>
              {showNotifPanel && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="notif-panel glass-card rounded-2xl"
                >
                  <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900">{t('nav.notifications')}</h3>
                    {unreadNotifs.length > 0 && (
                      <button onClick={handleMarkAllRead} className="text-xs font-semibold text-brand hover:text-brand-secondary transition-colors">
                        {t('nav.markAllRead')}
                      </button>
                    )}
                  </div>
                  <div className="max-h-[340px] overflow-y-auto">
                    {unreadNotifs.length === 0 ? (
                      <div className="p-8 text-center">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                          <Bell className="w-5 h-5 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-500 font-medium">{t('nav.noNewNotifications')}</p>
                        <p className="text-xs text-gray-400 mt-1">{t('nav.allCaughtUp')}</p>
                      </div>
                    ) : (
                      unreadNotifs.map((n, i) => (
                        <div key={n.id || i} className="notif-item">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-brand mt-1.5 shrink-0" />
                            <div>
                              <p className="text-sm text-gray-800">{n.message}</p>
                              <p className="text-xs text-gray-400 mt-0.5">{new Date(n.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-blue-50/50 transition-all duration-200"
            >
              <div className="w-8 h-8 rounded-full hero-gradient flex items-center justify-center shadow-md overflow-hidden">
                {currentUser?.photo ? (
                  <img src={currentUser.photo} alt={currentUser.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white font-bold text-sm">
                    {currentUser?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-gray-900 leading-tight">{currentUser?.name}</p>
                <p className="text-[10px] font-medium text-brand uppercase tracking-wider">{currentUser?.role}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
            </button>
            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-48 glass-card rounded-2xl overflow-hidden"
                >
                  <div className="p-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{currentUser?.name}</p>
                    <p className="text-xs text-gray-500">{currentUser?.email || currentUser?.phone}</p>
                  </div>
                  <div className="p-1">
                    <button onClick={() => { setShowProfileMenu(false); switchView('profileView'); }} className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-gray-700 hover:bg-blue-50/50 rounded-lg transition-colors">
                      <User className="w-4 h-4 text-gray-400" />
                      {t('nav.profile')}
                    </button>
                    <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <LogOut className="w-4 h-4" />
                      {t('nav.signOut')}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

    </header>
  );
}
