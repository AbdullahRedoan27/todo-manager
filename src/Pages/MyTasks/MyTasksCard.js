import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios, { Axios } from 'axios';

export default function MyTasksCard({task}) {
    const [completedTask, setCompletedTask] = React.useState();
    const handleCompleted = (id) => {
        axios.get(`http://localhost:5000/task?id=${id}`)
        .then(function(response){
            console.log(response?.data);
            setCompletedTask(response?.data)
        })
        task = {
            completedTask
        }
        axios.post('http://localhost:5000/completed', {
            completedTask
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  return (
    <Card sx={{ maxWidth: 345, boxShadow:3, border:1, borderColor: 'grey.500', borderRadius: '15px' }}>
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
      <CardActions className='flex justify-center'>
        <Button variant='outlined' onClick={()=>handleCompleted(task?._id)} size="small">Completed</Button>
        <Button variant='outlined' color="warning" size="small">Edit</Button>
        <Button variant='outlined' color="error" size="small">Delete Task</Button>
      </CardActions>
    </Card>
  );
}