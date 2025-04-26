import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import useTheme from "../hook/useTheme";
import LogoutButton from "./LogoutButton";

function Header() {
  const theme = useTheme();

  return (
    <header className="bg-white dark:bg-zinc-900 border-b dark:border-zinc-800 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-primary dark:text-white">
          JobFinder
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {[
            { to: "/", label: "Home", exact: true },
            { to: "/jobs", label: "Find Jobs" },
            { to: "/post-job", label: "Post a Job" },
          ].map(({ to, label, exact }) => (
            <NavLink
              key={to}
              to={to}
              end={exact}
              className={({ isActive }) =>
                isActive
                  ? "text-sm font-semibold text-black dark:text-white"
                  : "text-sm font-medium text-muted-foreground hover:text-primary dark:hover:text-white"
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex gap-3">
          <Button variant="outline" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/register">Register</Link>
          </Button>
        </div>

        {/* Mobile Burger Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-64 p-6 bg-white dark:bg-zinc-900 text-black dark:text-white"
            >
              <SheetHeader>
                <Link
                  to="/"
                  className="text-xl font-bold text-primary dark:text-white"
                >
                  JobFinder
                </Link>
              </SheetHeader>

              <div className="mt-6 flex flex-col justify-between h-full">
                {/* Top nav links */}
                <div className="flex flex-col gap-4">
                  {[
                    { to: "/", label: "Home", exact: true },
                    { to: "/jobs", label: "Find Jobs" },
                    { to: "/post-job", label: "Post a Job" },
                  ].map(({ to, label, exact }) => (
                    <NavLink
                      key={to}
                      to={to}
                      end={exact}
                      className={({ isActive }) =>
                        isActive
                          ? "font-semibold text-black dark:text-white"
                          : "text-muted-foreground hover:text-primary dark:hover:text-white"
                      }
                    >
                      {label}
                    </NavLink>
                  ))}
                </div>

                {/* Bottom auth buttons */}
                <div className="mt-10 border-t dark:border-zinc-800 pt-6 flex flex-col gap-3">
                  <Button variant="outline" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/register">Register</Link>
                  </Button>
                  <LogoutButton />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Header;
