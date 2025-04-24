import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

function Header() {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-primary">
          JobFinder
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "text-sm font-semibold text-black"
                : "text-sm font-medium text-muted-foreground hover:text-primary"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              isActive
                ? "text-sm font-semibold text-black"
                : "text-sm font-medium text-muted-foreground hover:text-primary"
            }
          >
            Find Jobs
          </NavLink>
          <NavLink
            to="/post-job"
            className={({ isActive }) =>
              isActive
                ? "text-sm font-semibold text-black"
                : "text-sm font-medium text-muted-foreground hover:text-primary"
            }
          >
            Post a Job
          </NavLink>
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
            <SheetContent side="left" className="w-64 p-6">
              <SheetHeader>
                <Link to="/" className="text-xl font-bold text-primary">
                  JobFinder
                </Link>
              </SheetHeader>

              <div className="mt-6 flex flex-col justify-between h-full">
                {/* Top nav links */}
                <div className="flex flex-col gap-4">
                  <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                      isActive
                        ? "font-semibold text-black"
                        : "text-muted-foreground hover:text-primary"
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/jobs"
                    className={({ isActive }) =>
                      isActive
                        ? "font-semibold text-black"
                        : "text-muted-foreground hover:text-primary"
                    }
                  >
                    Find Jobs
                  </NavLink>
                  <NavLink
                    to="/post-job"
                    className={({ isActive }) =>
                      isActive
                        ? "font-semibold text-black"
                        : "text-muted-foreground hover:text-primary"
                    }
                  >
                    Post a Job
                  </NavLink>
                </div>

                {/* Bottom auth buttons */}
                <div className="mt-10 border-t pt-6 flex flex-col gap-3">
                  <Button variant="outline" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/register">Register</Link>
                  </Button>
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
