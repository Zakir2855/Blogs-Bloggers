import Cookies  from "js-cookie";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Private({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get("newlettertoken")) {
      navigate("/login"); 
    }
  }, [navigate,Cookies.get("newslettertoken")]);

  return <>{children}</>;
}

export default Private;
