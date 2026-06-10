import { useApp } from '../contexts/AppContext.jsx';

export default function CategoryList() {
  const { currentCategory, switchView, openSchemeForm } = useApp();

  if (!currentCategory) {
    switchView('schemesView');
    return null;
  }

  return (
    <div className="w-full">
      <button onClick={() => switchView('schemesView')} className="btn-secondary mb-6 pl-3">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </button>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{currentCategory.name}</h2>
        <p className="text-slate-500 mt-2">{currentCategory.desc}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentCategory.schemes.map((s) => (
          <div
            key={s.id}
            className="clickable-item !p-5 !flex-row !items-center !justify-between"
            onClick={() => openSchemeForm(s.id)}
          >
            <h4 className="font-semibold text-slate-900">{s.name}</h4>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-slate-400">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
