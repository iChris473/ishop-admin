
import { useState } from "react"
import Navbar from "../components/Navbar"
import Pagination from "../components/Pagination"
import Sidebar from "../components/Sidebar"
import Datatables from "../components/Datatables"
import { useNavigate } from "react-router"

export default function Featured() {
    const [mobile, setMobile] = useState(false)
    const navigate = useNavigate()

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
      <div className="col-span-4 md:col-span-3 mt-24 flex flex-col items-center">
        <div className="flex items-center justify-between w-[95%] mx-auto">
          <h1 className="text-2xl tracking-wider ml-5 font-bold text-gray-600">
            Featured Products
          </h1>
          <button onClick={() => navigate("/new?q=featured")} className="border border-gray-400 p-2 rounded-md text-sm font-bold hover:bg-gray-800 hover:text-white">Add Featured Product</button>
        </div>
        <div className="p-5">
          <Datatables />
          <div className="flex justify-end">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}
