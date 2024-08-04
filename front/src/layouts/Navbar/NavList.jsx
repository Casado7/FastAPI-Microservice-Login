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


// Nav list component

export default function NavList() {
    const navListItems = [
        {
          label: "Account",
          icon: UserCircleIcon,
        },
        {
          label: "Blocks",
          icon: CubeTransparentIcon,
        },
        {
          label: "Docs",
          icon: CodeBracketSquareIcon,
        },
      ];
      
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <NavListMenu />
      {navListItems.map(({ label, icon }, key) => (
        <Typography
          key={label}
          as="a"
          href="#"
          variant="small"
          color="gray"
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
