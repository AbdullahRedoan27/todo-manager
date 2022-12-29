import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastBar } from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";

const Login = () => {
  const {LogIn, googleLogIn} = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogIn = (data) => {
    const email = data.email;
    const password = data.password;
    LogIn(email, password)
    .then(data => {
        console.log(data);
        toast.success("Successfully Logged In")
    })
    .catch(error => {
        console.error(error)
        toast.error(error.message)
    })
  }

  return (
    <form
      className="mx-auto flex flex-col w-5/12 mt-14 gap-4"
      onSubmit={handleSubmit(handleLogIn)}
    >
      <TextField
        {...register("email")}
        id="outlined-text-input"
        label="Email"
        type="email"
      />
      <FormControl sx={{ width: "full" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          {...register("password")}
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <small>
        Don't have an account?{" "}
        <Link to="/login" className="underline">
          Register
        </Link>
      </small>
      <div className="flex justify-center">
        <input
          variant="outlined"
          className="border border-gray-300 rounded p-2 w-24 hover:bg-gray-200"
          type="submit"
        />
      </div>
    </form>
  );
};

export default Login;
