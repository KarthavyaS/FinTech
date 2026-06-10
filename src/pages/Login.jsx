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
      <div className="card">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Agent Login</h2>
          <p className="text-slate-500 text-sm mt-2">Sign in to manage applications</p>
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
        <div className="mt-6 pt-6 border-t border-slate-100 text-center">
          <p className="text-slate-500 text-sm">
            New Agent?{' '}
            <button onClick={() => switchView('registerView')} className="text-slate-900 font-semibold hover:underline">
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
