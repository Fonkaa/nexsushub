import Viewer from "../pages/Viewer";
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