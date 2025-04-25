import { useEffect, useState } from "react";

import { useAppDispatch } from "@/store/hooks";
import { loadCurrentUser } from "@/store/slices/user.slice";
import { LOCAL_STORAGE_TOKEN } from "../../api";
import DefaultLoading from "./loader";

/**
 *
 * @param children
 *
 */

interface PagesWrapperProps {
  children: React.ReactNode;
}

const PagesWrapper: React.FC<PagesWrapperProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);

        if (token) {
          await dispatch(loadCurrentUser()).unwrap();
        }
      }
    };

    init().finally(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading) {
    return <DefaultLoading />;
  }

  return <>{children}</>;
};

export default PagesWrapper;
