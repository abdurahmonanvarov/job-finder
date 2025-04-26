import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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

export default function Privacy() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://mustafocoder.pythonanywhere.com/api/users/"
        );
        setUsers(response.data);
      } catch (error) {
        toast.error("Foydalanuvchilarni olishda xatolik yuz berdi.");
        console.error("❌ Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="px-4 py-8 min-h-screen bg-gray-50 dark:bg-zinc-900 transition-colors duration-300">
      <h2 className="text-3xl font-bold text-center mb-8 text-zinc-800 dark:text-white">
        Foydalanuvchilar ro'yxati
      </h2>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <Card
              key={user.id}
              className="shadow-md rounded-2xl bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white transition-colors duration-300"
            >
              <Link to={`/users/${user.id}`}>
                <CardContent className="space-y-2 p-4">
                  <h3 className="text-xl font-semibold">
                    {user.first_name} {user.last_name}
                  </h3>
                  <p>
                    <strong>Username:</strong> {user.username}
                  </p>
                  <p>
                    <strong>Phone:</strong> {user.phone}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Lavozim:</strong> {user.position}
                  </p>
                  <p>
                    <strong>Yosh:</strong> {user.age}
                  </p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
