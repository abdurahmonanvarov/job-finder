import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

interface DeletProps {
  deletId: number;
}

function Delet({ deletId }: DeletProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Token topilmadi. Qayta login qiling.");
      return;
    }

    try {
      setLoading(true);
      await axios.delete(
        `https://mustafocoder.pythonanywhere.com/api/jobs/${deletId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Job deleted successfully.");
      navigate("/jobs");
    } catch (error: any) {
      console.error("Failed to delete job:", error);
      if (error.response?.status === 401) {
        toast.error("Avtorizatsiya xatosi. Token noto‘g‘ri yoki eskirgan.");
      } else if (error.response?.status === 404) {
        toast.error("Job topilmadi ❌");
      } else {
        toast.error("Job o‘chirishda xatolik ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        variant="destructive"
        className="w-full cursor-pointer"
        onClick={handleDelete}
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete Job"}
      </Button>
    </div>
  );
}

export default Delet;
