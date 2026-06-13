import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  FileText, CheckCircle, Send, Bell, ArrowRight, ArrowLeft,
  Sparkles, Clock, Shield, Activity, Inbox,
  ChevronRight, RefreshCw,
  X, User, Mail, Phone, Edit2, Lock, Award, CreditCard,
  Building, MapPin, Key, Globe, Smartphone, BadgeCheck,
  AlertTriangle, Calendar, Eye, EyeOff,
  ChevronDown, Camera
} from 'lucide-react';
import { useApp } from '../contexts/AppContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
const STATUS_COLORS = {
  SUBMITTED: { bg: '#DBEAFE', text: '#1D4ED8' },
  AGENT_REVIEW: { bg: '#F3E8FF', text: '#7C3AED' },
  DOCUMENTS_PENDING: { bg: '#FEF3C7', text: '#B45309' },
  DOCUMENTS_VERIFIED: { bg: '#D1FAE5', text: '#047857' },
  ADMIN_REVIEW: { bg: '#E0E7FF', text: '#4338CA' },
  BANK_SELECTION: { bg: '#CFFAFE', text: '#0E7490' },
  SENT_TO_BANK: { bg: '#E0F2FE', text: '#0369A1' },
  UNDER_BANK_REVIEW: { bg: '#FED7AA', text: '#C2410C' },
  APPROVED: { bg: '#D1FAE5', text: '#059669' },
  REJECTED: { bg: '#FEE2E2', text: '#DC2626' },
  COMPLETED: { bg: '#F3F4F6', text: '#6B7280' },
};

function useCountUp(target, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hasAnimated.current = true;
          let start = 0;
          const increment = Math.max(1, Math.ceil(target / (duration / 16)));
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return [count, ref];
}

const statIcons = [FileText, CheckCircle, Send, Bell];
const iconGradients = ['blue', 'green', 'purple', 'amber'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  hover: { y: -6, transition: { duration: 0.3, ease: 'easeOut' } },
};

function SectionCard({ icon: Icon, title, children, className = '' }) {
  return (
    <motion.div variants={itemVariants} className={`bg-white rounded-2xl border border-gray-100 shadow-sm ${className}`}>
      <div className="p-6 md:p-7">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
            <Icon className="w-4.5 h-4.5 text-brand" />
          </div>
          <h2 className="text-base font-bold text-gray-900">{title}</h2>
        </div>
        {children}
      </div>
    </motion.div>
  );
}

function ToggleSwitch({ enabled, onChange }) {
  return (
    <div onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer shrink-0 ${enabled ? 'bg-brand' : 'bg-gray-300'}`}>
      <motion.div animate={{ x: enabled ? 22 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md" />
    </div>
  );
}

function PInput({ label, name, type = 'text', value, onChange, icon: Icon, readOnly }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1.5">{label}</label>
      {!readOnly && onChange ? (
        <div className="relative">
          {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />}
          <input type={type} name={name} value={value} onChange={onChange}
            className={`w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all ${Icon ? 'pl-10' : ''}`} />
        </div>
      ) : (
        <div className="flex items-center gap-2.5 bg-gray-50 rounded-xl px-3.5 py-2.5">
          {Icon && <Icon className="w-4 h-4 text-gray-400 shrink-0" />}
          <p className="text-sm text-gray-900">{value || 'Not set'}</p>
        </div>
      )}
    </div>
  );
}

function PField({ label, name, type, value, onChange, onToggle, showing }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1.5">{label}</label>
      <div className="relative">
        <input type={type} name={name} value={value} onChange={onChange}
          className="w-full px-3.5 py-2.5 pr-10 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all" />
        <button type="button" onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
          {showing ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

function SaveIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );
}

function BarChart3Icon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  );
}

export default function ClientDashboard() {
  const { t, i18n } = useTranslation();
  const { applications, switchView, getApplicationsByClient, getUnreadNotifications, markNotificationsRead, showToast, currentView } = useApp();
  const { currentUser, updateUser } = useAuth();
  const isProfileView = currentView === 'profileView';

  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [animatedNotifs, setAnimatedNotifs] = useState(false);
  const [ripplePos, setRipplePos] = useState(null);
  const fileInputRef = useRef(null);

  const [profileEditing, setProfileEditing] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [saved, setSaved] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const [profileForm, setProfileForm] = useState({ name: '', email: '', phone: '', dob: '', address: '' });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [notifPrefs, setNotifPrefs] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('notif_prefs_' + currentUser?.id) || 'null');
      return stored || { email: true, sms: false, push: true };
    } catch { return { email: true, sms: false, push: true }; }
  });

  useEffect(() => {
    if (currentUser) setProfileForm({ name: currentUser.name || '', email: currentUser.email || '', phone: currentUser.phone || '', dob: currentUser.dob || '', address: currentUser.address || '' });
  }, [currentUser]);

  useEffect(() => { if (saved) { const t = setTimeout(() => setSaved(false), 2500); return () => clearTimeout(t); } }, [saved]);
  useEffect(() => { localStorage.setItem('notif_prefs_' + currentUser?.id, JSON.stringify(notifPrefs)); }, [notifPrefs, currentUser?.id]);

  useEffect(() => {
    const seen = localStorage.getItem('welcome_popup_seen');
    if (!seen && currentUser) {
      const timer = setTimeout(() => setShowWelcomePopup(true), 600);
      localStorage.setItem('welcome_popup_seen', 'true');
      return () => clearTimeout(timer);
    }
  }, [currentUser]);

  const myApps = getApplicationsByClient(currentUser?.id);
  const activeApps = myApps.filter(a => !['COMPLETED', 'REJECTED', 'APPROVED'].includes(a.status));
  const unreadNotifs = getUnreadNotifications('client');
  const completedApps = myApps.filter(a => ['COMPLETED', 'APPROVED', 'REJECTED'].includes(a.status));

  useEffect(() => {
    if (unreadNotifs.length > 0) {
      setAnimatedNotifs(true);
      const t = setTimeout(() => setAnimatedNotifs(false), 2000);
      return () => clearTimeout(t);
    }
  }, [unreadNotifs.length]);

  function handleMarkRead() {
    if (unreadNotifs.length > 0) markNotificationsRead('client');
  }

  const stats = [
    { label: t('stats.activeApplications'), value: activeApps.length },
    { label: t('stats.completed'), value: completedApps.length },
    { label: t('stats.totalSubmitted'), value: myApps.length },
    { label: t('stats.notifications'), value: unreadNotifs.length },
  ];

  const today = new Date();
  const dateStr = today.toLocaleDateString(i18n.language === 'en' ? 'en-US' : i18n.language, {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });

  const recentActivity = myApps
    .slice(0, 5)
    .map(app => {
      const msgKey = {
        SUBMITTED: 'submitted',
        APPROVED: 'approved',
        REJECTED: 'rejected',
        COMPLETED: 'completed',
        DOCUMENTS_PENDING: 'documentsPending',
        UNDER_BANK_REVIEW: 'bankReview',
        SENT_TO_BANK: 'sentToBank',
      }[app.status] || 'default';

      const message = msgKey === 'default'
        ? t('activityMessages.default', { status: app.status.replace(/_/g, ' ') })
        : t(`activityMessages.${msgKey}`);

      return {
        id: app.id,
        message,
        date: app.date,
        scheme: app.scheme,
        color: STATUS_COLORS[app.status]?.text || '#6B7280',
      };
    });

  function handleRipple(e, action) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipplePos({ x, y, id: action });
    setTimeout(() => setRipplePos(null), 600);
    if (action === 'apply') switchView('schemesView');
    else if (action === 'view') switchView('submissionsView');
  }

  function handleProfileChange(e) {
    setProfileForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handlePasswordChange(e) {
    setPasswordForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setPasswordError('');
  }

  function handleProfileSave() {
    const updates = {};
    if (profileForm.name !== currentUser.name) updates.name = profileForm.name;
    if (profileForm.email !== currentUser.email) updates.email = profileForm.email;
    if (profileForm.phone !== currentUser.phone) updates.phone = profileForm.phone;
    if (profileForm.dob !== (currentUser.dob || '')) updates.dob = profileForm.dob;
    if (profileForm.address !== (currentUser.address || '')) updates.address = profileForm.address;
    if (Object.keys(updates).length > 0) updateUser(currentUser.id, updates);
    setSaved(true);
    setProfileEditing(false);
  }

  function handleCancelEdit() {
    setProfileForm({ name: currentUser.name || '', email: currentUser.email || '', phone: currentUser.phone || '', dob: currentUser.dob || '', address: currentUser.address || '' });
    setProfileEditing(false);
  }

  function handleUpdatePassword() {
    setPasswordError('');
    if (passwordForm.currentPassword !== currentUser.password) { setPasswordError('Current password is incorrect'); return; }
    if (!passwordForm.newPassword || passwordForm.newPassword.length < 6) { setPasswordError('New password must be at least 6 characters'); return; }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) { setPasswordError('New passwords do not match'); return; }
    updateUser(currentUser.id, { password: passwordForm.newPassword });
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setEditingPassword(false);
    setSaved(true);
  }

  function handlePhotoUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      updateUser(currentUser.id, { photo: ev.target.result });
      setSaved(true);
    };
    reader.readAsDataURL(file);
  }

  const memberSince = currentUser?.createdAt
    ? new Date(currentUser.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'N/A';

  if (isProfileView) {
    const pf = profileForm;
    const cu = currentUser;
    return (
      <div className="w-full min-h-screen bg-gray-50/50 page-content">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-12" style={{ marginTop: '36px' }}>
          {/* Page Header */}
          <motion.div variants={itemVariants} className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <button onClick={() => switchView('clientDashboardView')}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand mb-3 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </button>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">My Profile</h1>
              <p className="text-sm text-gray-500 mt-1">Manage your personal information and account settings</p>
            </div>
            {profileEditing ? (
              <div className="flex items-center gap-2">
                <button onClick={handleProfileSave}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white hero-gradient rounded-xl hover:opacity-90 transition-all shadow-lg shadow-brand/20">
                  <SaveIcon className="w-4 h-4" /> Save Changes
                </button>
                <button onClick={handleCancelEdit}
                  className="px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all">
                  Cancel
                </button>
              </div>
            ) : (
              <button onClick={() => setProfileEditing(true)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white hero-gradient rounded-xl hover:opacity-90 transition-all shadow-lg shadow-brand/20">
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            )}
          </motion.div>

          {/* Profile Summary Card */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6 sm:mb-8">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6">
                <div className="relative group shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full hero-gradient flex items-center justify-center shadow-lg overflow-hidden">
                    {cu?.photo ? (
                      <img src={cu.photo} alt={cu.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white font-bold text-3xl sm:text-4xl">{cu?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
                    )}
                  </div>
                  <button onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="w-6 h-6 text-white" />
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{cu?.name}</h2>
                    <span className="text-xs font-semibold text-brand bg-blue-50 px-3 py-1 rounded-full capitalize">{cu?.role}</span>
                    <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Active
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {cu?.email}</span>
                    <span className="hidden sm:block text-gray-300">|</span>
                    <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {cu?.phone || 'Not set'}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-7">

              {/* Profile Completion */}
              <SectionCard icon={Award} title="Profile Completion">
                {(() => {
                  const checks = [
                    { key: 'name', label: 'Name added', done: !!cu?.name },
                    { key: 'email', label: 'Email verified', done: !!cu?.email },
                    { key: 'phone', label: 'Phone added', done: !!cu?.phone },
                  ];
                  const done = checks.filter(c => c.done).length;
                  const total = checks.length;
                  const pct = Math.round(done / total * 100);
                  return (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Your profile is {pct}% complete</span>
                        <span className="text-sm font-semibold text-brand">{pct}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: pct + '%' }} transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }} className="h-full hero-gradient rounded-full" />
                      </div>
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        {checks.map(c => (
                          <div key={c.key} className={"flex items-center gap-2 text-xs " + (c.done ? 'text-gray-500' : 'text-amber-600')}>
                            {c.done ? <CheckCircle className="w-3.5 h-3.5 text-green-500" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                            {c.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </SectionCard>

              {/* Personal Information */}
              <SectionCard icon={User} title="Personal Information">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <PInput label="Full Name" name="name" value={pf.name} onChange={handleProfileChange} icon={User} />
                    <PInput label="Email Address" name="email" type="email" value={pf.email} onChange={handleProfileChange} icon={Mail} />
                    <PInput label="Phone Number" name="phone" type="tel" value={pf.phone} onChange={handleProfileChange} icon={Phone} />
                    <PInput label="Role" value={cu?.role?.charAt(0).toUpperCase() + cu?.role?.slice(1) || ''} icon={Shield} readOnly />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <PInput label="Date of Birth" name="dob" value={pf.dob} onChange={handleProfileChange} icon={Calendar} />
                    <PInput label="Address" name="address" value={pf.address} onChange={handleProfileChange} icon={MapPin} />
                  </div>
                  <div className="pt-2 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-xl">
                      <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Member Since</p>
                        <p className="text-sm font-medium text-gray-900">{memberSince}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-xl">
                      <Key className="w-4 h-4 text-gray-400 shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">User ID</p>
                        <p className="text-sm font-medium text-gray-900 font-mono text-xs">{cu?.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-xl">
                      <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Last Updated</p>
                        <p className="text-sm font-medium text-gray-900">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SectionCard>
            </div>

            {/* Right Column */}
            <div className="space-y-6 sm:space-y-7">

              {/* Security & Verification */}
              <SectionCard icon={Shield} title="Security & Verification">
                <div className="space-y-4">
                  {[
                    { icon: BadgeCheck, bg: 'bg-green-100', color: 'text-green-600', label: 'Email Verified', sub: cu?.email, badge: 'Verified', badgeStyle: 'text-green-600 bg-green-50' },
                    { icon: Smartphone, bg: 'bg-green-100', color: 'text-green-600', label: 'Phone Verified', sub: cu?.phone || 'Not set', badge: 'Verified', badgeStyle: 'text-green-600 bg-green-50' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={"w-8 h-8 rounded-lg shrink-0 " + item.bg + " flex items-center justify-center"}>
                          <item.icon className={"w-4 h-4 " + item.color} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900">{item.label}</p>
                          <p className="text-xs text-gray-500 truncate">{item.sub}</p>
                        </div>
                      </div>
                      <span className={"text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 " + item.badgeStyle}>{item.badge}</span>
                    </div>
                  ))}
                </div>
              </SectionCard>

              {/* Change Password */}
              <SectionCard icon={Lock} title="Change Password">
                <div>
                  <button onClick={() => { setEditingPassword(!editingPassword); setPasswordError(''); }}
                    className="w-full flex items-center justify-between">
                    <span className="text-sm text-gray-600">Update your password</span>
                    <ChevronDown className={"w-4 h-4 text-gray-400 transition-transform duration-200 " + (editingPassword ? 'rotate-180' : '')} />
                  </button>
                  {editingPassword && (
                    <div className="space-y-3.5 pt-4 mt-4 border-t border-gray-100">
                      <PField label="Current Password" name="currentPassword" type={showCurrentPw ? 'text' : 'password'} value={passwordForm.currentPassword} onChange={handlePasswordChange} onToggle={() => setShowCurrentPw(!showCurrentPw)} showing={showCurrentPw} />
                      <PField label="New Password" name="newPassword" type={showNewPw ? 'text' : 'password'} value={passwordForm.newPassword} onChange={handlePasswordChange} onToggle={() => setShowNewPw(!showNewPw)} showing={showNewPw} />
                      <PField label="Confirm New Password" name="confirmPassword" type={showConfirmPw ? 'text' : 'password'} value={passwordForm.confirmPassword} onChange={handlePasswordChange} onToggle={() => setShowConfirmPw(!showConfirmPw)} showing={showConfirmPw} />
                      {passwordError && <p className="text-xs text-red-500 flex items-center gap-1.5 bg-red-50 px-3 py-2 rounded-lg"><AlertTriangle className="w-3.5 h-3.5" /> {passwordError}</p>}
                      <button onClick={handleUpdatePassword} className="w-full py-2.5 text-sm font-semibold text-white hero-gradient rounded-xl hover:opacity-90 transition-all">Update Password</button>
                    </div>
                  )}
                </div>
              </SectionCard>

              {/* Notification Preferences */}
              <SectionCard icon={Bell} title="Notification Preferences">
                <div className="space-y-3">
                  {[
                    { icon: Mail, label: 'Email Notifications', sub: 'Receive updates via email', key: 'email' },
                    { icon: Smartphone, label: 'SMS Notifications', sub: 'Receive updates via SMS', key: 'sms' },
                    { icon: Globe, label: 'Push Notifications', sub: 'Receive push notifications', key: 'push' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <item.icon className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.label}</p>
                          <p className="text-xs text-gray-500">{item.sub}</p>
                        </div>
                      </div>
                      <ToggleSwitch enabled={notifPrefs[item.key]} onChange={() => setNotifPrefs(prev => ({ ...prev, [item.key]: !prev[item.key] }))} />
                    </div>
                  ))}
                </div>
              </SectionCard>

            </div>
          </div>
        </div>

        {/* Saved Toast */}
        {saved && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white text-sm font-medium px-5 py-3 rounded-xl shadow-lg flex items-center gap-2.5 z-50">
            <CheckCircle className="w-4.5 h-4.5" />
            Changes saved successfully
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full page-content relative">
      {/* Background Elements - Light Blue Fintech Palette */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#E0F2FE] via-[#DBEAFE] to-transparent opacity-60 blur-3xl -translate-y-1/4 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#EFF6FF] via-[#DBEAFE] to-transparent opacity-50 blur-3xl translate-y-1/4 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#F0F9FF] via-[#E0F2FE] to-transparent opacity-40 blur-3xl -translate-x-1/2 -translate-y-1/2" />


      </div>

      {/* Welcome Popup */}
      <AnimatePresence>
        {showWelcomePopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4"
            style={{ background: 'rgba(15, 23, 42, 0.4)' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="glass-card rounded-3xl p-8 max-w-md w-full text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand via-brand-light to-brand" />
              <button
                onClick={() => setShowWelcomePopup(false)}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-16 h-16 rounded-2xl hero-gradient flex items-center justify-center mx-auto mb-5 shadow-xl shadow-brand/20">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('welcomePopup.title')}</h2>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">{t('welcomePopup.description')}</p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowWelcomePopup(false)}
                className="w-full py-3 bg-brand hover:bg-brand-secondary text-white font-semibold rounded-xl transition-colors shadow-lg shadow-brand/25"
              >
                {t('welcomePopup.getStarted')}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        {/* Welcome Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="relative overflow-hidden rounded-2xl hero-gradient p-6 md:p-8 hero-glow">
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-transparent" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-1">
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Sparkles className="w-4 h-4 text-blue-200" />
                </motion.div>
                <span className="text-xs font-semibold text-blue-200 uppercase tracking-widest">{t('welcome.clientPortal')}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mt-2">
                {t('welcome.title', { name: currentUser?.name?.split(' ')[0] || 'User' })}
              </h1>
              <p className="text-blue-200 mt-1 text-sm md:text-base max-w-xl">
                {t('welcome.subtitle')}
              </p>
              <div className="flex items-center gap-3 mt-4 flex-wrap">
                <div className="flex items-center gap-1.5 text-xs text-blue-200/80">
                  <Clock className="w-3.5 h-3.5" />
                  {dateStr}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-blue-200/80">
                  <Shield className="w-3.5 h-3.5" />
                  {t('welcome.secured')}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Profile Card */}
        <motion.div variants={itemVariants} className="mb-4">
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full hero-gradient flex items-center justify-center shadow-md shrink-0 overflow-hidden">
                {currentUser?.photo ? (
                  <img src={currentUser.photo} alt={currentUser.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white font-bold text-xl">
                    {currentUser?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-gray-900 truncate">{currentUser?.name}</h2>
                  <span className="text-[10px] font-semibold text-brand bg-blue-50 px-2 py-0.5 rounded-full capitalize">{currentUser?.role}</span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {currentUser?.email}</span>
                  <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {currentUser?.phone || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s, i) => {
              const Icon = statIcons[i];
              const [count, countRef] = useCountUp(s.value);
              return (
                <motion.div
                  key={i}
                  ref={countRef}
                  variants={cardVariants}
                  whileHover="hover"
                  className="glass-card rounded-2xl p-5 cursor-default card-lift relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <motion.div
                        className={`icon-gradient ${iconGradients[i]}`}
                        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.div>
                      {i === 3 && unreadNotifs.length > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={animatedNotifs ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                          transition={{ duration: 0.4 }}
                          className="text-[10px] font-bold text-white bg-red-500 px-1.5 py-0.5 rounded-full shadow-lg shadow-red-500/30"
                        >
                          {unreadNotifs.length}
                        </motion.span>
                      )}
                    </div>
                    <p className="text-2xl md:text-3xl font-bold text-gray-900 count-up tabular-nums">
                      {count}
                    </p>
                    <p className="text-xs md:text-sm text-gray-500 font-medium mt-1">{s.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Unread Notifications Banner */}
        {unreadNotifs.length > 0 && (
          <motion.div
            variants={itemVariants}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <div className="glass-card rounded-2xl overflow-hidden border-l-4 border-l-warning">
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <motion.div
                      className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center"
                      animate={animatedNotifs ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Bell className="w-4 h-4 text-amber-600" />
                    </motion.div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {unreadNotifs.length === 1
                          ? t('notifications.unread', { count: 1 })
                          : t('notifications.unread', { count: unreadNotifs.length })}
                      </p>
                      <p className="text-xs text-gray-500">{t('notifications.stayUpdated')}</p>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleMarkRead}
                    className="text-xs font-semibold text-brand hover:text-brand-secondary px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    {t('notifications.markAllRead')}
                  </motion.button>
                </div>
                <div className="space-y-2">
                  {unreadNotifs.slice(0, 3).map((n, i) => (
                    <motion.div
                      key={n.id || i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl bg-blue-50/50"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-brand mt-1.5 shrink-0" />
                      <div>
                        <p className="text-xs md:text-sm text-gray-700">{n.message}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{new Date(n.date).toLocaleDateString()}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-brand" />
            {t('quickActions.applyForService').includes('Apply') ? 'Quick Actions' : (
              <span>{t('nav.dashboard')} Actions</span>
            )}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => handleRipple(e, 'apply')}
              className="action-card cursor-pointer relative overflow-hidden"
            >
              {ripplePos?.id === 'apply' && (
                <span
                  className="absolute w-32 h-32 bg-white/30 rounded-full pointer-events-none"
                  style={{
                    left: ripplePos.x - 64,
                    top: ripplePos.y - 64,
                    animation: 'ripple 0.6s ease-out forwards',
                  }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              <div className="flex items-start gap-4 relative z-10">
                <motion.div
                  className="icon-gradient blue shrink-0"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <FileText className="w-6 h-6" />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900">{t('quickActions.applyForService')}</h3>
                  <p className="text-sm text-gray-500 mt-1">{t('quickActions.applyDescription')}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-1 group-hover:bg-blue-100 transition-colors">
                  <ArrowRight className="w-4 h-4 text-brand" />
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => handleRipple(e, 'view')}
              className="action-card cursor-pointer relative overflow-hidden"
            >
              {ripplePos?.id === 'view' && (
                <span
                  className="absolute w-32 h-32 bg-white/30 rounded-full pointer-events-none"
                  style={{
                    left: ripplePos.x - 64,
                    top: ripplePos.y - 64,
                    animation: 'ripple 0.6s ease-out forwards',
                  }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              <div className="flex items-start gap-4 relative z-10">
                <motion.div
                  className="icon-gradient purple shrink-0"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                >
                  <Inbox className="w-6 h-6" />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900">{t('quickActions.viewApplications')}</h3>
                  <p className="text-sm text-gray-500 mt-1">{t('quickActions.viewDescription')}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center shrink-0 mt-1 group-hover:bg-purple-100 transition-colors">
                  <ArrowRight className="w-4 h-4 text-purple-600" />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Recent Activity + Active Applications */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Activity */}
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-brand" />
                  {t('activity.title')}
                </h2>
                {recentActivity.length > 0 && (
                  <button onClick={() => switchView('submissionsView')} className="text-xs font-semibold text-brand hover:text-brand-secondary transition-colors">
                    {t('activity.viewAll')}
                  </button>
                )}
              </div>
            </div>
            <div className="p-1">
              {recentActivity.length > 0 ? (
                recentActivity.map((act, i) => (
                  <motion.div
                    key={act.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="notif-item flex items-center gap-3 px-4 py-3 group"
                  >
                    <motion.div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 relative"
                      style={{ background: `${act.color}12` }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Activity className="w-4 h-4" style={{ color: act.color }} />
                      <span
                        className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
                        style={{ background: act.color }}
                      />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 group-hover:text-brand transition-colors">{act.message}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-400">{act.scheme}</span>
                        <span className="text-gray-300">·</span>
                        <span className="text-xs text-gray-400">{new Date(act.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 shrink-0 group-hover:text-brand transition-colors" />
                  </motion.div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <motion.div
                    className="empty-illustration mb-4"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Activity className="w-10 h-10 text-brand" />
                  </motion.div>
                  <h3 className="text-base font-semibold text-gray-900">{t('activity.noActivity')}</h3>
                  <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">
                    {t('activity.noActivityDescription')}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => switchView('schemesView')}
                    className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-brand text-white text-sm font-semibold rounded-xl hover:bg-brand-secondary transition-colors shadow-lg shadow-brand/25"
                  >
                    {t('activity.applyButton')}
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              )}
            </div>
          </div>

          {/* Active Applications */}
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand" />
                  {t('applications.active')}
                  {activeApps.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-xs font-bold text-white bg-brand px-1.5 py-0.5 rounded-full"
                    >
                      {activeApps.length}
                    </motion.span>
                  )}
                </h2>
                {activeApps.length > 0 && (
                  <button onClick={() => switchView('submissionsView')} className="text-xs font-semibold text-brand hover:text-brand-secondary transition-colors">
                    {t('applications.viewAll')}
                  </button>
                )}
              </div>
            </div>
            <div className="p-1">
              {activeApps.length > 0 ? (
                activeApps.slice(0, 5).map((app, i) => {
                  const sc = STATUS_COLORS[app.status] || STATUS_COLORS.SUBMITTED;
                  return (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.4 }}
                      className="notif-item flex items-center gap-3 px-4 py-3 group"
                    >
                      <motion.div
                        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: `${sc.text}12` }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <FileText className="w-4 h-4" style={{ color: sc.text }} />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: sc.bg, color: sc.text }}>
                            {t(`status.${app.status}`, app.status.replace(/_/g, ' '))}
                          </span>
                          <span className="text-xs text-gray-400">{app.category}</span>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{app.scheme}</p>
                        <p className="text-xs text-gray-400">{app.data?.customerName || 'N/A'} · {new Date(app.date).toLocaleDateString()}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 shrink-0 group-hover:text-brand transition-colors" />
                    </motion.div>
                  );
                })
              ) : (
                <div className="p-8 text-center">
                  <motion.div
                    className="empty-illustration mb-4"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  >
                    <Inbox className="w-10 h-10 text-brand" />
                  </motion.div>
                  <h3 className="text-base font-semibold text-gray-900">{t('applications.noApplications')}</h3>
                  <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">
                    {t('applications.noApplicationsDescription')}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => switchView('schemesView')}
                    className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-brand text-white text-sm font-semibold rounded-xl hover:bg-brand-secondary transition-colors shadow-lg shadow-brand/25"
                  >
                    {t('applications.applyButton')}
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div variants={itemVariants} className="text-center py-6">
          <p className="text-xs text-gray-400">
            {t('footer.secured')}
          </p>
        </motion.div>
      </motion.div>

    </div>
  );
}
