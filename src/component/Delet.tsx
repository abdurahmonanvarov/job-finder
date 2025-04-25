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

    try {
      setLoading(true);
      await axios.delete(
        `https://mustafocoder.pythonanywhere.com/api/jobs/${deletId}/`
      );
      toast.success("Job deleted successfully.");
      navigate("/jobs"); // yoki bosh sahifaga
    } catch (error) {
      console.error("Failed to delete job:", error);
      alert("Error deleting job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        variant="destructive"
        className="w-full"
        onClick={handleDelete}
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete Job"}
      </Button>
    </div>
  );
}

export default Delet;
