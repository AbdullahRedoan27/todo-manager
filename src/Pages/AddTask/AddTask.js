import {
  Button,
  IconButton,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";

const AddTask = () => {
  const { user } = useContext(AuthContext);
  const [text, setText] = React.useState("");
  const { register, handleSubmit, reset } = useForm();
  return (
    <div>
      <h2 className="text-center text-2xl">Let's add a task.</h2>
      <form
        className="mx-auto flex flex-col w-5/12 mt-5 gap-4"
        onSubmit={handleSubmit()}
      >
        <TextField
          {...register("taskname")}
          id="outlined-text-input"
          label="Task Name"
          type="text"
        />
        <TextareaAutosize
          {...register("description")}
          placeholder="Task description"
          className="border border-gray-400 rounded"
          minRows={2}
          maxRows={4}
          sx={{ minWidth: 300 }}
          endDecorator={
            <Typography level="body3" sx={{ ml: "auto" }}>
              {text.length} character(s)
            </Typography>
          }
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
        {!user && (
          <small>
           Please Log In To Add A Task.{" "}
            <Link to="/login" className="underline">
              Log In
            </Link>
          </small>
        )}
        <div className="flex justify-center">
        <Button variant="outlined" disabled={!user}>
        Add Task
      </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
