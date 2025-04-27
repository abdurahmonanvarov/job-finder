import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type LoginData = {
  username: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit = async (data: LoginData) => {
    try {
      // 1. Eski ma'lumotlarni tozalash
      localStorage.clear();

      // 2. Login qilish: Token olish
      const response = await axios.post(
        "https://mustafocoder.pythonanywhere.com/api/token/",
        {
          username: data.username,
          password: data.password,
        }
      );

      const { access, refresh } = response.data;

      // 3. User haqida ma'lumot olish
      const userInfo = await axios.get(
        "https://mustafocoder.pythonanywhere.com/api/get-user/",
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      const { id, username } = userInfo.data;

      // 4. LocalStorage ga saqlash
      localStorage.setItem("token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("user_id", id);
      localStorage.setItem("username", username);

      // 5. Success notification
      toast.success("Login muvaffaqiyatli bajarildi!");

      // 6. Home sahifaga redirect qilish
      navigate("/");
    } catch (error: any) {
      console.error("Login xatoligi:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.detail ||
          "Login xatolik! Username yoki parol noto'g'ri."
      );
    }
  };

  return (
    <div className="mt-12 flex items-center justify-center">
      <Card className="w-full max-w-md p-6">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4 text-center">
            Login to Your Account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label className="mb-2" htmlFor="username">
                Username
              </Label>
              <Input
                id="username"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <p className="text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <Label className="mb-2" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
