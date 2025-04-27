import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "react-toastify";
import { MouseEvent } from "react";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_id");

    toast.success("Successfully logged out.", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });

    navigate("/login");
  };

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      className="flex items-center gap-2 text-red-600 border-red-500 hover:bg-red-50 transition-all duration-200"
    >
      <LogOut className="w-5 h-5" />
      <span className="hidden sm:inline">Logout</span>
    </Button>
  );
};

export default LogoutButton;
