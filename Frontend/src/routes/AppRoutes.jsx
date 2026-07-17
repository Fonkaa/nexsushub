import { BrowserRouter, Routes, Route } from "react-router-dom";
import Unauthorized from "../pages/Unauthorized";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import TeamMembers from "../pages/TeamMembers";
import WorkRequests from "../pages/WorkRequests";
import Resources from "../pages/Resources";
import Statistics from "../pages/Statistics";
import SearchResults from "../pages/SearchResults";
import HomePage from "../pages/HomePage";
import { Register } from "../pages/Register.jsx";
import MainLayout from "../layouts/MainLayout";
import Viewer from "../pages/Viewer";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import ResetPassword from "../pages/ResetPassword";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyOTP from "../pages/VerifyOTP";
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