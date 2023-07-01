import React from "react";

export const SidebarIcon = ({ icon, className = "", tooltip, onClick }) => {
  return (
    <div className={`sidebarIcon group ${className}`} onClick={onClick}>
      {icon}
      {tooltip ? (
        <span className="sideBarTooltip group-hover:scale-100 capitalize">
          {tooltip}
        </span>
      ) : null}
    </div>
  );
};
