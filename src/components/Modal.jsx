export default function Modal({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/30" onClick={onCancel}>
      <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
        {title && <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>}
        {message && <p className="text-slate-600 mb-6">{message}</p>}
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="btn-secondary !py-2 !px-4">Cancel</button>
          <button onClick={onConfirm} className="btn-primary !py-2 !px-4 !w-auto">Confirm</button>
        </div>
      </div>
    </div>
  );
}
