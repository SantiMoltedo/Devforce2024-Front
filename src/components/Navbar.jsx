import React, { useContext } from "react";
import logoLiceman from "../assets/images/liceman-logo.png";
import { UserContext } from "../context/UserContext";

export const Navbar = ({ titulo }) => {
  const { userData } = useContext(UserContext);
  if (userData) {
    return (
      <div className="shadow-md ml-20 top-0 right-0 p-2 flex justify-between items-center px-6">
        <img src={logoLiceman} alt="" className="w-40 h-12" />
        {/* <h1 className="font-bold text-xl">{titulo}</h1> */}
        {/* TODO: VER QUE PONER ACA!!!! */}
        <a href="/profile">
          <div className="rounded-full h-14 aspect-square bg-dfLight border-dfGreyDark border flex justify-center items-center">
            <span className="flex w-full gap-1 justify-center overflow-hidden">
              {userData.avatar ? (
                <img src={logoLiceman} />
              ) : (
                <>
                  <span className="text-2xl leading-5">
                    {userData.firstname.charAt(0)}
                  </span>
                  <span className="text-2xl leading-5">
                    {userData.lastname.charAt(0)}
                  </span>
                </>
              )}
            </span>
          </div>
        </a>
      </div>
    );
  }
  return <div></div>;
};
