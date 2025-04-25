import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";
import axios from "axios"; // axios kutubxonasini import qilish
import { toast } from "react-toastify"; // Toast bildirishnomasi kutubxonasi

interface RegisterForm {
  id: number | string;
  first_name: string;
  last_name: string;
  username: string;
  phone: string;
  email: string;
  position: string;
  age: string | number;
  password: string;
  confirmPassword: string;
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
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [formErrors, setFormErrors] = useState<any>({}); // Input xatoliklarini saqlash

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const validateForm = () => {
    const errors: any = {};
    if (!form.first_name) errors.first_name = "First name is required";
    if (!form.last_name) errors.last_name = "Last name is required";
    if (!form.username) errors.username = "Username is required";
    if (!form.phone) errors.phone = "Phone is required";
    if (!form.email) errors.email = "Email is required";
    if (!form.position) errors.position = "Position is required";
    if (!form.age) errors.age = "Age is required";
    if (!form.password) errors.password = "Password is required";
    if (!form.confirmPassword)
      errors.confirmPassword = "Confirm password is required";
    if (form.password !== form.confirmPassword)
      errors.confirmPassword = "Passwords do not match";

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setFormErrors({});
    setLoading(true);
    setError("");
    setSuccess("");

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setLoading(false);
      return;
    }

    try {
      // 1. Register
      const registerResponse = await axios.post(
        "https://mustafocoder.pythonanywhere.com/api/register/",
        {
          id: uuidv4(),
          username: form.username,
          password: form.password,
          first_name: form.first_name,
          last_name: form.last_name,
          phone: form.phone,
          email: form.email,
          position: form.position,
          age: form.age,
        }
      );

      if (registerResponse.status === 201) {
        const userId = registerResponse.data.id || form.id; // backenddan qaytgan user ID

        // Token olish
        const tokenResponse = await axios.post(
          "https://mustafocoder.pythonanywhere.com/api/token/",
          {
            username: form.username,
            password: form.password,
          }
        );

        if (tokenResponse.status === 200) {
          const accessToken = tokenResponse.data.access;

          // LocalStorage ga saqlaymiz
          localStorage.setItem("token", accessToken);
          localStorage.setItem(
            "user",
            JSON.stringify({ username: form.username })
          );
          localStorage.setItem("user_id", userId); // <-- user_id ni alohida saqlaymiz ✅

          toast.success("Ma'lumot muvaffaqiyatli saqlandi!");
          setSuccess("Registration and login successful!");
        } else {
          setError("Token olishda xatolik.");
          toast.error("Token olishda muammo");
        }
      } else {
        setError("Ro'yxatdan o'tishda muammo");
        toast.error("Ro'yxatdan o'tishda xatolik");
      }
    } catch (err: any) {
      console.error("❌ Error:", err.response?.data || err.message);
      setError("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
      toast.error("Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8">
      <Card className="w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              // Form field array with validation
              { label: "First Name", name: "first_name", type: "text" },
              { label: "Last Name", name: "last_name", type: "text" },
              { label: "Username", name: "username", type: "text" },
              { label: "Phone", name: "phone", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Position", name: "position", type: "text" },
              { label: "Age", name: "age", type: "number" },
              { label: "Password", name: "password", type: "password" },
              {
                label: "Confirm Password",
                name: "confirmPassword",
                type: "password",
              },
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
                  className={`w-full p-2 border rounded ${
                    formErrors[field.name]
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {formErrors[field.name] && (
                  <p className="text-red-500 text-sm">
                    {formErrors[field.name]}
                  </p>
                )}
              </div>
            ))}
            {loading && <p className="text-center">Registering...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-500 text-center">{success}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
