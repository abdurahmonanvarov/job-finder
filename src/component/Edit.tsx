import { useState, useEffect } from "react";
import { jobsInfo } from "@/services/api";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

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

interface EditProps {
  open: boolean;
  setClose: () => void;
  editId: number;
}

function Edit({ editId, open, setClose }: EditProps) {
  const [formData, setFormData] = useState<Job>({
    id: 0,
    title: "",
    company: "",
    description: "",
    location: "",
    work_type: "",
    ish_vaqti: "",
    salary: "",
    created_at: "",
    user: 0,
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const allJobs = await jobsInfo();
        const matchedJob = allJobs.find((item: Job) => item.id === editId);
        if (matchedJob) {
          setFormData(matchedJob);
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    fetchJob();
  }, [editId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token topilmadi!");
      toast.warning("Token topilmadi. Iltimos, login yoki register qiling.");
      return;
    }

    try {
      const response = await axios.put(
        `https://mustafocoder.pythonanywhere.com/api/jobs/${formData.id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Job updated successfully:", response.data);
        setClose();
      } else {
        console.error("Failed to update job:", response.status);
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        alert(
          "Token noto‘g‘ri yoki muddati tugagan. Iltimos, qayta login qiling."
        );
      } else {
        console.error("Error updating job:", error);
      }
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl text-black dark:text-white p-6 w-full max-w-md shadow-xl">
        <h2 className="text-lg font-semibold mb-4 text-center">Edit Job</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="description">Job Description</Label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="work_type">Work Type</Label>
            <Input
              id="work_type"
              name="work_type"
              value={formData.work_type}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="salary">Salary</Label>
            <Input
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex justify-between gap-4 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={setClose}
              className="w-1/2"
            >
              Cancel
            </Button>
            <Button type="submit" className="w-1/2">
              Update Job
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;
