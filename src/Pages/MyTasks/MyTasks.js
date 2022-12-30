import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import MyTasksCard from "./MyTasksCard";

const MyTasks = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [reFetch, setReFetch] = React.useState();

  useEffect(() => {
    fetch(`https://todo-manager-server.vercel.app/mytasks?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTasks(data);
      });
  }, [user, reFetch]);
  return (
    <div className="grid lg:grid-cols-3 w-11/12 mx-auto mt-10">
      {tasks?.map((task, i) => (
        <MyTasksCard key={i} task={task} setReFetch={()=>setReFetch()}></MyTasksCard>
      ))}
    </div>
  );
};

export default MyTasks;
