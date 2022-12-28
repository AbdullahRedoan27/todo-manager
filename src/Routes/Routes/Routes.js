import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main/Main";
import AddTask from "../../Pages/AddTask/AddTask";
import CompletedTask from "../../Pages/CompletedTasks/CompletedTask";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import MyTasks from "../../Pages/MyTasks/MyTasks";
import Register from "../../Pages/Register/Register";

const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/register',
                element:<Register></Register>
            },
            {
                path:'/addtask',
                element:<AddTask></AddTask>
            },
            {
                path:'/mytasks',
                element:<MyTasks></MyTasks>
            },
            {
                path:'/completed',
                element:<CompletedTask></CompletedTask>
            }
        ]
    }
]);

export default router;