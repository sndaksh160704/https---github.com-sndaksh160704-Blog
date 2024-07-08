import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
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
      const { data } = await axios.post("/api/v1/user/register", {
        username: Inputs.name,
        email: Inputs.email,
        password: Inputs.password,
      });
      if (data.success) {
        alert("User Registerd Successfully");
        navigate("/login");
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
          Register
        </Typography>
        <TextField
          placeholder="name"
          value={Inputs.name}
          onChange={handleChange}
          name="name"
          margin="normal"
          type={"text"}
          required
        />
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
          onClick={() => navigate("/login")}
          sx={{ borderRadius: 3, marginTop: 3 }}
        >
          Already Registered? Please Login
        </Button>
      </Box>
    </form>
  );
};

export default Register;
