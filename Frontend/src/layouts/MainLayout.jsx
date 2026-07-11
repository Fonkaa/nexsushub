import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";


function MainLayout({children}) {


    return (

        <div className="flex h-screen bg-gray-100">


            {/* Sidebar */}

            <aside className="w-64 hidden md:block">

                <Sidebar />

            </aside>





            {/* Main Area */}

            <div className="flex-1 flex flex-col overflow-hidden">



                {/* Navbar */}

                <Navbar />





                {/* Page Content */}

                <main className="flex-1 overflow-y-auto p-6">


                    {children}


                </main>



            </div>


        </div>

    );


}


export default MainLayout;