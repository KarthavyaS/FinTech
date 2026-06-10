import { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext.jsx';
import { CATEGORIES } from '../data/categories.js';
import Modal from '../components/Modal.jsx';

export default function Submissions() {
  const { submissions, deleteSubmission } = useApp();
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const sel = document.getElementById('filterCat');
    if (sel) {
      sel.innerHTML = '<option value="">All Categories</option>' +
        CATEGORIES.map((c) => `<option value="${c.id}">${c.name}</option>`).join('');
    }
  }, []);

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl font-bold text-slate-900">My Submissions</h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or ID..."
            className="input-field !py-2 !w-full sm:!w-64"
          />
          <select
            id="filterCat"
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
        <div className="text-center py-16 card">
          <p className="text-slate-500 font-medium">No submissions found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s) => (
            <div key={s.id} className="card flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded">
                    {s.category}
                  </span>
                  <span className="text-xs text-slate-400">{formatDate(s.date)}</span>
                </div>
                <h4 className="font-bold text-slate-900 break-words">{s.data.customerName}</h4>
                <p className="text-sm text-slate-500 mt-1">{s.scheme}</p>
              </div>
              <div className="mt-4 pt-4 border-t flex justify-end gap-2">
                <button
                  onClick={() => setDeleteId(s.id)}
                  className="text-xs font-semibold px-3 py-1.5 rounded border border-red-200 text-red-600 hover:bg-red-50"
                >
                  Delete
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
