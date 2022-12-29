import {
  Button,
  IconButton,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { format } from "date-fns";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { toast } from "react-hot-toast";

const AddTask = () => {
  const { user } = useContext(AuthContext);
  const [text, setText] = React.useState("");
  const { register, handleSubmit, reset } = useForm();
  const [value, setValue] = useState();

  const handleChange = (newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  const handleAddTask = (data) => {
    console.log(data);
    const taskname = data.taskname;
    const description = data.description;
    const email = user?.email;
    const rawDate = new Date();
    const date = format(rawDate, "PPpp");
    const rawDeadline = value;
    const deadline = format(rawDeadline, "PPpp");

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
      .then(data => {
        console.log(data);
        const imgURL = data.data.url;
        const task = {
            taskName: taskname,
            description,
            email,
            imgURL,
            date,
            deadline,
          };

        fetch('http://localhost:5000/addtask', {
            method: 'POST',
            headers:{
                "content-type" : "application/json"
            },
            body: JSON.stringify(task)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.insertedId){
                toast.success("Task Added Successfully")
            }
        })
        .catch(err => console.error(err))
      })
  };
  return (
    <div>
      <h2 className="text-center text-2xl">Let's add a task.</h2>
      <form
        className="mx-auto flex flex-col w-5/12 mt-5 gap-4"
        onSubmit={handleSubmit(handleAddTask)}
      >
        <TextField
          {...register("taskname")}
          required
          id="outlined-text-input"
          label="Task Name"
          type="text"
        />
        <TextareaAutosize
          {...register("description")}
          required
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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            {...register("deadline")}
            required
            label="Date&Time picker"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
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
          <input type="submit" className="border border-gray-300 rounded px-3 py-1 bg-blue-600 text-white"></input>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
