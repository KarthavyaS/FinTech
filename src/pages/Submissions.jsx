import { useState } from 'react';
import { useApp } from '../contexts/AppContext.jsx';
import { CATEGORIES } from '../data/categories.js';
import Modal from '../components/Modal.jsx';

export default function Submissions() {
  const { submissions, deleteSubmission } = useApp();
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const filtered = submissions.filter((s) => {
    if (filterCat && s.categoryId !== filterCat) return false;
    if (search) {
      const q = search.toLowerCase();
      const name = s.data.customerName || '';
      const phone = s.data.customerPhone || '';
      const id = s.id || '';
      return name.toLowerCase().includes(q) || phone.includes(q) || id.includes(q);
    }
    return true;
  });

  function handleDelete() {
    if (deleteId) {
      deleteSubmission(deleteId);
      setDeleteId(null);
    }
  }

  function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-1 bg-theme-brand rounded-full" />
        <span className="text-xs font-semibold text-theme-brand uppercase tracking-widest">Records</span>
      </div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl font-bold text-theme-primary">My Submissions</h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-muted pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name or ID..."
              className="input-field !py-2 !pl-10 !w-full sm:!w-64"
            />
          </div>
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="input-field !py-2 !w-full sm:!w-auto"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 card">
          <div className="w-16 h-16 rounded-full bg-theme-gradient-light flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-theme-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <p className="text-theme-muted font-medium">No submissions found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s) => (
            <div key={s.id} className="card flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="badge bg-theme-gradient-light text-theme-brand">
                    {s.category}
                  </span>
                  <span className="text-xs text-theme-muted">{formatDate(s.date)}</span>
                </div>
                <h4 className="font-bold text-theme-primary break-words">{s.data.customerName}</h4>
                <p className="text-sm text-theme-secondary mt-1">{s.scheme}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-theme-light flex justify-end gap-2">
                <button
                  onClick={() => setDeleteId(s.id)}
                  className="text-xs font-semibold px-3 py-1.5 rounded border border-[#FCA5A5] text-[#EF4444] hover:bg-[#FEF2F2] transition-colors"
                >
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={!!deleteId}
        title="Delete Record"
        message="Are you sure you want to delete this record?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
