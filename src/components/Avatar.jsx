import React from "react";

export const Avatar = ({ avatarb64, user }) => {
  return (
    <span className="avatar flex w-full gap-1 justify-center rounded-full overflow-hidden transition-all">
      {avatarb64 ? (
        <img
          src={`data:image/jpeg;base64,${avatarb64}`}
          className="w-full h-full"
        />
      ) : (
        <>
          <span className="text-7xl min-xl:text-8xl md:text-7xl leading-5">
            {user.firstname.charAt(0)}
          </span>
          <span className="text-7xl min-xl:text-8xl md:text-7xl leading-5">
            {user.lastname.charAt(0)}
          </span>
        </>
      )}
    </span>
  );
};
