import React, { useContext, useRef, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const LoginForm = () => {
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const { isLoginModalVisible, toggleLoginModal } = useContext(AppContext);
  const [isUserRegistration, setIsUserRegistration] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let options = {};
      if (isUserRegistration) {
        options = {
          method: "POST",
          url: "http://localhost:5000/api/v1/auth/register",
          data: {
            name: nameInputRef.current.value,
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
          },
        };
      } else {
        options = {
          method: "POST",
          url: "http://localhost:5000/api/v1/auth/login",
          data: {
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
          },
        };
      }
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
              {isUserRegistration && (
                <TextField
                  label="Name"
                  variant="filled"
                  type="text"
                  required
                  // color="#0f0f0f"
                  ref={nameInputRef}
                  onChange={(e) =>
                    (nameInputRef.current.value = e.target.value)
                  }
                  sx={{
                    marginBottom: 2,
                    backgroundColor: "#fff",
                    border: "0",
                    borderRadius: "10px",
                  }}
                />
              )}
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
                {!isUserRegistration && (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      border: "1px solid #fff",
                      borderRadius: "100px",
                      backgroundColor: "#000",
                    }}
                    // onClick={handleLogin}
                  >
                    Login
                  </Button>
                )}
                {isUserRegistration && (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      border: "1px solid #fff",
                      borderRadius: "100px",
                      backgroundColor: "#000",
                    }}
                    // onClick={handleRegister}
                  >
                    Register
                  </Button>
                )}
              </Box>
              <Box sx={{ textAlign: "center" }}>
                {isUserRegistration && (
                  <Typography>
                    Existing User?{" "}
                    <a
                      href="#"
                      onClick={() => setIsUserRegistration(false)}
                      style={{ color: "white" }}
                    >
                      Login Here
                    </a>
                  </Typography>
                )}
                {!isUserRegistration && (
                  <Typography>
                    New User?{" "}
                    <a
                      href="#"
                      onClick={() => setIsUserRegistration(true)}
                      style={{ color: "white" }}
                    >
                      Register Here
                    </a>
                  </Typography>
                )}
              </Box>
            </Box>
          </form>
        </Box>
      )}
    </>
  );
};

export default LoginForm;
