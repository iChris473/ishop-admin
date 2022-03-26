
import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import EditPerfume from "../components/EditPerfume"
import { useNavigate } from "react-router"

export default function NewProduct() {
    const [mobile, setMobile] = useState(false)

  return (
    <div
      className={`${
        mobile && "overflow-y-hidden h-screen"
      } overflow-x-hidden grid grid-cols-4`}
    >
      <Navbar setMobile={setMobile} />
      <div
        className={`${
          mobile ? "absolute" : "hidden"
        } md:block z-10 col-span-1 border-r border-blue-200 min-h-screen h-full mt-18`}
      >
        <Sidebar />
      </div>
      <div className="col-span-4 md:col-span-3 mt-20 p-5 w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-wide text-green-600 capitalize">
            Update Perfume
          </h1>
          <button className="text-black font-bold tracking-wider py-2 px-5 border border-gray-800 rounded-md max-w-[500px]">Delete</button>
        </div>
          <div className="mt-6 p-2">
            <EditPerfume />
          </div>
      </div>
    </div>
  );
}
