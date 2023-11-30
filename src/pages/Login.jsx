// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Typography,
  FormHelperText,
  Grid,
} from "@mui/material";
import { loginUser, selectError } from "../redux/authSlice";
import {
  Font,
  container,
  form,
  loginBox,
  submit,
  circle,
  welcome,
} from "./styles";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "mor_2314",
    password: "83r5^_",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const error = useSelector(selectError);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }else if (formData.username.trim().length < 6) {
      newErrors.username = "Username must be at least 6 characters";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }else if (formData.password.trim().length < 6) {
  newErrors.password = "Password must be at least 6 characters";
} else if (
  !/(?=.*[a-z])(?=.*\d)/.test(formData.password.trim())
) {
  newErrors.password =
    "Password must contain at least one uppercase letter, one lowercase letter, and one number";
}

    if (Object.keys(newErrors).length === 0) {
      dispatch(loginUser(formData));
        // .then(() => {
        //   navigate("/");
        // })
        // .catch((error) => {
        //   // Handle error
        // });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Grid container style={container} justifyContent={"center"}>
      <Grid item md={6} display={{ xs: "none", md: "flex" }} style={circle}>
        <Typography
          right={{ md: "4%", lg: "5%", xl: "8%" }}
          fontSize={{ md: "12px", lg: "1rem" }}
          style={welcome}
        >
          Welcome
        </Typography>
      </Grid>

      <Grid item xs={12} md={6} style={loginBox}>
        <Typography component="h1" variant="h5" style={Font}>
          Login to your account
        </Typography>
        <form style={form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            id="username"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            required
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button type="submit" fullWidth variant="contained" style={submit}>
            Login
          </Button>
        </form>
        <FormHelperText>{error}</FormHelperText>
      </Grid>
    </Grid>
  );
};

export default Login;
