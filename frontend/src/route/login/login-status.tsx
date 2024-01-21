import React, { useEffect, useState } from "react";
import { useCheckLogin } from "./login-api";

export const LoginStatus: React.FC = () => {
  const [message, setMessate] = useState<string>();

  const checkLoginQuery = useCheckLogin();

  useEffect(() => {
    if (checkLoginQuery.data?.data) {
      setMessate(checkLoginQuery.data?.data);
    }
  }, [checkLoginQuery.data?.data]);

  return <div className="bg-blue-500">{message}</div>;
};
