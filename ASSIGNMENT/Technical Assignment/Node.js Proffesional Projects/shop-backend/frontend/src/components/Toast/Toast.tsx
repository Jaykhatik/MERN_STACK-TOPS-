
import { useStore } from '../../store/useStore';
import './Toast.css';

const Toast = () => {
  const { toastMessage, hideToast } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="toast animate-toast">
      <span>{toastMessage}</span>
      <button className="toast-close" onClick={hideToast}>&times;</button>
    </div>
  );
};

export default Toast;
