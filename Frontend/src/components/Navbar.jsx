function Navbar() {

  return (

    <header className="h-16 bg-white shadow flex items-center justify-between px-6">


      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Smart Operations Management Portal
        </h2>
      </div>



      <div className="flex items-center gap-5">


        <input
          type="text"
          placeholder="Search anything..."
          className="border rounded-lg px-4 py-2 w-64"
        />


        <div className="flex items-center gap-3">


          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            A
          </div>


          <div>

            <p className="font-semibold">
              Admin
            </p>

            <p className="text-sm text-gray-500">
              Administrator
            </p>

          </div>


        </div>


      </div>


    </header>

  );

}


export default Navbar;