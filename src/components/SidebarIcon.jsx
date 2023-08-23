import React from "react";

export const SidebarIcon = ({ icon, className = "", tooltip }) => {
  return (
    <div className={`sidebarIcon group ${className}`}>
      {icon}
      {tooltip ? (
        <span className="sideBarTooltip group-hover:scale-100 z-10">
          {tooltip}
        </span>
      ) : null}
    </div>
  );
};
