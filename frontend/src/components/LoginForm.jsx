import React, { useContext, useRef } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const LoginForm = () => {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const { isLoginModalVisible, toggleLoginModal } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "POST",
        url: "http://localhost:5000/api/v1/auth/login",
        data: {
          email: emailInputRef.current.value,
          password: passwordInputRef.current.value,
        },
      };
      const response = await axios.request(options);
      console.log(`login-form response = ${response}`);
      // if login was successful
      if (response.status === 200) {
        console.log(`login-form response success`);
        localStorage.setItem("loggedInUserEmail", emailInputRef.current.value);
        localStorage.setItem("loginAuthToken", response.data.authToken);
      }
    } catch (error) {
      // add UI to handle error
      console.log(`login-form error = ${error}`);
    }
    toggleLoginModal();
  };

  return (
    <>
      {isLoginModalVisible && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            padding: 2,
            backgroundColor: "var(--background-color)",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                color: "#fff",
              }}
            >
              <TextField
                label="Email"
                variant="filled"
                type="email"
                required
                // color="#0f0f0f"
                ref={emailInputRef}
                onChange={(e) => (emailInputRef.current.value = e.target.value)}
                sx={{
                  marginBottom: 2,
                  backgroundColor: "#fff",
                  border: "0",
                  borderRadius: "10px",
                }}
              />
              <TextField
                label="Password"
                variant="filled"
                type="password"
                required
                ref={passwordInputRef}
                onChange={(e) =>
                  (passwordInputRef.current.value = e.target.value)
                }
                sx={{
                  marginBottom: 2,
                  backgroundColor: "#fff",
                  border: "0",
                  borderRadius: "10px",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginBottom: 2,
                }}
              >
                <Button
                  variant="contained"
                  onClick={toggleLoginModal}
                  sx={{
                    border: "1px solid #fff",
                    borderRadius: "100px",
                    backgroundColor: "#000",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    border: "1px solid #fff",
                    borderRadius: "100px",
                    backgroundColor: "#000",
                  }}
                >
                  Login
                </Button>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography>
                  New User?{" "}
                  <a
                    href="#"
                    onClick={() => toggleLoginModal()}
                    style={{ color: "white" }}
                  >
                    Register Here
                  </a>
                </Typography>
              </Box>
            </Box>
          </form>
        </Box>
      )}
    </>
  );
};

export default LoginForm;
