import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { toast } from "react-toastify";

interface JobForm {
  id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  ish_vaqti: string;
  work_type: string;
  salary: number | string;
}

export default function PostsJob() {
  const [form, setForm] = useState<JobForm>({
    id: uuidv4(),
    title: "",
    company: "",
    description: "",
    location: "",
    ish_vaqti: "",
    work_type: "",
    salary: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "salary" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      toast.error("Foydalanuvchi ID yoki token topilmadi. Qayta login qiling.");
      setLoading(false);
      return;
    }

    try {
      const jobToSend = {
        ...form,
        id: uuidv4(),
        user: Number(userId),
        created_at: new Date().toISOString(),
      };

      await axios.post(
        "https://mustafocoder.pythonanywhere.com/api/jobs/",
        jobToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Ish muvaffaqiyatli qo‘shildi ✅");

      setForm({
        id: uuidv4(),
        title: "",
        company: "",
        description: "",
        location: "",
        ish_vaqti: "",
        work_type: "",
        salary: "",
      });
    } catch (error: any) {
      console.error("Xatolik:", error);
      if (error.response?.status === 401) {
        toast.error("Avtorizatsiya xatosi ❌ Token noto‘g‘ri yoki eskirgan.");
      } else {
        toast.error("Jobni yuborishda xatolik ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8">
      <Card className="w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Job Information</h2>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "Title", name: "title", type: "text" },
              { label: "Company", name: "company", type: "text" },
              { label: "Description", name: "description", type: "textarea" },
              { label: "Location", name: "location", type: "text" },
              { label: "Ish vaqti", name: "ish_vaqti", type: "text" },
              { label: "Salary", name: "salary", type: "number" },
              {
                label: "Work Type",
                name: "work_type",
                type: "select",
                options: ["Full-time", "Part-time", "Online"],
              },
            ].map((field) => (
              <div key={field.name}>
                <Label className="mb-2" htmlFor={field.name}>
                  {field.label}
                </Label>
                {field.type === "textarea" ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={form[field.name as keyof JobForm]}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                ) : field.type === "select" ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={form[field.name as keyof JobForm]}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  >
                    <option value="">Select...</option>
                    {field.options?.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    value={form[field.name as keyof JobForm]}
                    onChange={handleChange}
                    required
                  />
                )}
              </div>
            ))}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Apply for Job"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
