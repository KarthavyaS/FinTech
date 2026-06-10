import './App.css';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import { AppProvider, useApp } from './contexts/AppContext.jsx';
import Landing from './pages/Landing.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import SchemesDashboard from './pages/SchemesDashboard.jsx';
import CategoryList from './pages/CategoryList.jsx';
import DynamicForm from './pages/DynamicForm.jsx';
import Submissions from './pages/Submissions.jsx';
import Success from './pages/Success.jsx';

function AppContent() {
  const { isLoggedIn } = useAuth();
  const { currentView } = useApp();

  if (!isLoggedIn) {
    return (
      <main className="flex-grow flex flex-col items-center px-4 py-8 w-full">
        {currentView === 'landingView' ? <Landing /> : currentView === 'registerView' ? <Register /> : <Login />} 
      </main>
    );
  }

  function renderView() {
    switch (currentView) {
      case 'registerView':
        return <Register />;
      case 'categoryListView':
        return <CategoryList />;
      case 'formView':
        return <DynamicForm />;
      case 'submissionsView':
        return <Submissions />;
      case 'successView':
        return <Success />;
      case 'schemesView':
      default:
        return <SchemesDashboard />;
    }
  }

  return <MainLayout>{renderView()}</MainLayout>;
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}
