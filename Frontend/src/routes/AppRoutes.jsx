import { BrowserRouter, Routes, Route } from "react-router-dom";

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

import Login from "../pages/Login";
import Profile from "../pages/Profile";


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

path="/dashboard"

element={

<ProtectedRoute>

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

<ProtectedRoute role="admin">

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