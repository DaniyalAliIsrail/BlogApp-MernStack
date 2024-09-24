import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  TextInput,
} from "flowbite-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { useSelector } from "react-redux";
const Header = () => {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white "
      >
        <span className="px-2 py-1 bg-gradient-to-r from-green-500 vis-purple-500 to-blue-500 rounded-lg text-white ">
          Tenzy
        </span>
        {/* <img src="../" /> */}
      </Link>

      <form>
        <TextInput
          type="text"
          placeholder="serach.."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>

      <Button className="w-12 h-10 lg:hidden " color="gray" pill>
        <AiOutlineSearch />
      </Button>

      <div className="flex gap-2 md:order-2 items-center">
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
          <FaMoon />
        </Button>

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <DropdownHeader>
              <span className="block">{currentUser.username}</span>
              {currentUser.email}
            </DropdownHeader>
            <Link to={"/dashboard?tab=profile"}>
              <DropdownItem>Profile</DropdownItem>
            </Link>
            <DropdownDivider />
            <DropdownItem>Sign out</DropdownItem>
          </Dropdown>
        ) : (
          <Link to="/signin">
            <Button outline gradientDuoTone="greenToBlue">
              Signin
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>

        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">about</Link>
        </Navbar.Link>

        <Navbar.Link active={path === "/project"} as={"div"}>
          <Link to="/project">projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
