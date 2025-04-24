import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";

interface JobForm {
  id: number | string;
  title: string;
  company: string;
  description: string;
  location: string;
  time: string;
  work_type: string;
  salary: number | string;
}

export default function PostsJob() {
  const [form, setForm] = useState<JobForm>({
    id: uuidv4(),
    title: "",
    company: "",
    description: "",
    location: "",
    time: "",
    work_type: "",
    salary: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "salary" ? Number(value) : value, // salaryni son sifatida qabul qilamiz
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Job Registered:", form);
    // API chaqiruvi yoki boshqa amallarni bu yerda qo'shish mumkin
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8">
      <Card className="w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Job Information</h2>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "Title", name: "title", type: "text" },
              { label: "Company", name: "company", type: "text" },
              { label: "Description", name: "description", type: "textarea" },
              { label: "Location", name: "location", type: "text" },
              { label: "Time", name: "time", type: "datetime-local" },
              { label: "Salary", name: "salary", type: "number" },
              {
                label: "Work Type",
                name: "workType",
                type: "select",
                options: ["Full-time", "Part-time", "Olline"],
              },
            ].map((field) => (
              <div key={field.name}>
                <Label className="mb-2" htmlFor={field.name}>
                  {field.label}
                </Label>
                {field.type === "textarea" ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={form[field.name as keyof JobForm]}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                ) : field.type === "select" ? (
                  <select
                    id={field.name}
                    name={field.name}
                    value={form[field.name as keyof JobForm]}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  >
                    {field.options?.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    value={form[field.name as keyof JobForm]}
                    onChange={handleChange}
                    required
                  />
                )}
              </div>
            ))}

            <Button type="submit" className="w-full">
              Aply for Job
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
