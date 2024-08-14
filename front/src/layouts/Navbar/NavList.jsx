import React from "react";
import {
  Typography,
  MenuItem,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  CubeTransparentIcon,
  CodeBracketSquareIcon,
} from "@heroicons/react/24/solid";
import NavListMenu from "./NavListMenu";
import { useNavigate } from "react-router-dom";


// Nav list component

export default function NavList() {
  const navigate = useNavigate();
    const navListItems = [
        {
          label: "Users",
          icon: UserCircleIcon,
          onClick: () => {
            navigate("/list_users");
          },
        },
      ];
      
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <NavListMenu />
      {navListItems.map(({ label, icon, onClick }, key) => (
        <Typography
          key={label}
          variant="small"
          color="gray"
          onClick={onClick}
          className="font-medium text-blue-gray-500"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            <span className="text-gray-900"> {label}</span>
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
}
