import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import MyTasksCard from './MyTasksCard';

const MyTasks = () => {
    const {user} = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    useEffect(()=> {
        fetch(`http://localhost:5000/mytasks?email=${user?.email}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setTasks(data)
        })
    },[user?.email])
    return (
        <div className='grid lg:grid-cols-3 w-11/12 mx-auto mt-10'>
            {
                tasks?.map((task, i) => <MyTasksCard key={i}
                    task={task}
                ></MyTasksCard>)
            }
        </div>
    );
};

export default MyTasks;