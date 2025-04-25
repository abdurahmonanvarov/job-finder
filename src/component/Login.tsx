import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";

type LoginData = {
  username: string;
  password: string;
};

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit = async (data: LoginData) => {
    // 1. localStorage'dagi userni olib tekshiramiz
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      alert("Foydalanuvchi topilmadi. Iltimos, ro'yxatdan o'ting.");
      return;
    }

    const parsedUser = JSON.parse(storedUser);

    if (
      data.username !== parsedUser.username ||
      data.password !== parsedUser.password
    ) {
      alert("Login yoki parol noto'g'ri!");
      return;
    }

    try {
      // 2. refresh_token orqali access_token yangilaymiz
      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        alert("Refresh token topilmadi. Iltimos, qayta ro'yxatdan o'ting.");
        return;
      }

      const response = await axios.post(
        "https://mustafocoder.pythonanywhere.com/api/token/refresh/",
        { refresh: refreshToken }
      );

      const { access } = response.data;

      // 3. access tokenni yangilab localStorage ga yozamiz
      localStorage.setItem("token", access);

      console.log("Token muvaffaqiyatli yangilandi:", access);
      alert("Login muvaffaqiyatli!");

      // Masalan, sahifani o'zgartirish:
      // navigate("/dashboard");
    } catch (error: any) {
      console.error(
        "Token yangilashda xatolik:",
        error.response?.data || error.message
      );
      alert("Tokenni yangilab bo'lmadi. Iltimos, qayta login qiling.");
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
