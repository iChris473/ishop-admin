import { CurrencyDollarIcon, ShoppingCartIcon, UserIcon } from "@heroicons/react/outline";


export default function Widgets({users, earnings, orders}) {
  return (
    <div className="w-[97%] md:w-full p-4 border rounded-md border-gray-200 md:max-w-[350px] mx-auto shadow-md m-2 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-500 tracking-wider font-bold text-md">
          {users ? "USERS" : earnings ? "EARNINGS" : "ORDERS"}
        </h2>
        <p className="text-green-600 font-bold text-md">^ 20 %</p>
      </div>
      <h1 className="text-3xl font-bold text-gray-600">
        {users ? "200" : earnings ? "NGN 100,000" : "20"}
      </h1>
      <div className="flex items-center justify-between">
        <button className="text-gray-600 border-b font-semibold text-sm border-gray-400">
          View all {users ? "Users" : earnings ? "Earnings" : "Orders"}
        </button>
        {
            users ? 
            <UserIcon className="h-6 text-pink-500" /> :
            earnings ? 
            <CurrencyDollarIcon className="h-6 text-yellow-500" /> :
            <ShoppingCartIcon className="h-6 text-green-500" />
        }
      </div>
    </div>
  );
}
