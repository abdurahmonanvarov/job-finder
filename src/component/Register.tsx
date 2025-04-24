import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";

interface RegisterForm {
  id: number | string;
  first_name: string;
  last_name: string;
  username: string;
  phone: string;
  email: string;
  position: string;
  age: string | number;
}

export default function Register() {
  const [form, setForm] = useState<RegisterForm>({
    id: uuidv4(),
    first_name: "",
    last_name: "",
    username: "",
    phone: "",
    email: "",
    position: "",
    age: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User Registered:", form);
    // Bu yerda API chaqiruvi yoki boshqa logika bo'lishi mumkin
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8">
      <Card className="w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
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
                <Label className="mb-2" htmlFor={field.name}>
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

            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
