import { CogIcon, CreditCardIcon, LogoutIcon, ShoppingBagIcon, TableIcon, TruckIcon, UserIcon, UsersIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";


export default function Sidebar() {
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
        <div className=" p-1 cursor-pointer hover:bg-gray-100">
          <div className="flex items-center justify-start m-2 gap-5">
            <CreditCardIcon className="h-7 text-blue-600" />
            <p className="text-sm font-bold text-gray-600">Orders</p>
          </div>
        </div>
        <div className=" p-1 cursor-pointer hover:bg-gray-100">
          <div className="flex items-center justify-start m-2 gap-5">
            <TruckIcon className="h-7 text-blue-600" />
            <p className="text-sm font-bold text-gray-600">Delivery</p>
          </div>
        </div>
        <div className=" p-1 cursor-pointer hover:bg-gray-100">
          <div className="flex items-center justify-start m-2 gap-5">
            <CogIcon className="h-7 text-blue-600" />
            <p className="text-sm font-bold text-gray-600">Settings</p>
          </div>
        </div>
        <div className=" p-1 cursor-pointer hover:bg-gray-100">
          <div className="flex items-center justify-start m-2 gap-5">
            <UserIcon className="h-7 text-blue-600" />
            <p className="text-sm font-bold text-gray-600">Profile</p>
          </div>
        </div>
        <div className=" p-1 cursor-pointer hover:bg-gray-100">
          <div className="flex items-center justify-start m-2 gap-5">
            <LogoutIcon className="h-7 text-blue-600" />
            <p className="text-sm font-bold text-gray-600">Log Out</p>
          </div>
        </div>
      </div>
    </div>
  );
}
