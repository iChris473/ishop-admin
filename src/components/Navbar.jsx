
import {MenuAlt3Icon, XIcon} from "@heroicons/react/outline"
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({setMobile}) {
  const [x, setX] = useState(false)
  return (
    <nav className="bg-gray-100 border-b shadow border-gray-50 p-5 fixed w-full z-50 flex items-center justify-between md:block">
      <Link to="/">
        <h1 className="font-bold tangerine text-violet-800 text-md md:text-2xl whitespace-nowrap">
          Perfume and More Stores Admin
        </h1>
      </Link>
      {x ? (
        <XIcon
          onClick={() => {
            setX(false);
            setMobile(false);
          }}
          className="w-7 h-7 text-green-800 ml-2 md:hidden"
        />
      ) : (
        <MenuAlt3Icon
          onClick={() => {
            setX(true);
            setMobile(true);
          }}
          className="w-7 h-7 text-green-800 ml-2 md:hidden"
        />
      )}
    </nav>
  );
}
