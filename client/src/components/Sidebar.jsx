import React from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { CirclePlus, LogOut } from "lucide-react";
import MenueItems from "./MenueItems";
import { UserButton, useClerk, useUser } from "@clerk/clerk-react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();   

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Sign-out failed:", error);
    }
  };

  return (
    <div
      className={`w-60 xl:w-72 bg-white border-r border-gray-200 flex flex-col
        justify-between items-center max-sm:absolute top-0 bottom-0 z-20 ${
          sidebarOpen ? "translate-x-0" : "max-sm:-translate-x-full"
        } transition-all duration-300 ease-in`}
    >
      <div className="w-full">
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          className="w-28 ml-7 my-2 cursor-pointer"
          alt="Logo"
        />
        <hr className="border-gray-300 mb-8" />

        {/* Menu Items */}
        <MenueItems setSidebarOpen={setSidebarOpen} />

        {/* Create Post Button */}
        <Link
          to="/create-post"
          className="flex items-center justify-center gap-2 py-2.5 mt-6 mx-6 rounded-lg 
                     bg-gradient-to-r from-blue-600 to-purple-600 hover:from-indigo-700 
                     hover:to-purple-800 active:scale-95 transition text-white cursor-pointer"
        >
          <CirclePlus className="w-5 h-5" />
          Create Post
        </Link>
      </div>

      {/* Footer: User info and logout */}
      <div className="w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between">
        <div className="flex gap-2 items-center cursor-pointer">
          <UserButton
            afterSignOutUrl="/login"
            afterAccountDeletedUrl="/login"
            afterMultiSessionSingleSignOutUrl="/login"
            appearance={{
              elements: { userButtonAvatarBox: "w-10 h-10" },
            }}
          />
          <div>
            {/* show data only when loaded */}
            <h1 className="text-sm font-medium">
              {isLoaded ? user?.fullName : "Loading…"}
            </h1>
            <p className="text-xs text-gray-500">
              {isLoaded ? `@${user?.username || user?.primaryEmailAddress?.emailAddress.split("@")[0]}` : ""}
            </p>
          </div>
        </div>

        <LogOut
          onClick={handleLogout}
          className="w-4 text-gray-400 hover:text-gray-700 transition cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Sidebar;
