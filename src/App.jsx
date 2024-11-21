import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Tasks from "./Components/Tasks/Tasks";
import Services from "./Components/Services/Services";
import TaskOrders from "./Components/Tasks/TaskOrders";
import ServiceOrders from "./Components/Services/ServiceOrders";
import CreateTask from "./Components/Tasks/CreateTask";
import CreateService from "./Components/Services/CreateService";
import Login from "./Components/User/Login";
import Signup from "./Components/User/Signup";
import UpdateProfile from "./Components/User/UpdateProfile";
import MyServices from "./Components/Services/MyServices";
import MyTasks from "./Components/Tasks/MyTasks";
import TaskReviews from "./Components/Tasks/TaskReviews";
import ReceiveBids from "./Components/Tasks/ReceiveBids";
import ServiceLandingPage from "./Components/Services/ServiceLandingPage";
import VerificationDialog from "./Components/User/verificaation";
import Home from "./Components/Home";
import Admin from "./Components/Admin/Admin";
import ComplainDialog from './Components/User/ComplainDialog';
import ComplainsList from "./Components/User/ComplainsList";
import DeleteAccount from "./Components/User/DeleteAccount";
import UpdateService from "./Components/Services/UpdateService";
import Chat from "./Components/Chat/Chat";

import { useState } from "react";

function App() {
  const location = useLocation(); // Use useLocation to get the current path

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); 
  const [complainsSent, setComplainsSent] = useState([]);
  

  return (
    <>
      {/* Conditionally render Navbar only if not on the /admin route */}
      {location.pathname !== '/admin' && <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  />}

      {/* Routes for different pages */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />

        {/* Routes previously protected */}
        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/create-service" element={<CreateService />} />
        <Route path="/task-orders" element={<TaskOrders />} />
        <Route path="/service-orders" element={<ServiceOrders />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/verify-account" element={<VerificationDialog />} />
        <Route path="/complain" element={<><ComplainDialog setComplainsSent={setComplainsSent} /><ComplainsList complainsSent={complainsSent} /></>} />
        <Route path="/delete-account" element={<DeleteAccount />} />

        {/* Conditional Routes based on User Role */}
        <Route path="/my-services" element={<MyServices />} />
        <Route path="/my-tasks" element={<MyTasks />} />
        <Route path="/task-reviews" element={<TaskReviews />} />
        <Route path="/receive-bids" element={<ReceiveBids />} />
        <Route path="/service/:id" element={<ServiceLandingPage />} />
        <Route path="/update-service/:id" element={<UpdateService />} />
        <Route path="/chat" element={<Chat />} />

        {/* Routes for Admin */}
        <Route path="/admin" element={<Admin />} />

        {/* Fallback Route for undefined paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

const NotFound = () => {
  return <h2>404 - Page Not Found</h2>;
};

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
