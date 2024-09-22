import { Dialog } from "@mui/material";
import React, { useState } from "react";
import LoginForm from "./LoginForm";

const LoginModal = ({ loginModalVisibility }) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  return (
    <div>
      <Dialog open={loginModalVisibility}>
        <LoginForm />
      </Dialog>
    </div>
  );
};

export default LoginModal;
