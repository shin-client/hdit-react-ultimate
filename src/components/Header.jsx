import { Link, NavLink } from "react-router";

const NAVLIST = [
  { link: "/", title: "Home" },
  { link: "/users", title: "Users" },
  { link: "/books", title: "Books" },
];

const Header = () => {
  return (
    <header className="sticky top-0">
      <nav className="bg-white border-gray-200 px-6 py-2.5 flex justify-between items-center max-w-screen-xl mx-auto">
        <Link to="/" className="flex justify-center items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-9"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap">
            Todo App
          </span>
        </Link>
        <div className="flex items-center order-2">
          <Link
            to="/login"
            className=" hover:bg-gray-100 transition-colors font-medium rounded-lg text-md px-4 py-2 whitespace-nowrap"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className=" hover:bg-gray-100 transition-colors font-medium rounded-lg text-md px-4 py-2"
          >
            Register
          </Link>
        </div>
        <div
          className="justify-center items-center w-full flex order-1 ml-[56px]"
          id="mobile-menu-2"
        >
          <ul className="flex font-medium space-x-8 mt-0">
            {NAVLIST.map((nav) => {
              return (
                <li key={nav.link}>
                  <NavLink
                    to={nav.link}
                    className={({ isActive }) => {
                      return `block py-2 pr-4 pl-3 rounded-lg hover:bg-gray-100 ${isActive ? "bg-gray-100" : ""}`;
                    }}
                  >
                    {nav.title}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
};
export default Header;
