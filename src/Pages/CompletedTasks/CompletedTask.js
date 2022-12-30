import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import CompletedTaskCard from './CompletedTaskCard';

const CompletedTask = () => {
    const {user} = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    useEffect(()=>{
        axios.get(`https://todo-manager-server.vercel.app/completedTask?email=${user?.email}`)
        .then(function(res){
            console.log(res.data);
            setTasks(res.data)
        })
    },[user])
    return (
        <div className='grid lg:grid-cols-3 w-11/12 mx-auto mt-10'>
            {
                tasks?.map((task, i) => <CompletedTaskCard key={i}
                    task={task}
                ></CompletedTaskCard>)
            }
        </div>
    );
};

export default CompletedTask;