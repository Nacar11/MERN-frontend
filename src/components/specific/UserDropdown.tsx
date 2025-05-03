import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
const UserDropdown = () => {
  const { user } = useAuthContext();

  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };
  const [age, setAge] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <p>Age</p>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <div className="m-0 p-0 min-h-screen bg-[#FCFAEE] grid place-items-center">
        <div className="rounded-md select-none bg-[#131212] px-2 py-3 text-[#D4CDCD]">
          <div className="flex gap-4 justify-center items-center">
            <img
              src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="size-10 object-cover rounded-full"
              alt="profile"
            />
            <div className="flex-1">
              <h1 className="text-md">George Sears</h1>
              <h2 className="text-xs">georgesears@gmail.com</h2>
            </div>
            <div className="flex flex-col text-[10px]">
              <i className="fa-solid fa-chevron-up"></i>
              <i className="fa-solid fa-chevron-down"></i>
            </div>
          </div>
          <p className="my-2 border-[#292929]" />
          <ul className="w-[256px] [&>*]:h-12 [&>*]:p-3 [&>*]:flex [&>*]:gap-4 [&>*]:rounded-md [&>*]:items-center [&>*]:cursor-pointer">
            <li className="hover:bg-[#292929]">
              <i className="fa-regular fa-user"></i>
              <span className="text-sm">Account Settings</span>
            </li>
            <li className="hover:bg-[#292929]">
              <i className="fa-solid fa-table-cells-large"></i>
              <span className="text-sm">Integrations</span>
            </li>
            <li className="hover:bg-[#292929]">
              <i className="fa-solid fa-gear"></i>
              <span className="text-sm">Settings</span>
            </li>
            <li className="hover:bg-[#292929]">
              <i className="fa-regular fa-file"></i>
              <span className="text-sm">Guide</span>
            </li>
            <li className="hover:bg-[#292929]">
              <i className="fa-regular fa-circle-question"></i>
              <span className="text-sm">Help Center</span>
            </li>
          </ul>
          <p className="my-2 border-[#292929]" />
          <div className="flex justify-between px-3 py-2">
            <div className="flex flex-col">
              <span className="text-md">Free Plan</span>
              <span className="text-xs">12,500 views</span>
            </div>
            <button className="bg-[#9AAEFF] text-[#30344A] text-sm font-bold px-4 rounded-md transition hover:scale-110">
              Upgrade
            </button>
          </div>
          <p className="my-2 border-[#292929]" />
          <div className="flex gap-4 px-2 group items-center group hover:gap-2">
            <i className="fa-solid fa-arrow-right-to-bracket group-hover:ml-2"></i>
            <span className="text-sm p-2">Logout</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDropdown;
