import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useState } from "react";

function FillJob() {
  const [loading, setLoading] = useState(false);

  const handleRequest = () => {
    const token = localStorage.getItem("token"); // tokenni localStorage'dan olamiz

    if (!token) {
      toast.error("Iltimos, ro'yxatdan o'ting (register) ❌");
      return; // Token yo'q bo'lsa request yuborilmaydi
    }

    setLoading(true);

    // Token mavjud bo'lsa, request yuboriladi
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
