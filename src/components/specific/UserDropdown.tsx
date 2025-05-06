import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import { useState } from "react";
import { Dropdown, DropdownDivider, DropdownItem } from "flowbite-react";

const UserDropdown = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };

  return (
    <Dropdown
      label={
        <div className="flex items-center space-x-2 cursor-pointer text-sm">
          <img
            src="/assets/user.jpg"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <p className="text-sm">Profile</p>
        </div>
      }
      className="bg-white rounded-lg text-black hover:text-gray-900 border"
    >
      <div className="rounded-md select-none bg-gray-100 py-3 text-[#D4CDCD]">
        <DropdownItem className="bg-gray-100 rounded-md hover:text-gray-900">
          <div className="flex gap-4 justify-start items-center">
            <img
              src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="size-10 object-cover rounded-full"
              alt="profile"
            />
            <h1 className="text-md">George Sears</h1>
          </div>
        </DropdownItem>
        <DropdownItem className="hover:text-gray-900 hover:bg-white my-3 bg-gray-100 rounded-md">
          <span className="text-sm">Account Settings</span>
        </DropdownItem>
        <DropdownItem className="hover:text-gray-900 hover:bg-white my-3 bg-gray-100 rounded-md">
          <span className="text-sm">Integrations</span>
        </DropdownItem>
        <DropdownItem className="hover:text-gray-900 hover:bg-white my-3 bg-gray-100 rounded-md">
          <span className="text-sm">Guide</span>
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem
          onClick={handleLogout}
          className="hover:text-gray-900 hover:bg-white mt-3 bg-gray-100 rounded-md"
        >
          <span className="text-sm">Logout</span>
        </DropdownItem>
      </div>
    </Dropdown>
  );
};

export default UserDropdown;
