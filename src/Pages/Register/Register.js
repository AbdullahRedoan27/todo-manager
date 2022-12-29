import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRegister = (data) => {
    const name = data.fullname;
    const email = data.email;
    const password = data.password;

    createUser(email, password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        toast.success("Successfully Registered");
        reset();
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message);
      });

    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const imgbbKey = process.env.REACT_APP_imgbb_Key;
    console.log(imgbbKey);
    const url = `https://api.imgbb.com/1/upload?key=${imgbbKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const image = data.data.url;
          console.log(data);
          const profile = {
            displayName: name,
            photoURL: image,
          };

          updateUserProfile(profile)
            .then(() => {})
            .catch((err) => console.error(err));
        }
      });
  };

  return (
    <form
      className="mx-auto flex flex-col w-5/12 mt-14 gap-4"
      onSubmit={handleSubmit(handleRegister)}
    >
      <TextField
        {...register("fullname")}
        id="outlined-text-input"
        label="Full Name"
        type="text"
      />
      <TextField
        {...register("email")}
        id="outlined-text-input"
        label="Email"
        type="email"
      />
      <Button variant="contained" component="label">
        Upload image
        <input
          {...register("image")}
          hidden
          accept="image/*"
          multiple
          type="file"
        />
      </Button>
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
      <small>Already have an account? <Link to="/login" className="underline">Log In</Link></small>
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

export default Register;
