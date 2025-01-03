import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Dialog } from "@mui/material";

const Modal = ({ isOpen, onClose, children }) => {
  const { toggleLoginModal, isLoginModalVisible } = useContext(AppContext);
  if (!isOpen) return null;

  return (
    <div>
      <Dialog open={isLoginModalVisible} onClose={toggleLoginModal}>
        <div
          style={{
            background: "#fff",
            height: 150,
            width: 240,
            margin: "auto",
            padding: "2%",
            border: "2px solid #000",
            borderRadius: "10px",
            boxShadow: "2px solid black",
          }}
        >
          Modal
        </div>
      </Dialog>
    </div>
  );
};

export default Modal;
