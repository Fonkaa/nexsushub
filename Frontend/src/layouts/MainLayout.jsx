import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout({ children }) {

    return (

        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden lg:ml-72">

                {/* Desktop Navbar */}
                <Navbar />

                {/* Page Content */}
                <main
                    className="
                    flex-1
                    overflow-y-auto
                    p-4
                    md:p-6
                    mt-16
                    lg:mt-0
                    "
                >

                    {children}

                </main>

            </div>

        </div>

    );

}

export default MainLayout;