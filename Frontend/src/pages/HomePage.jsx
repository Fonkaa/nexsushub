import "aos/dist/aos.css";
import { Link } from "react-router-dom";

import {
FaUsers,
FaTasks,
FaBoxes,
FaBell,
FaChartLine,
FaSearch
} from "react-icons/fa";

import {
HiArrowRight
} from "react-icons/hi";

import {
MdSecurity
} from "react-icons/md";

import {
useEffect
} from "react";

import AOS from "aos";
import "aos/dist/aos.css";



function HomePage(){


useEffect(()=>{

AOS.init({

duration:1000,
once:true

});

},[]);




return(

<div className="min-h-screen bg-white">



{/* ================= NAVBAR ================= */}

<header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-lg shadow-sm z-50">

<div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">


<div>

<h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">

NexusHub

</h1>

<p className="text-gray-500 text-sm">

Smart Operations Management Portal

</p>

</div>





<nav className="hidden lg:flex items-center gap-8">

<a
href="#features"
className="hover:text-blue-600 transition"
>

Features

</a>

<a
href="#workflow"
className="hover:text-blue-600 transition"
>

Workflow

</a>

<a
href="#technology"
className="hover:text-blue-600 transition"
>

Technology

</a>

<a
href="#about"
className="hover:text-blue-600 transition"
>

About

</a>

</nav>





<div className="flex gap-4">

<Link

to="/login"

className="px-6 py-3 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 transition"

>

Login

</Link>





<Link

to="/register"

className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 transition"

>

Register

</Link>

</div>


</div>

</header>





{/* ================= HERO ================= */}

<section className="pt-40 pb-24 bg-gradient-to-br from-blue-50 via-white to-purple-100">


<div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-20 items-center">





<div data-aos="fade-right">


<span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold">

Enterprise Management Solution

</span>



<h1 className="text-6xl font-black mt-8 leading-tight text-gray-900">

Manage Your

<span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">

Organization

</span>

With Confidence

</h1>



<p className="text-xl text-gray-600 mt-8 leading-9">

NexusHub is an intelligent operations management platform that helps organizations streamline employee management, work requests, resources, notifications, and reporting through one centralized dashboard.

</p>





<div className="flex flex-wrap gap-5 mt-10">


<Link

to="/login"

className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition"

>

Get Started

<HiArrowRight/>

</Link>





<Link

to="/register"

className="border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 px-8 py-4 rounded-2xl text-lg font-semibold transition"

>

Create Account

</Link>


</div>






<div className="grid grid-cols-2 gap-6 mt-16">


<div className="bg-white rounded-2xl shadow-lg p-6">

<h2 className="text-4xl font-bold text-blue-600">

100%

</h2>

<p className="text-gray-500 mt-2">

Secure Authentication

</p>

</div>





<div className="bg-white rounded-2xl shadow-lg p-6">

<h2 className="text-4xl font-bold text-purple-600">

24/7

</h2>

<p className="text-gray-500 mt-2">

System Availability

</p>

</div>


</div>



</div>









{/* Right Side */}

<div

data-aos="fade-left"

className="grid grid-cols-2 gap-6"

>


<div className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-2 transition">


<FaUsers className="text-5xl text-blue-600"/>

<h2 className="text-2xl font-bold mt-6">

Team Management

</h2>

<p className="text-gray-500 mt-3">

Manage employees, departments, roles and organizational structure.

</p>

</div>





<div className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-2 transition mt-10">


<FaTasks className="text-5xl text-green-600"/>

<h2 className="text-2xl font-bold mt-6">

Work Requests

</h2>

<p className="text-gray-500 mt-3">

Track employee requests from creation to completion.

</p>

</div>





<div className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-2 transition">


<FaBoxes className="text-5xl text-orange-500"/>

<h2 className="text-2xl font-bold mt-6">

Resources

</h2>

<p className="text-gray-500 mt-3">

Manage company assets, inventory and office resources.

</p>

</div>





<div className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-2 transition mt-10">


<FaBell className="text-5xl text-red-500"/>

<h2 className="text-2xl font-bold mt-6">

Notifications

</h2>

<p className="text-gray-500 mt-3">

Receive real-time updates for every important activity.

</p>

</div>


</div>



</div>

</section>
{/* ================= FEATURES ================= */}

<section

id="features"

className="py-28 bg-gray-50"

>

<div className="max-w-7xl mx-auto px-8">

<div
className="text-center mb-20"
data-aos="fade-up"
>

<h2 className="text-5xl font-black text-gray-900">

Everything You Need

</h2>

<p className="text-xl text-gray-500 mt-5 max-w-3xl mx-auto">

NexusHub centralizes every important organizational operation
into one secure, modern, and easy-to-use platform.

</p>

</div>





<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">





{/* Card */}

<div
data-aos="zoom-in"
className="
bg-white
rounded-3xl
shadow-lg
p-8
hover:shadow-2xl
hover:-translate-y-3
transition-all
duration-300
"
>

<div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">

<FaUsers className="text-3xl text-blue-600"/>

</div>

<h3 className="text-2xl font-bold mt-6">

Team Management

</h3>

<p className="text-gray-500 mt-4 leading-8">

Create and manage employees, assign roles,
track departments and organize your workforce.

</p>

</div>









<div
data-aos="zoom-in"
data-aos-delay="100"
className="
bg-white
rounded-3xl
shadow-lg
p-8
hover:shadow-2xl
hover:-translate-y-3
transition-all
duration-300
"
>

<div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">

<FaTasks className="text-3xl text-green-600"/>

</div>

<h3 className="text-2xl font-bold mt-6">

Work Requests

</h3>

<p className="text-gray-500 mt-4 leading-8">

Employees can submit requests while administrators
review, assign and monitor progress.

</p>

</div>










<div
data-aos="zoom-in"
data-aos-delay="200"
className="
bg-white
rounded-3xl
shadow-lg
p-8
hover:shadow-2xl
hover:-translate-y-3
transition-all
duration-300
"
>

<div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center">

<FaBoxes className="text-3xl text-orange-500"/>

</div>

<h3 className="text-2xl font-bold mt-6">

Resource Management

</h3>

<p className="text-gray-500 mt-4 leading-8">

Manage company equipment,
inventory,
office assets and resource availability.

</p>

</div>










<div
data-aos="zoom-in"
className="
bg-white
rounded-3xl
shadow-lg
p-8
hover:shadow-2xl
hover:-translate-y-3
transition-all
duration-300
"
>

<div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center">

<FaBell className="text-3xl text-red-500"/>

</div>

<h3 className="text-2xl font-bold mt-6">

Notifications

</h3>

<p className="text-gray-500 mt-4 leading-8">

Receive instant notifications whenever requests,
assignments or status changes occur.

</p>

</div>









<div
data-aos="zoom-in"
data-aos-delay="100"
className="
bg-white
rounded-3xl
shadow-lg
p-8
hover:shadow-2xl
hover:-translate-y-3
transition-all
duration-300
"
>

<div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center">

<FaChartLine className="text-3xl text-purple-600"/>

</div>

<h3 className="text-2xl font-bold mt-6">

Dashboard Analytics

</h3>

<p className="text-gray-500 mt-4 leading-8">

Visualize organizational performance,
resources,
requests and operational statistics.

</p>

</div>










<div
data-aos="zoom-in"
data-aos-delay="200"
className="
bg-white
rounded-3xl
shadow-lg
p-8
hover:shadow-2xl
hover:-translate-y-3
transition-all
duration-300
"
>

<div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center">

<FaSearch className="text-3xl text-indigo-600"/>

</div>

<h3 className="text-2xl font-bold mt-6">

Global Search

</h3>

<p className="text-gray-500 mt-4 leading-8">

Quickly locate users,
resources,
requests and system information
from anywhere.

</p>

</div>

</div>

</div>

</section>









{/* ================= ABOUT ================= */}

<section

id="about"

className="py-28 bg-white"

>

<div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-20 items-center">





<div data-aos="fade-right">

<h2 className="text-5xl font-black text-gray-900">

Why Choose

<span className="block text-blue-600">

NexusHub?

</span>

</h2>

<p className="text-xl text-gray-500 mt-8 leading-9">

NexusHub was built to simplify organizational operations by
bringing employee management, work requests,
resource allocation and notifications together in one
modern enterprise platform.

</p>






<div className="grid grid-cols-2 gap-6 mt-12">

<div className="flex gap-4">

<MdSecurity className="text-3xl text-blue-600"/>

<div>

<h4 className="font-bold">

Secure

</h4>

<p className="text-gray-500">

JWT Authentication

</p>

</div>

</div>





<div className="flex gap-4">

<FaBell className="text-3xl text-red-500"/>

<div>

<h4 className="font-bold">

Real-Time

</h4>

<p className="text-gray-500">

Notifications

</p>

</div>

</div>





<div className="flex gap-4">

<FaUsers className="text-3xl text-green-600"/>

<div>

<h4 className="font-bold">

Role Based

</h4>

<p className="text-gray-500">

Admin & Employee

</p>

</div>

</div>





<div className="flex gap-4">

<FaSearch className="text-3xl text-purple-600"/>

<div>

<h4 className="font-bold">

Fast

</h4>

<p className="text-gray-500">

Global Search

</p>

</div>

</div>

</div>

</div>









<div

data-aos="fade-left"

className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-12 text-white"

>

<h2 className="text-4xl font-black">

One Platform

</h2>

<p className="mt-6 text-lg leading-9">

Manage your employees, assign work,
monitor resources, receive notifications,
track statistics and improve productivity
through one centralized dashboard.

</p>

<div className="mt-10 space-y-5">

<div>✔ Employee & Team Management</div>

<div>✔ Work Request Tracking</div>

<div>✔ Resource Inventory</div>

<div>✔ Instant Notifications</div>

<div>✔ Dashboard Analytics</div>

<div>✔ Secure Authentication</div>

</div>

</div>

</div>

</section>
{/* ================= HOW IT WORKS ================= */}

<section
id="workflow"
className="py-28 bg-gradient-to-br from-gray-50 to-blue-50"
>

<div className="max-w-7xl mx-auto px-8">

<div
className="text-center mb-20"
data-aos="fade-up"
>

<h2 className="text-5xl font-black text-gray-900">

How NexusHub Works

</h2>

<p className="text-xl text-gray-500 mt-5">

A simple workflow that keeps everyone connected.

</p>

</div>




<div className="grid md:grid-cols-5 gap-8">

<div
data-aos="fade-up"
className="bg-white rounded-3xl shadow-xl p-8 text-center hover:-translate-y-2 transition"
>

<div className="w-20 h-20 mx-auto rounded-full bg-blue-100 flex items-center justify-center">

<FaUsers className="text-4xl text-blue-600"/>

</div>

<h3 className="font-bold text-xl mt-6">

Employee

</h3>

<p className="text-gray-500 mt-4">

Creates a work request.

</p>

</div>





<div
data-aos="fade-up"
data-aos-delay="100"
className="bg-white rounded-3xl shadow-xl p-8 text-center hover:-translate-y-2 transition"
>

<div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center">

<FaTasks className="text-4xl text-green-600"/>

</div>

<h3 className="font-bold text-xl mt-6">

Submit

</h3>

<p className="text-gray-500 mt-4">

The request is stored securely.

</p>

</div>






<div
data-aos="fade-up"
data-aos-delay="200"
className="bg-white rounded-3xl shadow-xl p-8 text-center hover:-translate-y-2 transition"
>

<div className="w-20 h-20 mx-auto rounded-full bg-purple-100 flex items-center justify-center">

<MdSecurity className="text-4xl text-purple-600"/>

</div>

<h3 className="font-bold text-xl mt-6">

Admin Review

</h3>

<p className="text-gray-500 mt-4">

Administrator reviews and approves.

</p>

</div>






<div
data-aos="fade-up"
data-aos-delay="300"
className="bg-white rounded-3xl shadow-xl p-8 text-center hover:-translate-y-2 transition"
>

<div className="w-20 h-20 mx-auto rounded-full bg-orange-100 flex items-center justify-center">

<FaBoxes className="text-4xl text-orange-500"/>

</div>

<h3 className="font-bold text-xl mt-6">

Assignment

</h3>

<p className="text-gray-500 mt-4">

Work is assigned to a team member.

</p>

</div>







<div
data-aos="fade-up"
data-aos-delay="400"
className="bg-white rounded-3xl shadow-xl p-8 text-center hover:-translate-y-2 transition"
>

<div className="w-20 h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center">

<FaBell className="text-4xl text-red-500"/>

</div>

<h3 className="font-bold text-xl mt-6">

Notification

</h3>

<p className="text-gray-500 mt-4">

Everyone receives instant updates.

</p>

</div>

</div>

</div>

</section>









{/* ================= STATISTICS ================= */}

<section
className="py-28 bg-white"
>

<div className="max-w-7xl mx-auto px-8">

<div
className="text-center"
data-aos="fade-up"
>

<h2 className="text-5xl font-black">

Platform Highlights

</h2>

<p className="text-xl text-gray-500 mt-5">

Designed to improve operational efficiency.

</p>

</div>





<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">




<div
data-aos="zoom-in"
className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl text-white p-10 text-center shadow-xl"
>

<h2 className="text-6xl font-black">

100%

</h2>

<p className="mt-4 text-lg">

Secure Authentication

</p>

</div>







<div
data-aos="zoom-in"
data-aos-delay="100"
className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl text-white p-10 text-center shadow-xl"
>

<h2 className="text-6xl font-black">

24/7

</h2>

<p className="mt-4 text-lg">

System Availability

</p>

</div>








<div
data-aos="zoom-in"
data-aos-delay="200"
className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl text-white p-10 text-center shadow-xl"
>

<h2 className="text-6xl font-black">

Fast

</h2>

<p className="mt-4 text-lg">

Global Search

</p>

</div>








<div
data-aos="zoom-in"
data-aos-delay="300"
className="bg-gradient-to-r from-red-500 to-pink-600 rounded-3xl text-white p-10 text-center shadow-xl"
>

<h2 className="text-6xl font-black">

Real-Time

</h2>

<p className="mt-4 text-lg">

Notifications

</p>

</div>

</div>

</div>

</section>
{/* ================= TECHNOLOGY STACK ================= */}

<section
id="technology"
className="py-28 bg-gray-900 text-white"
>

<div className="max-w-7xl mx-auto px-8">

<div
className="text-center"
data-aos="fade-up"
>

<h2 className="text-5xl font-black">

Built With Modern Technologies

</h2>

<p className="text-xl text-gray-400 mt-5">

NexusHub uses reliable technologies to deliver a secure,
fast and scalable experience.

</p>

</div>





<div className="grid md:grid-cols-4 gap-8 mt-20">



<div
data-aos="zoom-in"
className="bg-gray-800 rounded-3xl p-8 text-center hover:bg-blue-600 transition duration-300"
>

<h3 className="text-3xl font-bold">

⚛️

</h3>

<h4 className="text-xl font-semibold mt-5">

React

</h4>

<p className="text-gray-300 mt-4">

Modern user interface built with reusable components.

</p>

</div>







<div
data-aos="zoom-in"
data-aos-delay="100"
className="bg-gray-800 rounded-3xl p-8 text-center hover:bg-green-600 transition duration-300"
>

<h3 className="text-3xl font-bold">

🟢

</h3>

<h4 className="text-xl font-semibold mt-5">

Node.js

</h4>

<p className="text-gray-300 mt-4">

High-performance backend runtime.

</p>

</div>







<div
data-aos="zoom-in"
data-aos-delay="200"
className="bg-gray-800 rounded-3xl p-8 text-center hover:bg-purple-600 transition duration-300"
>

<h3 className="text-3xl font-bold">

🚀

</h3>

<h4 className="text-xl font-semibold mt-5">

Express

</h4>

<p className="text-gray-300 mt-4">

Fast RESTful API development.

</p>

</div>








<div
data-aos="zoom-in"
data-aos-delay="300"
className="bg-gray-800 rounded-3xl p-8 text-center hover:bg-orange-500 transition duration-300"
>

<h3 className="text-3xl font-bold">

🗄️

</h3>

<h4 className="text-xl font-semibold mt-5">

MySQL

</h4>

<p className="text-gray-300 mt-4">

Reliable relational database management.

</p>

</div>

</div>








<div className="grid md:grid-cols-4 gap-8 mt-10">





<div
data-aos="zoom-in"
className="bg-gray-800 rounded-3xl p-8 text-center hover:bg-red-500 transition"
>

<h3 className="text-3xl">

🔐

</h3>

<h4 className="text-xl font-semibold mt-5">

JWT

</h4>

<p className="text-gray-300 mt-4">

Secure authentication.

</p>

</div>







<div
data-aos="zoom-in"
data-aos-delay="100"
className="bg-gray-800 rounded-3xl p-8 text-center hover:bg-cyan-500 transition"
>

<h3 className="text-3xl">

🎨

</h3>

<h4 className="text-xl font-semibold mt-5">

Tailwind CSS

</h4>

<p className="text-gray-300 mt-4">

Modern responsive design.

</p>

</div>








<div
data-aos="zoom-in"
data-aos-delay="200"
className="bg-gray-800 rounded-3xl p-8 text-center hover:bg-indigo-500 transition"
>

<h3 className="text-3xl">

🌐

</h3>

<h4 className="text-xl font-semibold mt-5">

Axios

</h4>

<p className="text-gray-300 mt-4">

API communication made simple.

</p>

</div>








<div
data-aos="zoom-in"
data-aos-delay="300"
className="bg-gray-800 rounded-3xl p-8 text-center hover:bg-pink-500 transition"
>

<h3 className="text-3xl">

📁

</h3>

<h4 className="text-xl font-semibold mt-5">

Multer

</h4>

<p className="text-gray-300 mt-4">

Secure image upload handling.

</p>

</div>

</div>

</div>

</section>









{/* ================= WHY NEXUSHUB ================= */}

<section
className="py-28 bg-gradient-to-br from-blue-50 to-white"
>

<div className="max-w-7xl mx-auto px-8">

<div
className="text-center"
data-aos="fade-up"
>

<h2 className="text-5xl font-black text-gray-900">

Why Organizations Choose NexusHub

</h2>

<p className="text-xl text-gray-500 mt-5">

Everything needed to manage operations from one place.

</p>

</div>





<div className="grid lg:grid-cols-2 gap-16 mt-20">





<div data-aos="fade-right">

<div className="space-y-8">

<div className="bg-white rounded-2xl shadow-lg p-6">

<h3 className="text-2xl font-bold text-blue-600">

✔ Centralized Management

</h3>

<p className="text-gray-600 mt-3">

Manage employees, resources, requests and notifications
from a single dashboard.

</p>

</div>






<div className="bg-white rounded-2xl shadow-lg p-6">

<h3 className="text-2xl font-bold text-green-600">

✔ Better Productivity

</h3>

<p className="text-gray-600 mt-3">

Automated workflows reduce manual work and improve
team collaboration.

</p>

</div>






<div className="bg-white rounded-2xl shadow-lg p-6">

<h3 className="text-2xl font-bold text-purple-600">

✔ Enterprise Security

</h3>

<p className="text-gray-600 mt-3">

Role-based authentication keeps organizational
data secure.

</p>

</div>

</div>

</div>









<div
data-aos="fade-left"
className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl text-white p-12 flex flex-col justify-center"
>

<h2 className="text-4xl font-black">

A Complete Management Solution

</h2>

<p className="mt-8 text-lg leading-9">

NexusHub helps organizations simplify everyday
operations by providing a modern platform for
employees and administrators.

</p>

<div className="grid grid-cols-2 gap-5 mt-10">

<div>✅ Team Management</div>

<div>✅ Work Requests</div>

<div>✅ Resources</div>

<div>✅ Notifications</div>

<div>✅ Dashboard Analytics</div>

<div>✅ Global Search</div>

<div>✅ User Profiles</div>

<div>✅ Secure Login</div>

</div>

</div>

</div>

</div>

</section>
        {/* ===================== */}
        {/* FOOTER */}
        {/* ===================== */}

        <footer className="bg-gray-900 text-gray-300 py-10">

            <div className="max-w-7xl mx-auto px-8">

                <div className="grid md:grid-cols-3 gap-8">

                    <div>

                        <h2 className="text-2xl font-bold text-white">
                            NexusHub
                        </h2>

                        <p className="mt-3 text-gray-400 leading-relaxed">
                            A modern Smart Operations Management Portal that
                            simplifies work request management, team
                            collaboration, resource tracking, notifications,
                            analytics and user administration.
                        </p>

                    </div>

                    <div>

                        <h3 className="font-bold text-white mb-4">
                            Core Features
                        </h3>

                        <ul className="space-y-2">

                            <li>✔ Secure Authentication</li>

                            <li>✔ Dashboard Analytics</li>

                            <li>✔ Work Requests</li>

                            <li>✔ Team Members</li>

                            <li>✔ Resource Management</li>

                            <li>✔ Notifications</li>

                            <li>✔ Global Search</li>

                            <li>✔ User Profiles</li>

                        </ul>

                    </div>

                    <div>

                        <h3 className="font-bold text-white mb-4">
                            Technology
                        </h3>

                        <ul className="space-y-2">

                            <li>React + Vite</li>

                            <li>Tailwind CSS</li>

                            <li>Node.js</li>

                            <li>Express.js</li>

                            <li>MySQL</li>

                            <li>JWT Authentication</li>

                            <li>Multer Uploads</li>

                            <li>REST APIs</li>

                        </ul>

                    </div>

                </div>

                <div className="border-t border-gray-700 mt-10 pt-6 text-center">

                    <p className="text-gray-400">

                        © 2026 NexusHub — Smart Operations Management Portal

                    </p>

                    <p className="mt-2 text-gray-500 text-sm">

                        Developed as a full-stack Software Engineering project by Abdulbasit Ylkal.

                    </p>

                </div>

            </div>

        </footer>

    </div>

);

}

export default HomePage;