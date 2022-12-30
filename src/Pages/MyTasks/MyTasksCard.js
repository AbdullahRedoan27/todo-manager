import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios, { Axios } from "axios";
import { toast } from "react-hot-toast";
import { async } from "@firebase/util";

export default function MyTasksCard({ task }) {
  const [completedTask, setCompletedTask] = React.useState();

  const handelDelete = (id) => {
    axios
      .delete(`http://localhost:5000/delete?id=${id}`)
      .then(function (res) {
        console.log(res);
        if (res.deletedCount > 0) {
          toast.success("Successfully Moved The Task To Completed Tasks");
        }
      })
      .catch((err) => console.error(err));
  };

  const handleCompleted = async(id) => {
    fetch(`http://localhost:5000/completed?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if(data?.deletedCount > 0){
            toast.success("The task have been successfully moved to completed tasks.")
        }
      });
  };
  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: 3,
        border: 1,
        borderColor: "grey.500",
        borderRadius: "15px",
      }}
    >
      <CardMedia
        component="img"
        alt="task image"
        height="140"
        image={task?.imgURL}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {task?.taskName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {task?.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Added on:</b> {task?.date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Deadline:</b> {task?.deadline}
        </Typography>
      </CardContent>
      <CardActions className="flex justify-center">
        <Button
          variant="outlined"
          onClick={() => handleCompleted(task?._id)}
          size="small"
        >
          Completed
        </Button>
        <Button variant="outlined" color="warning" size="small">
          Edit
        </Button>
        <Button
          variant="outlined"
          onClick={() => handelDelete(task._id)}
          color="error"
          size="small"
        >
          Delete Task
        </Button>
      </CardActions>
    </Card>
  );
}
