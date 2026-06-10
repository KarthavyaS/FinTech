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
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-theme-gradient shadow-lg mb-4">
          <svg className="text-white w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
      </div>
      <div className="card">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-theme-primary">Agent Registration</h2>
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
        <div className="mt-6 pt-6 border-t border-theme-light text-center">
          <button onClick={() => switchView('loginView')} className="text-theme-brand font-semibold text-sm hover:underline">
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
