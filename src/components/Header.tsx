import React from "react";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-3 md:px-6 bg-gradient-to-r from-[#091557] via-[#122690] to-[#203397]">
      <div className="flex items-center space-x-2">
        <img
          src="/assets/images/logo+hamburger.png"
          alt="Uniscore Logo"
          className="h-8 md:h-10"
        />
        {/* <img
          src="/assets/images/Football-icon.svg"
          alt="Football Icon"
          className="h-6 md:h-8"
        /> */}

        <div className="flex items-center gap-3">
          <div className="h-[38px]">
            <div className="h-[38px] px-3 py-3 flex items-center gap-1 bg-gradient-to-r from-[#1553EF] via-[#0C3089] to-[#0C1A4C] rounded-full border border-[rgba(19,86,255,0.5)]">
              <img
                src="/assets/images/Football-icon.svg"
                alt="Football Icon"
                className="h-6 md:h-8"
              />
              <span className="text-white text-xs font-medium font-['Oswald'] uppercase">
                football
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        {/* Add any additional header elements here */}
      </div>
    </header>
  );
};

export default Header;
