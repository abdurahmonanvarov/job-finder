import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
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
      const registerResponse = await axiosInstance.post("/api/register/", {
        id: uuidv4(),
        username: form.username,
        password: form.password,
      });

      if (registerResponse.status === 201) {
        toast.success("User registered successfully!");

        const tokenResponse = await axiosInstance.post("/api/token/", {
          username: form.username,
          password: form.password,
        });

        if (tokenResponse.status === 200) {
          const { access, refresh } = tokenResponse.data;

          localStorage.setItem("token", access);
          localStorage.setItem("refresh_token", refresh);
          localStorage.setItem(
            "user",
            JSON.stringify({ username: form.username })
          );
          localStorage.setItem("user_id", registerResponse.data.id || form.id);

          toast.success("Login successful!");

          navigate("/");
        } else {
          toast.error("Failed to get authentication token.");
        }
      } else {
        toast.error("Failed to register user.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8 bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md p-6 shadow-lg bg-white dark:bg-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
          Create an Account
        </h2>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
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
                <Label
                  className="block mb-1 text-sm font-semibold text-gray-700 dark:text-gray-300"
                  htmlFor={field.name}
                >
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
                      : "border-gray-300 dark:border-gray-600"
                  } rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
                  required
                />
                {formErrors[field.name] && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors[field.name]}
                  </p>
                )}
              </div>
            ))}

            {loading && (
              <p className="text-center text-gray-500 dark:text-gray-400">
                Processing...
              </p>
            )}

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-300"
              disabled={loading}
            >
              {loading ? "Please wait..." : "Register"}
            </Button>

            <p className="text-center text-sm mt-4 text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Login
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
