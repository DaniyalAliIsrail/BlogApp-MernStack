import { Footer } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { BsFacebook, BsGithub, BsInstagram } from "react-icons/bs";
// import LOGO from "../assets/logp.png"

const Myfooter = () => {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-col-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white "
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 vis-purple-500 to-teal-500 rounded-lg text-white ">
                Denzy
              </span>
              {/* <img src={LOGO} /> */}
            </Link>
          </div>
          <div
            className="grid grid-cols-2 gap-8
          mt-4 sm:grid-cols-3 sm:gap-6
          "
          >
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link href="https://www.100jsprojects.com">
                  contactBook
                </Footer.Link>
                <Footer.Link href="https://www.100jsprojects.com">
                  Ecommerce App
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link href="https://www.100jsprojects.com">
                  Twitter
                </Footer.Link>
                <Footer.Link href="https://www.100jsprojects.com">
                  Facebook
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="https://www.100jsprojects.com">
                  Twitter
                </Footer.Link>
                <Footer.Link href="https://www.100jsprojects.com">
                  Facebook
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Tenzy's Blogs"
            year={new Date().getFullYear()}
          />

          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default Myfooter;
