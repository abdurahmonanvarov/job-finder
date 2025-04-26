import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-toastify";
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
    const phoneRegex = /^[0-9]{9,}$/; // kamida 9 ta raqam

    if (!form.first_name.trim()) {
      toast.error("First Name is required!");
      return false;
    }
    if (!form.last_name.trim()) {
      toast.error("Last Name is required!");
      return false;
    }
    if (!form.username.trim()) {
      toast.error("Username is required!");
      return false;
    }
    if (!form.phone.trim() || !phoneRegex.test(form.phone)) {
      toast.error("Phone number must be at least 9 digits!");
      return false;
    }
    if (!form.email.trim() || !emailRegex.test(form.email)) {
      toast.error("Invalid email address!");
      return false;
    }
    if (!form.position.trim()) {
      toast.error("Position is required!");
      return false;
    }
    if (Number(form.age) < 18) {
      toast.error("Age must be at least 18!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://mustafocoder.pythonanywhere.com/api/users/",
        form
      );

      if (response.status === 201) {
        toast.success("User created successfully!");
        console.log("✅ User created:", response.data);
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
        console.error("❌ Error:", response);
      }
    } catch (error: any) {
      if (error.response) {
        toast.error(`Error: ${error.response.data.message || "Unknown error"}`);
      } else {
        toast.error("Network error!");
      }
      console.error("❌ Exception:", error);
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
