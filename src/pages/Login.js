import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux"
import {authActions} from "../redux/store";

const Login = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const [Inputs, setInputs] = useState({
      name: "",
      email: "",
      password: "",
    });
    const handleChange = (e) => {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post("/api/v1/user/login", {
          username: Inputs.name,
          email: Inputs.email,
          password: Inputs.password,
        });
        if (data.success) {
          dispatch(authActions.login());
          alert("User Login Successfully");
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          margin="auto"
          marginTop={5}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          borderRadius={5}
        >
          <Typography variant="h4" padding={3} textAlign="center">
            Login
          </Typography>
          <TextField
            placeholder="email"
            value={Inputs.email}
            onChange={handleChange}
            name="email"
            margin="normal"
            type={"email"}
            required
          />
          <TextField
            placeholder="password"
            value={Inputs.password}
            onChange={handleChange}
            name="password"
            margin="normal"
            type={"password"}
            required
          />
          <Button
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/register")}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Not A User? Please Register
          </Button>
        </Box>
      </form>
    );
}

export default Login
