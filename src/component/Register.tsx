import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { toast } from "react-toastify";

interface RegisterForm {
  id: string | number;
  username: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const [form, setForm] = useState<RegisterForm>({
    id: uuidv4(),
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors: any = {};
    if (!form.username) errors.username = "Username is required";
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

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const registerResponse = await axios.post(
        "https://mustafocoder.pythonanywhere.com/api/register/",
        {
          id: uuidv4(),
          username: form.username,
          password: form.password,
        }
      );

      if (registerResponse.status === 201) {
        const tokenResponse = await axios.post(
          "https://mustafocoder.pythonanywhere.com/api/token/",
          {
            username: form.username,
            password: form.password,
          }
        );

        if (tokenResponse.status === 200) {
          localStorage.setItem("token", tokenResponse.data.access);
          localStorage.setItem(
            "user",
            JSON.stringify({ username: form.username })
          );
          localStorage.setItem("user_id", registerResponse.data.id || form.id);

          toast.success("Registration and login successful!");
        } else {
          toast.error("Failed to get token");
        }
      } else {
        toast.error("Failed to register user");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8">
      <Card className="w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "Username", name: "username", type: "text" },
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
                  className={`w-full p-2 border ${
                    formErrors[field.name]
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded`}
                  required
                />
                {formErrors[field.name] && (
                  <p className="text-red-500 text-sm">
                    {formErrors[field.name]}
                  </p>
                )}
              </div>
            ))}
            {loading && <p className="text-center">Registering...</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Please wait..." : "Register"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
