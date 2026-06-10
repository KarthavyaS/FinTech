import { useAuth } from '../contexts/AuthContext.jsx';
import { useApp } from '../contexts/AppContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const { switchView } = useApp();

  function handleLogin(e) {
    e.preventDefault();
    login();
    switchView('schemesView');
  }

  return (
    <div className="w-full max-w-sm my-auto">
      <div className="text-center mb-8 flex flex-col items-center">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] shadow-lg flex items-center justify-center ring-4 ring-theme-light">
          <img src="/logo.jpeg" alt="NexaFin" className="w-11 h-11 rounded-full" />
        </div>
      </div>
      <div className="card">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-theme-primary">Agent Login</h2>
          <p className="text-theme-muted text-sm mt-2">Sign in to manage applications</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="label">Email Address</label>
            <input type="email" required className="input-field" placeholder="agent@nexafin.com" />
          </div>
          <div>
            <label className="label">Password</label>
            <input type="password" required className="input-field" placeholder="••••••••" />
          </div>
          <button type="submit" className="btn-primary mt-2">Sign In</button>
        </form>
        <div className="mt-6 pt-6 border-t border-theme-light text-center">
          <p className="text-theme-muted text-sm">
            New Agent?{' '}
            <button onClick={() => switchView('registerView')} className="text-theme-brand font-semibold hover:underline">
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
