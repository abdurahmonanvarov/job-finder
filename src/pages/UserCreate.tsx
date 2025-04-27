import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

interface UserForm {
  first_name: string;
  last_name: string;
  username: string;
  phone: string;
  email: string;
  position: string;
  age: number | string;
}

export default function UserCreate() {
  const [form, setForm] = useState<UserForm>({
    first_name: "",
    last_name: "",
    username: "",
    phone: "",
    email: "",
    position: "",
    age: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{9,}$/;

    if (!form.first_name.trim()) return toast.error("First Name is required!");
    if (!form.last_name.trim()) return toast.error("Last Name is required!");
    if (!form.username.trim()) return toast.error("Username is required!");
    if (!form.phone.trim() || !phoneRegex.test(form.phone))
      return toast.error("Phone number must be at least 9 digits!");
    if (!form.email.trim() || !emailRegex.test(form.email))
      return toast.error("Invalid email address!");
    if (!form.position.trim()) return toast.error("Position is required!");
    if (Number(form.age) < 18) return toast.error("Age must be at least 18!");

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post(
        "https://mustafocoder.pythonanywhere.com/api/users/",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Server javobi:", response.data);

      if (response.status === 201 || response.status === 200) {
        toast.success("User created successfully!");
        setForm({
          first_name: "",
          last_name: "",
          username: "",
          phone: "",
          email: "",
          position: "",
          age: "",
        });
      } else {
        toast.error("Failed to create user.");
      }
    } catch (error: any) {
      console.error("Xatolik:", error);
      if (error.response) {
        console.error("Server xatolik javobi:", error.response.data);
        toast.error(
          error.response.data.detail ||
            "Serverda xatolik yuz berdi, yoki unday username ishlatilgan ❌"
        );
      } else {
        toast.error("Network error!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Create User</h2>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "First Name", name: "first_name", type: "text" },
              { label: "Last Name", name: "last_name", type: "text" },
              { label: "Username", name: "username", type: "text" },
              { label: "Phone", name: "phone", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Position", name: "position", type: "text" },
              { label: "Age", name: "age", type: "number" },
            ].map((field) => (
              <div key={field.name}>
                <Label htmlFor={field.name} className="mb-2">
                  {field.label}
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={(form as any)[field.name]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Create User"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
