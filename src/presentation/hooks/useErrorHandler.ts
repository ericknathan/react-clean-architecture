import { useNavigate } from "react-router-dom";
import { useApiContext } from "@/presentation/hooks";
import { AccessDeniedError } from "@/domain/errors";

type CallbackType = (error: Error) => void;
type ResultType = CallbackType;

export const useErrorHandler = (callback: CallbackType): ResultType => {
  const navigate = useNavigate();
  const { setCurrentAccount } = useApiContext();
  return (error: Error): void => {
    if(error instanceof AccessDeniedError) {
      setCurrentAccount(null);
      navigate('/signin', { replace: true });
    } else {
      callback(error);
    }
  };
};
