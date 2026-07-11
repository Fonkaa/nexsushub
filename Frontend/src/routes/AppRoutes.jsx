import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import TeamMembers from "../pages/TeamMembers";
import WorkRequests from "../pages/WorkRequests";
import Resources from "../pages/Resources";
import Statistics from "../pages/Statistics";

import { Register } from "../pages/Register.jsx";
import MainLayout from "../layouts/MainLayout";



function AppRoutes(){


return (

<BrowserRouter>


<Routes>


<Route
path="/"
element={<Login />}
/>
<Route
    path="/register"
    element={<Register />}
/>
<Route
path="/dashboard"
element={
<ProtectedRoute>
<MainLayout>
<Dashboard/>
</MainLayout>
</ProtectedRoute>
}
/>


<Route
path="/team-members"
element={
    <ProtectedRoute>
<MainLayout>
<TeamMembers/>
</MainLayout>
</ProtectedRoute>
}
/>


<Route
path="/requests"
element={
    <ProtectedRoute>
<MainLayout>
<WorkRequests/>
</MainLayout>
</ProtectedRoute>
}
/>


<Route
path="/resources"
element={
    <ProtectedRoute>
<MainLayout>
<Resources/>
</MainLayout>
</ProtectedRoute>
}
/>


<Route
path="/statistics"
element={
    <ProtectedRoute>
<MainLayout>
<Statistics/>
</MainLayout>
</ProtectedRoute>
}
/>


</Routes>


</BrowserRouter>

);


}


export default AppRoutes;