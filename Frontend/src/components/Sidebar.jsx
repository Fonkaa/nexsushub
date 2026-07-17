import { NavLink } from "react-router-dom";
import { useState } from "react";

import {
    FaHome,
    FaUsers,
    FaTasks,
    FaBoxes,
    FaChartBar,
    FaBars,
    FaTimes
} from "react-icons/fa";

function Sidebar() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [open, setOpen] = useState(false);

 const menuItems = [

{
name:"Dashboard",
path:"/dashboard",
icon:<FaHome/>,
roles:["admin","employee"]
},


{
name:"Home",
path:"/viewer",
icon:<FaHome/>,
roles:["viewer"]
},


{
name:"Team Members",
path:"/team-members",
icon:<FaUsers/>,
roles:["admin"]
},


{
name:"Work Requests",
path:"/requests",
icon:<FaTasks/>,
roles:["admin","employee","viewer"]
},


{
name:"Resources",
path:"/resources",
icon:<FaBoxes/>,
roles:["admin","employee","viewer"]
},


{
name:"Statistics",
path:"/statistics",
icon:<FaChartBar/>,
roles:["admin","employee","viewer"]
}

];

    return (

        <>

            {/* Mobile Top Bar */}

            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-gray-900 text-white flex items-center justify-between px-5 shadow-lg z-50">

                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">

                    NexusHub

                </h1>

                <button
                    onClick={() => setOpen(true)}
                    className="text-2xl"
                >

                    <FaBars />

                </button>

            </div>



            {/* Mobile Overlay */}

            {

                open &&

                <div

                    onClick={() => setOpen(false)}

                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"

                />

            }



            {/* Sidebar */}

            <aside

                className={`

                fixed
                top-0
                left-0
                h-screen
                w-72
                bg-gray-900
                text-white
                shadow-2xl
                z-50
                transition-transform
                duration-300

                ${open ? "translate-x-0" : "-translate-x-full"}

                lg:translate-x-0
               lg:fixed

                `}

            >

                {/* Mobile Close */}

                <div className="lg:hidden flex justify-end p-5">

                    <button
                        onClick={() => setOpen(false)}
                        className="text-2xl"
                    >

                        <FaTimes />

                    </button>

                </div>



                {/* Logo */}

                <div className="p-6 border-b border-gray-700">

                    <h1

                        className="

                        text-3xl
                        font-bold
                        bg-gradient-to-r
                        from-blue-400
                        to-purple-500
                        bg-clip-text
                        text-transparent

                        "

                    >

                        NexusHub

                    </h1>

                    <p className="text-gray-400 text-sm mt-2">

                        Smart Operations Portal

                    </p>

                </div>



                {/* Navigation */}

                <nav className="p-5">

                    {

                        menuItems

                          .filter(item =>
item.roles.includes(user?.role)
)

                            .map(item => (

                                <NavLink

                                    key={item.path}

                                    to={item.path}

                                    onClick={() => setOpen(false)}

                                    className={({ isActive }) => `

                                    flex
                                    items-center
                                    gap-4
                                    px-5
                                    py-3
                                    mb-3
                                    rounded-xl
                                    transition-all
                                    duration-300

                                    ${

                                        isActive

                                            ?

                                            "bg-blue-600 text-white shadow-lg scale-105"

                                            :

                                            "hover:bg-gray-700 text-gray-300"

                                    }

                                    `}

                                >

                                    <span className="text-xl">

                                        {item.icon}

                                    </span>

                                    <span className="font-semibold">

                                        {item.name}

                                    </span>

                                </NavLink>

                            ))

                    }

                </nav>



                {/* Footer */}

                <div

className="
absolute
bottom-5
left-5
right-5
bg-gray-800
rounded-2xl
p-4
"

>


<p className="
text-gray-400
text-xs
">

Logged in as

</p>



<h3 className="
text-white
font-bold
mt-1
">

{user?.name}

</h3>



<p className="
text-blue-400
text-sm
capitalize
">

{user?.role}

</p>


</div>
            </aside>

        </>

    );

}

export default Sidebar;