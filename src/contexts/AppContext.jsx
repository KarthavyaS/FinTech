import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CATEGORIES } from '../data/categories.js';

const AppContext = createContext(null);

function loadSubmissions() {
  try {
    return JSON.parse(localStorage.getItem('nexafin_subs') || '[]');
  } catch {
    return [];
  }
}

function saveSubmissions(subs) {
  localStorage.setItem('nexafin_subs', JSON.stringify(subs));
}

export function AppProvider({ children }) {
  const [currentView, setCurrentView] = useState('landingView');
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentScheme, setCurrentScheme] = useState(null);
  const [submissions, setSubmissions] = useState(loadSubmissions);
  const [toast, setToast] = useState({ message: '', visible: false });
  const [chatMessages, setChatMessages] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showPredefinedBtns, setShowPredefinedBtns] = useState(true);

  useEffect(() => {
    saveSubmissions(submissions);
  }, [submissions]);

  const showToast = useCallback((message) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: '', visible: false }), 2500);
  }, []);

  const switchView = useCallback((viewId) => {
    setCurrentView(viewId);
    window.scrollTo(0, 0);
  }, []);

  const openCategory = useCallback((catId) => {
    const cat = CATEGORIES.find((c) => c.id === catId);
    if (cat) {
      setCurrentCategory(cat);
      switchView('categoryListView');
    }
  }, [switchView]);

  const openSchemeForm = useCallback((schemeId) => {
    if (!currentCategory) return;
    const scheme = currentCategory.schemes.find((s) => s.id === schemeId);
    if (scheme) {
      setCurrentScheme(scheme);
      switchView('formView');
    }
  }, [currentCategory, switchView]);

  const addSubmission = useCallback((data) => {
    if (!currentCategory || !currentScheme) return;
    const submission = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      category: currentCategory.name,
      categoryId: currentCategory.id,
      scheme: currentScheme.name,
      data,
    };
    setSubmissions((prev) => [submission, ...prev]);
    switchView('successView');
  }, [currentCategory, currentScheme, switchView]);

  const deleteSubmission = useCallback((id) => {
    setSubmissions((prev) => prev.filter((x) => x.id !== id));
    showToast('Record deleted');
  }, [showToast]);

  const toggleChat = useCallback(() => {
    setIsChatOpen((prev) => !prev);
  }, []);

  const addChatMessage = useCallback((msg, sender) => {
    setChatMessages((prev) => [...prev, { text: msg, sender }]);
  }, []);

  const sendChatMessage = useCallback((text) => {
    if (!text.trim()) return;
    addChatMessage(text, 'user');
    setShowPredefinedBtns(false);

    setTimeout(() => {
      let reply = "I'm sorry, I don't understand that. You can ask about Savings, Credit, Insurance, Pension, Social Security, or type 'contact admin'.";
      const lmsg = text.toLowerCase();

      if (lmsg.includes('saving')) {
        reply = 'We offer High Return FDs, RDs, SGB, ELSS, and SIPs. Navigate to Services -> Savings to apply.';
      } else if (lmsg.includes('credit') || lmsg.includes('loan')) {
        reply = 'We offer Micro Credit, Livelihood Support, MSME, and Home/Vehicle Loans. Navigate to Services -> Credit.';
      } else if (lmsg.includes('insurance')) {
        reply = 'We offer Life, Medical, Vehicle, and Agri Insurance. Navigate to Services -> Insurance.';
      } else if (lmsg.includes('pension')) {
        reply = 'We offer APY, PM-SYM / PM-KMY, and NPS-Lite. Navigate to Services -> Pension.';
      } else if (lmsg.includes('social') || lmsg.includes('welfare')) {
        reply = 'We currently implement TNUWWB, TNCWWB, and E-SHRAM schemes. Navigate to Services -> Social Security.';
      } else if (lmsg.includes('admin') || lmsg.includes('contact')) {
        reply = "You can contact the admin team by clicking 'Contact Admin' in the top menu or the bottom bar.";
      } else if (lmsg.includes('hello') || lmsg.includes('hi')) {
        reply = 'Hello! How can I assist you with NexaFin services today?';
      }

      addChatMessage(reply, 'bot');
    }, 600);
  }, [addChatMessage]);

  const contactAdmin = useCallback(() => {
    showToast('Connecting to admin support team...');
  }, [showToast]);

  const value = {
    currentView,
    switchView,
    currentCategory,
    setCurrentCategory,
    currentScheme,
    setCurrentScheme,
    openCategory,
    openSchemeForm,
    submissions,
    addSubmission,
    deleteSubmission,
    toast,
    showToast,
    chatMessages,
    addChatMessage,
    sendChatMessage,
    isChatOpen,
    toggleChat,
    showPredefinedBtns,
    contactAdmin,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
