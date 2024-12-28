import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-[#091557] via-[#122690] to-[#203397]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-auto py-3">
        <div className="flex items-center space-x-2 md:space-x-6">
          <img
            src="/assets/images/logo+hamburger.png"
            alt="Uniscore Logo"
            className="h-6 md:h-10 cursor-pointer"
          />

          <div className="flex items-center gap-3 cursor-pointer hover:brightness-125">
            <div className="h-[30px] md:h-[38px]">
              <div className="h-full px-3 py-3 flex items-center gap-1 bg-gradient-to-r from-[#1553EF] via-[#0C3089] to-[#0C1A4C] rounded-full border border-[rgb(20,86,255)]">
                <img
                  src="/assets/images/Football-icon.svg"
                  alt="Football Icon"
                  className="h-4 md:h-6"
                />
                <span className="text-white text-xs font-medium font-['Oswald'] uppercase">
                  football
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-1">
          <ThemeToggle />

          <div
            aria-label="Login"
            className="flex h-9 w-9 cursor-pointer items-center justify-center bg-[#07124d] rounded-full text-dark-default hover:brightness-125"
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
            >
              <path
                d="M14.649 13.125a7.71 7.71 0 0 0-3.799-3.327 4.75 4.75 0 1 0-5.7 0 7.71 7.71 0 0 0-3.799 3.327.75.75 0 1 0 1.298.75C3.782 11.917 5.782 10.75 8 10.75s4.218 1.168 5.35 3.125a.75.75 0 0 0 1.299-.75ZM4.75 6a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0Z"
                fill="#fff"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
