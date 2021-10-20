import React, { useContext } from "react";
import { GiHouse, GiShoppingCart, GiCog } from "react-icons/gi";
import { HiUser } from "react-icons/hi";
import { Context } from "../state/context";
import Pill from "./pill";

export default function Navbar() {
  const { user } = useContext(Context);
  const { username, role } = user ?? {};
  return (
    <div className="py-10 px-3 mx-2 md:mx-52 md:px-12 rounded-b-3xl">
      <div className="flex justify-between items-center">
        <div>
          <a href="/">
            <img
              src="fanta.png"
              className="h-8 w-8 opacity-80 hover:opacity-100 transition-all duration-500 ease-in-out mx-5"
              alt=""
            />
          </a>
        </div>
        <div className="flex items-center align-middle">
          <a href="/">
            <GiHouse
              color="#FFD369"
              className="h-8 w-8 opacity-30 hover:opacity-100 transition-all duration-500 ease-in-out mx-5"
            />
          </a>

          <a href="/store">
            <GiShoppingCart
              color="#FFD369"
              className="h-8 w-8 opacity-30 hover:opacity-100 transition-all duration-500 ease-in-out mx-5"
            />
          </a>
        </div>
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1610397095767-84a5b4736cbd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col ml-2 hidden md:block">
            <span className="font-semibold text-base text-gray-300">
              {username}
            </span>
            <Pill
              text={role}
              className="text-gray-800 text-sm bg-gray-200 capitalize"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
