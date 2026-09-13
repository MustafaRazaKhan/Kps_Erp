import { toast } from "react-toastify";
const showToastSuccess = (message: string) => {
  return (toast as any).success(message);
};
const showToastError = (message: string) => {
  return (toast as any).error(message);
};

export { showToastError, showToastSuccess };
