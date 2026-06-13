import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../contexts/AppContext.jsx';

export default function Toast() {
  const { toast } = useApp();

  const typeConfig = {
    success: { icon: CheckCircle, bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-800', iconColor: 'text-emerald-500' },
    error: { icon: XCircle, bg: 'bg-red-50 border-red-200', text: 'text-red-800', iconColor: 'text-red-500' },
    warning: { icon: AlertCircle, bg: 'bg-amber-50 border-amber-200', text: 'text-amber-800', iconColor: 'text-amber-500' },
    info: { icon: Info, bg: 'bg-blue-50 border-blue-200', text: 'text-blue-800', iconColor: 'text-blue-500' },
  };

  const config = typeConfig[toast.type] || typeConfig.info;
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {toast.visible && (
        <motion.div
          initial={{ opacity: 0, x: 80, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 80, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`fixed top-20 right-4 md:right-8 z-[200] pointer-events-auto max-w-sm ${config.bg} border rounded-2xl shadow-2xl shadow-brand/10 backdrop-blur-sm`}
        >
          <div className="flex items-start gap-3 p-4">
            <div className={`shrink-0 mt-0.5 ${config.iconColor}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold ${config.text}`}>{toast.message}</p>
              {toast.description && (
                <p className={`text-xs mt-0.5 ${config.text} opacity-80`}>{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => {}}
              className={`shrink-0 ${config.text} opacity-50 hover:opacity-100 transition-opacity`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
