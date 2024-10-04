import React, { useRef } from "react";
import { Button, styled, TextField } from "@mui/material";
import axios from "axios";

const StyledDiv = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),

  "& .MuiTextField-root": {
    margin: theme.spacing(1),
    width: "25vw",
  },
  "& .MuiButtonBase-root": {
    margin: theme.spacing(2),
  },
}));

const LoginForm = ({ setLoginModalVisibility }) => {
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handleFormClose = () => {
    setLoginModalVisibility(false);
  };

  const handleSubmit = async (e) => {
    // add logic to call login API
    e.preventDefault();
    // console.log(firstName, lastName, email, password);
    // console.log(`login-form email input = ${emailInputRef.current.value}`);
    // console.log(`login-form password input = ${passwordInputRef.current.value}`);
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
      // console.log(
      //   `login-form local storage-email = ${localStorage.getItem(
      //     "loggedInUserEmail"
      //   )}`
      // );
    } catch (error) {
      console.log(`login-form error = ${error}`);
    }
    handleFormClose();
  };

  return (
    <StyledDiv>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="filled"
          type="email"
          required
          ref={emailInputRef}
          onChange={(e) => (emailInputRef.current.value = e.target.value)}
        />
        <TextField
          label="Password"
          variant="filled"
          type="password"
          required
          ref={passwordInputRef}
          onChange={(e) => (passwordInputRef.current.value = e.target.value)}
        />
        <div>
          <Button variant="contained" onClick={handleFormClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </div>
      </form>
    </StyledDiv>
  );
};

export default LoginForm;
