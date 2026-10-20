import { Link, NavLink } from "react-router";
import { Menu } from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "Locations", href: "/locations" },
  { label: "Stay", href: "/stay" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/95 backdrop-blur-md">
      <nav className="navbar mx-auto max-w-7xl px-5 lg:px-10">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <button
              type="button"
              tabIndex={0}
              aria-label="Open navigation"
              className="btn btn-ghost btn-square"
            >
              <Menu size={22} />
            </button>

            <ul
              tabIndex={0}
              className="menu dropdown-content z-50 mt-3 w-52 rounded-box bg-base-100 p-3 shadow-xl"
            >
              {links.map((link) => (
                <li key={link.href}>
                  <NavLink to={link.href}>{link.label}</NavLink>
                </li>
              ))}
            </ul>
          </div>

          <Link to="/" className="flex flex-col leading-tight">
            <span className="font-display text-2xl font-semibold">A&A</span>
            <span className="text-[9px] tracking-[0.22em] uppercase">
              Garden Suites
            </span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    isActive ? "font-semibold text-primary" : ""
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end">
          <Link to="/booking" className="btn btn-primary btn-sm sm:btn-md">
            Book Your Stay
          </Link>
        </div>
      </nav>
    </header>
  );
}
