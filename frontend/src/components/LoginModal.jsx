import { Dialog } from "@mui/material";
import React, { useState } from "react";
import LoginForm from "./LoginForm";

const LoginModal = ({ loginModalVisibility, setLoginModalVisibility }) => {
  // const [loginModalOpen, setLoginModalOpen] = useState(false);
  // console.log(`LoginModal visibility = ${loginModalVisibility}`);

  const handleDiaglogClose = () => {
    setLoginModalVisibility(false);
  };
  return (
    <div>
      <Dialog open={loginModalVisibility} onClose={handleDiaglogClose}>
        <LoginForm setLoginModalVisibility={setLoginModalVisibility} />
      </Dialog>
    </div>
  );
};

export default LoginModal;
