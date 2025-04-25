import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-toastify";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  phone: string;
  email: string;
  position: string;
  age: number;
}

const SingleUser = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://mustafocoder.pythonanywhere.com/api/users/"
        );
        const foundUser = response.data.find((u: User) => u.id === Number(id));
        if (foundUser) {
          setUser(foundUser);
        } else {
          toast.error("Foydalanuvchi topilmadi.");
        }
      } catch (error) {
        toast.error("Ma'lumotlarni olishda xatolik.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleSend = () => {
    if (!contact) {
      toast.warning("Iltimos, kontakt ma'lumotini kiriting.");
      return;
    }

    if (user) {
      toast.success(`Emailga yuborildi: ${user.username}, ${user.email}`);
      setContact("");
    }
  };

  if (loading) return <p className="text-center py-10">Yuklanmoqda...</p>;

  if (!user)
    return <p className="text-center py-10">Foydalanuvchi topilmadi.</p>;

  return (
    <div className="flex items-center justify-center mt-24 px-4 py-6">
      <Card className="w-full max-w-xl p-6 shadow-xl rounded-2xl">
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-bold text-center">
            {user.first_name} {user.last_name}
          </h2>
          <div className="space-y-1 text-base">
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Position:</strong> {user.position}
            </p>
            <p>
              <strong>Age:</strong> {user.age}
            </p>
          </div>

          <div className="space-y-2 pt-4">
            <label htmlFor="contact" className="block font-semibold">
              Contact (yuboriladigan ma'lumot):
            </label>
            <Input
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Masalan: Siz bilan bog‘lanmoqchimiz..."
            />
            <Button onClick={handleSend} className="w-full">
              Emailga yuborish
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleUser;
