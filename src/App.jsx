import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import MyTasks from "./Components//Tasks/MyTasks";
import TaskReviews from "./Components/Tasks/TaskReviews";
import ReceiveBids from "./Components/Tasks/ReceiveBids";
import ServiceLandingPage from "./Components/Services/ServiceLandingPage";
import VerificationDialog from "./Components/User/verificaation";
import Home from "./Components/Home";
// import Chat from "./Components/Chat/Chat";

// Protected Route component for authenticated users
const ProtectedRoute = ({ children }) => {

  const isAuthenticated = true;
  // const isAuthenticated = Boolean(localStorage.getItem("token"));
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <Router >
      {/* Navbar will be visible on all routes */}
      <Navbar />

      {/* Routes for different pages */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home  />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected Routes (for logged-in users only) */}
        <Route path="/create-task" element={<ProtectedRoute><CreateTask /></ProtectedRoute>} />
        <Route path="/create-service" element={<ProtectedRoute><CreateService /></ProtectedRoute>} />
        <Route path="/task-orders" element={<ProtectedRoute><TaskOrders /></ProtectedRoute>} />
        <Route path="/service-orders" element={<ProtectedRoute><ServiceOrders /></ProtectedRoute>} />
        <Route path="/update-profile" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
        <Route path="/verify-account" element={<ProtectedRoute><VerificationDialog /></ProtectedRoute>} />
        
        {/* Conditional Routes based on User Role */}
        <Route path="/my-services" element={<ProtectedRoute><MyServices /></ProtectedRoute>} />
        <Route path="/my-tasks" element={<ProtectedRoute><MyTasks /></ProtectedRoute>} />
        <Route path="/task-reviews" element={<ProtectedRoute><TaskReviews /></ProtectedRoute>} />
        <Route path="/receive-bids" element={<ProtectedRoute><ReceiveBids /></ProtectedRoute>} />
        <Route path="/service/:id" element={<ProtectedRoute><ServiceLandingPage /></ProtectedRoute>} />
        {/* <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} /> */}


        {/* Fallback Route for undefined paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

// Home component (for when no specific path is matched)
// const Home = () => {
//   return (
//     <div >
//       <h1>Welcome to MyPlatform</h1>
//       <p>Outsource your tasks or offer services here!</p>
//     </div>
//   );
// };

// Not Found component for undefined routes
const NotFound = () => {
  return <h2>404 - Page Not Found</h2>;
};

export default App;
