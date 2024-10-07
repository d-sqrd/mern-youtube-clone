import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleLoginModal = () => {
    setIsLoginModalVisible(!isLoginModalVisible);
  };

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        isLoginModalVisible,
        toggleLoginModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
