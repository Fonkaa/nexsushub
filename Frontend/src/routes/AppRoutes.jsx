import { BrowserRouter, Routes, Route } from "react-router-dom";

import Unauthorized from "../pages/Unauthorized.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

import Dashboard from "../pages/Dashboard.jsx";
import TeamMembers from "../pages/TeamMembers.jsx";
import WorkRequests from "../pages/WorkRequests.jsx";
import Resources from "../pages/Resources.jsx";
import Statistics from "../pages/Statistics.jsx";
import SearchResults from "../pages/SearchResults.jsx";
import HomePage from "../pages/HomePage.jsx";

import Register from "../pages/Register.jsx";

import MainLayout from "../layouts/MainLayout.jsx";

import Viewer from "../pages/Viewer.jsx";
import Login from "../pages/Login.jsx";
import Profile from "../pages/Profile.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import VerifyOTP from "../pages/VerifyOTP.jsx";
function AppRoutes(){


return (

<BrowserRouter>

<Routes>



{/* PUBLIC ROUTES */}

<Route
path="/"
element={<HomePage/>}
/>

<Route
path="/login"
element={<Login/>}
/>

<Route
path="/register"
element={<Register/>}
/>

{/* DASHBOARD */}
<Route

path="/unauthorized"

element={<Unauthorized/>}

/>
<Route
path="/forgot-password"
element={<ForgotPassword/>}
/>
<Route 
path="/reset-password" 
element={<ResetPassword />} 
/>
<Route
path="/verify-otp"
element={<VerifyOTP/>}
/>
<Route

path="/viewer"

element={

<ProtectedRoute
allowedRoles={[
"viewer"
]}
>
<MainLayout>

<Viewer/>

</MainLayout>

</ProtectedRoute>

}

/>
<Route

path="/dashboard"

element={

<ProtectedRoute
allowedRoles={[
"admin",
"employee"
]}
>

<MainLayout>

<Dashboard/>

</MainLayout>

</ProtectedRoute>

}

/>






{/* SEARCH */}


<Route

path="/search"

element={

<ProtectedRoute>

<MainLayout>

<SearchResults/>

</MainLayout>

</ProtectedRoute>

}

/>






{/* PROFILE */}


<Route

path="/profile"

element={

<ProtectedRoute>

<MainLayout>

<Profile/>

</MainLayout>

</ProtectedRoute>

}

/>







{/* TEAM MEMBERS ADMIN ONLY */}


<Route

path="/team-members"

element={
<ProtectedRoute
allowedRoles={[
"admin"
]}
>

<MainLayout>

<TeamMembers/>

</MainLayout>

</ProtectedRoute>

}

/>







{/* WORK REQUESTS */}


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







{/* RESOURCES */}


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







{/* STATISTICS */}


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