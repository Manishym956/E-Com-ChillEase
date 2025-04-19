import { useState, useEffect, createContext, useContext } from 'react';

// Toast Context
const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <Toaster toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

// Toast Component
export const Toaster = ({ toasts = [], removeToast }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} removeToast={removeToast} />
      ))}
    </div>
  );
};

const Toast = ({ toast, removeToast }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, toast.duration);

    return () => clearTimeout(timer);
  }, [toast, removeToast]);

  const bgColor = 
    toast.type === 'success' ? 'bg-green-500' : 
    toast.type === 'error' ? 'bg-red-500' : 
    toast.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500';

  return (
    <div 
      className={`${bgColor} text-white px-4 py-2 rounded shadow-lg max-w-xs animate-fade-in`}
      role="alert"
    >
      <div className="flex justify-between items-center">
        <p>{toast.message}</p>
        <button 
          onClick={() => removeToast(toast.id)}
          className="ml-4 text-white hover:text-gray-200"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Toaster;