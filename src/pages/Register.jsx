import { useApp } from '../contexts/AppContext.jsx';

export default function Register() {
  const { switchView, showToast } = useApp();

  function handleRegister(e) {
    e.preventDefault();
    showToast('Registered successfully. Please login.');
    switchView('loginView');
  }

  return (
    <div className="w-full max-w-md">
      <div className="card">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Agent Registration</h2>
        </div>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="label">Full Name</label>
            <input type="text" required className="input-field" />
          </div>
          <div>
            <label className="label">Phone</label>
            <input type="tel" required className="input-field" />
          </div>
          <div>
            <label className="label">Email</label>
            <input type="email" required className="input-field" />
          </div>
          <div>
            <label className="label">Password</label>
            <input type="password" required className="input-field" />
          </div>
          <button type="submit" className="btn-primary mt-4">Create Account</button>
        </form>
        <div className="mt-6 pt-6 border-t border-slate-100 text-center">
          <button onClick={() => switchView('loginView')} className="text-slate-900 font-semibold text-sm hover:underline">
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
