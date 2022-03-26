import { CogIcon, CreditCardIcon, LogoutIcon, ShoppingBagIcon, TableIcon, TruckIcon, UserIcon, UsersIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";


export default function Sidebar() {

  const {user, dispatch} = useContext(AuthContext)
  const navigate = useNavigate()
  const handleLogout = () => {
    console.log("logging out")
    localStorage.setItem("admin", null)
    dispatch({type: "LOGIN_SUCCESS", payload:null})
    navigate("/login")
  }
  return (
    <div className="bg-gray-50 h-screen">
      {/* Lists */}
      <div className="space-y-1 pt-20">
        <Link to="/">
          <div className=" p-1 cursor-pointer hover:bg-gray-100">
            <div className="flex items-center justify-start m-2 gap-5">
              <TableIcon className="h-7 text-blue-600" />
              <p className="text-sm font-bold text-gray-600">Dashboard</p>
            </div>
          </div>
        </Link>
        <Link to="/user">
          <div className=" p-1 cursor-pointer hover:bg-gray-100">
            <div className="flex items-center justify-start m-2 gap-5">
              <UsersIcon className="h-7 text-blue-600" />
              <p className="text-sm font-bold text-gray-600">Products</p>
            </div>
          </div>
        </Link>
        <Link to="/featured">
          <div className=" p-1 cursor-pointer hover:bg-gray-100">
            <div className="flex items-center justify-start m-2 gap-5">
              <UsersIcon className="h-7 text-blue-600" />
              <p className="text-sm font-bold text-gray-600">Featured</p>
            </div>
          </div>
        </Link>
        <Link to="/arrival">
          <div className=" p-1 cursor-pointer hover:bg-gray-100">
            <div className="flex items-center justify-start m-2 gap-5">
              <ShoppingBagIcon className="h-7 text-blue-600" />
              <p className="text-sm font-bold text-gray-600">New Arrivals</p>
            </div>
          </div>
        </Link>
        <Link to="/order">
          <div className=" p-1 cursor-pointer hover:bg-gray-100">
            <div className="flex items-center justify-start m-2 gap-5">
              <CreditCardIcon className="h-7 text-blue-600" />
              <p className="text-sm font-bold text-gray-600">Orders</p>
            </div>
          </div>
        </Link>
        <Link to="/delivery">
          <div className=" p-1 cursor-pointer hover:bg-gray-100">
            <div className="flex items-center justify-start m-2 gap-5">
              <TruckIcon className="h-7 text-blue-600" />
              <p className="text-sm font-bold text-gray-600">Delivery</p>
            </div>
          </div>
        </Link>
        <Link to="/settings">
          <div className=" p-1 cursor-pointer hover:bg-gray-100">
            <div className="flex items-center justify-start m-2 gap-5">
              <CogIcon className="h-7 text-blue-600" />
              <p className="text-sm font-bold text-gray-600">Settings</p>
            </div>
          </div>
        </Link>
        <div
          onClick={handleLogout}
          className=" p-1 cursor-pointer hover:bg-gray-100"
        >
          <div className="flex items-center justify-start m-2 gap-5">
            <LogoutIcon className="h-7 text-blue-600" />
            <p className="text-sm font-bold text-gray-600">Log Out</p>
          </div>
        </div>
      </div>
    </div>
  );
}
