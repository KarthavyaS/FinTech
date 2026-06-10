import { useApp } from '../contexts/AppContext.jsx';

export default function Toast() {
  const { toast } = useApp();

  return (
    <div
      id="toast"
      style={{
        opacity: toast.visible ? 1 : 0,
        transform: toast.visible
          ? 'translateX(-50%) translateY(0)'
          : 'translateX(-50%) translateY(20px)',
      }}
    >
      <span id="toastText">{toast.message}</span>
    </div>
  );
}
