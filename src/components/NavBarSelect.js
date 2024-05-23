import React from "react";

export default function NavBarSide({ title, link, children, selected }) {
  return (
    <>
      {selected && (
        <div className="h-12 text-[#112536] text-xl flex items-center justify-start gap-2 pr-4 font-semibold bg-[#E9E4DE] border-8 border-[#E9E4DE] rounded-lg">
          {children}
          {title}
        </div>
      )}
      {!selected && (
        <div className="h-12 text-xl flex items-center justify-start gap-2 pr-4 font-semibold  hover:bg-[#112536] cursor-pointer  hover:border-[#112536] border-8 border-[#14293A] rounded-lg">
          {children}
          {title}
        </div>
      )}
    </>
  );
}