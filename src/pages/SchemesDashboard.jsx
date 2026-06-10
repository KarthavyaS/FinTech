import { CATEGORIES } from '../data/categories.js';
import { useApp } from '../contexts/AppContext.jsx';

export default function SchemesDashboard() {
  const { openCategory } = useApp();

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Services Offered</h2>
        <p className="text-slate-500 mt-2">Select a category to view available schemes.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {CATEGORIES.map((c) => (
          <div
            key={c.id}
            className="clickable-item"
            onClick={() => openCategory(c.id)}
          >
            <div className="icon-box">
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
                <g dangerouslySetInnerHTML={{ __html: c.path }} />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900">{c.name}</h3>
            <p className="text-sm text-slate-500 mt-1 flex-grow">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
