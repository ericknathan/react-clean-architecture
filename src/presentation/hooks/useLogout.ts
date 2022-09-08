import { useNavigate } from "react-router-dom";
import { useApiContext } from "@/presentation/hooks";

type ResultType = () => void;

export const useLogout = (): ResultType => {
  const navigate = useNavigate();
  const { setCurrentAccount } = useApiContext();

  return (): void => {
    setCurrentAccount(null);
    navigate('/signin', { replace: true });
  };
};
