import { useApp } from '../contexts/AppContext.jsx';

export default function Success() {
  const { switchView } = useApp();

  return (
    <div className="w-full max-w-sm my-auto text-center">
      <div className="card py-12">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Submitted!</h2>
        <p className="text-slate-500 mb-8 px-4">Application recorded successfully.</p>
        <button onClick={() => switchView('schemesView')} className="btn-secondary">
          Return to Services
        </button>
      </div>
    </div>
  );
}
