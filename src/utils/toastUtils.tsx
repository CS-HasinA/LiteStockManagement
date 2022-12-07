import { toast, ToastOptions } from "react-toastify";

const toastStyles: ToastOptions = {
  className: "mt-3 ml-3 mr-3",
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

function notifySuccess(message: string) {
  toast.success(message, toastStyles);
}

function notifyFailure(message: string) {
  toast.error(message, toastStyles);
}

export { notifySuccess, notifyFailure };
