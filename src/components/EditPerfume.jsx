import { CameraIcon } from "@heroicons/react/solid";
import { useState } from "react";


export default function AddProduct() {
  const [counter, setCounter] = useState(1)
  return (
    <div className="w-[99%] md:w-[95%] mx-auto p-4 border rounded-md border-gray-200 max-w-[950px] shadow-md">
      <div className="flex flex-col gap-5 md:grid grid-cols-5 space-x-5">
        <div className="bg-gray-100 p-5 col-span-2 w-full min-h-[250px] flex flex-col items-center justify-center relative">
            <button className="absolute top-5 border-b text-blue-500 font-semibold text-sm border-blue-500 z-10">Update picture</button>
          <img src={require("../images/p1.png")} alt="" className="w-full h-full absolute object-contain" />
        </div>
        <form className="col-span-3 space-y-5 py-5">
          <div className="space-y-2">
            <p className="text-md font-bold text-gray-500 tracking-wider">
              Perfume's Name
            </p>
            <input
              type="text"
              placeholder="Chanel Coco Mademoiselle"
              className="border-b outline-none w-full placeholder:opacity-70 placeholder:text-md border-gray-400"
            />
          </div>
          <div className="space-y-2">
            <p className="text-md font-bold text-gray-500 tracking-wider">
              Perfume's Description
            </p>
            <input
              type="text"
              placeholder="Add a short description about the perfume"
              className="border-b outline-none w-full placeholder:opacity-70 placeholder:text-md border-gray-400"
            />
          </div>
          <div className="space-y-2">
            <p className="text-md font-bold text-gray-500 tracking-wider">
              Perfume's Price (NGN)
            </p>
            <input
              type="number"
              placeholder="1200"
              className="border-b outline-none w-full placeholder:opacity-70 placeholder:text-md border-gray-400"
            />
          </div>
          <div className="space-y-2">
            <p className="text-md font-bold text-gray-500 tracking-wider">
              Brand
            </p>
            <input
              type="text"
              placeholder="Dolce and Gbanana"
              className="border-b outline-none w-full placeholder:opacity-70 placeholder:text-md border-gray-400"
            />
          </div>
          <div className="space-y-2">
            <p className="text-md font-bold text-gray-500 tracking-wider">
              Quantity
            </p>
            <div className="border-b rounded-sm border-gray-300 flex items-center justify-between px-7">
              <button
                disabled={counter == 1}
                onClick={() => setCounter(counter - 1)}
                className="text-xl text-gray-700 font-bold cursor-pointer disabled:cursor-not-allowed disabled:opacity-20"
              >
                -
              </button>
              <input
                id="quantity"
                type="number"
                value={counter}
                onChange={(e) => setCounter(e.target.value)}
                className="outline-none text-gray-700 max-w-[20px] mx-4 text-center placeholder:text-gray-800 text-lg font-semibold"
              />
              <button
                onClick={() => setCounter(counter + 1)}
                className="text-xl text-gray-700 font-bold cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
          <div className="space-y-2 w-full">
            <p className="text-md font-bold text-gray-500 tracking-wider">
              Category
            </p>
            <select className="border-b p-1 border-gray-400 outline-none rounded-md text-sm w-full">
            <option value="unisex">Unisex</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          </div>
          <button className="text-white font-bold tracking-wider p-2 bg-orange-600 rounded-md block w-full mx-auto max-w-[500px]">Update</button>
        </form>
      </div>
    </div>
  );
}
