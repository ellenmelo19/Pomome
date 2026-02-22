import { toast } from "react-toastify";
import type { ToastOptions } from "react-toastify"; // Importação type-only
import { Dialog } from "../components/Dialog";

export const showMessage = {
    success: (msg: string) => toast.success(msg),
    warning: (msg: string) => toast.warning(msg),
    error: (msg: string) => toast.error(msg),
    warn: (msg: string) => toast.warn(msg),
    info: (msg: string) => toast.info(msg),
    dismiss: () => toast.dismiss(),
    confirm: (data: string, onClosing: (confirmation: boolean) => void) => {
       
        const options: ToastOptions<string> = {
            data: data,
            onClose: (reason?: string | boolean) => {
                
                if (typeof reason === 'boolean') {
                    onClosing(reason);
                } 
                
                else if (reason === 'confirm') {
                    onClosing(true);
                }
                
                else {
                    onClosing(false);
                }
            },
            autoClose: false,
            closeOnClick: false,
            closeButton: false,
            draggable: false,
        };
        
        toast<string>(Dialog, options);
    }
};