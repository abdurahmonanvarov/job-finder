// src/services/api.ts
import axios from "axios";
interface Job {
  id: number;
  title: string;
  company: string;
  description: string;
  location: string;
  work_type: string;
  ish_vaqti: string;
  salary: string | number;
  created_at: string;
  user: number;
}

// Bazaviy instance yaratamiz
const api = axios.create({
  baseURL: "https://mustafocoder.pythonanywhere.com/api/", // kerakli bazaviy URL
});

// Mahsulotlarni olish funksiyasi
export const jobsInfo = async () => {
  const response = await api.get("/jobs/");
  return response.data;
};

// Yana boshqa endpointlar kerak bo‘lsa, ularni ham shu yerga qo‘shish mumkin

export const fetchJobsById = async (id: number): Promise<Job> => {
  const response = await api.get(`/jobs/${id}`);
  return response.data; // 👈 Faqat .data qaytaryapmiz
};

// Shu tarzda barcha API chaqiruvlarini shu faylga joylashtirasiz
