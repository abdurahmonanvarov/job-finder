import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useState } from "react";

function FillJob() {
  const [loading, setLoading] = useState(false);

  const handleRequest = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Muvaffaqiyatli qo'shildi ✅");
    }, 2000);
  };

  return (
    <div>
      <Button
        className="w-full cursor-pointer"
        onClick={handleRequest}
        disabled={loading}
      >
        {loading ? "Loading..." : "Send request for job owner email"}
      </Button>
    </div>
  );
}

export default FillJob;
