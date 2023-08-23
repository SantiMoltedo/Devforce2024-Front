import React, { useContext } from "react";
import logoLiceman from "../assets/images/liceman-logo.png";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { userData, avatar } = useContext(UserContext);
  return (
    <div
      className={`${
        userData ? "ml-20 " : ""
      }shadow-md p-2 flex justify-between items-center px-6 bg-white`}
    >
      <img src={logoLiceman} alt="" className="w-40 h-12" />
      {userData && (
        <Link to={`/profile/${userData.id}`}>
          <div className="rounded-full h-14 aspect-square bg-dfLight border-dfGreyDark border flex justify-center items-center overflow-hidden">
            <span className="flex w-full gap-1 justify-center overflow-hidden">
              {avatar ? (
                <img
                  src={`data:image/jpeg;base64,${avatar}`}
                  className="w-full h-full"
                />
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
        </Link>
      )}
    </div>
  );
  return <div></div>;
};
