import { Dialog } from "@mui/material";
import React, { useContext } from "react";
import LoginForm from "./LoginForm";
import { AppContext } from "../context/AppContext";

const LoginModal = () => {
  const { toggleLoginModal, isLoginModalVisible } = useContext(AppContext);
  return (
    <div>
      <Dialog open={isLoginModalVisible} onClose={toggleLoginModal}>
        <LoginForm />
      </Dialog>
    </div>
  );
};

export default LoginModal;
