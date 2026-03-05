import { toast } from 'sonner';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastOptions {
  duration?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

export const toastManager = {
  success: (message: string, options?: ToastOptions) => {
    toast.success(message, {
      duration: options?.duration || 3000,
      position: (options?.position as any) || 'top-right',
    });
  },

  error: (message: string, options?: ToastOptions) => {
    toast.error(message, {
      duration: options?.duration || 4000,
      position: (options?.position as any) || 'top-right',
    });
  },

  info: (message: string, options?: ToastOptions) => {
    toast.info(message, {
      duration: options?.duration || 3000,
      position: (options?.position as any) || 'top-right',
    });
  },

  warning: (message: string, options?: ToastOptions) => {
    toast.warning(message, {
      duration: options?.duration || 3500,
      position: (options?.position as any) || 'top-right',
    });
  },

  loading: (message: string) => {
    return toast.loading(message);
  },

  dismiss: (toastId?: string | number) => {
    if (toastId) toast.dismiss(toastId);
    else toast.dismiss();
  },
};
