import React from "react";

export const SidebarIcon = ({ icon, className = "", tooltip }) => {
  return (
    <div className={`sidebarIcon group ${className}`}>
      {icon}
      {tooltip ? (
        <span className="sideBarTooltip group-hover:scale-100 capitalize">
          {tooltip}
        </span>
      ) : null}
    </div>
  );
};
