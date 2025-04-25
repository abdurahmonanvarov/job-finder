import { useState, useEffect } from "react";
import { jobsInfo } from "@/services/api"; // API'dan ishlar olish
import { Link } from "react-router-dom";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  work_type: string;
  time: string;
  salary: number | string;
  positon: string;
  status: string;
  created_at: string;
}

const JobsInformation = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await jobsInfo(); // API'dan ma'lumot olish
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs(); // Ishlarni olish
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl font-bold mb-6">Featured Jobs</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <Link
            to={`/jobs/${job.id}`}
            key={job.id}
            className="border flex flex-col gap-3 rounded-lg p-5 shadow-sm hover:shadow-md transition duration-300 ease-in-out"
          >
            <h3 className="font-semibold text-lg">{job.title}</h3>
            <p>{job.company}</p>
            <p className="text-gray-600">Location: {job.location}</p>
            <p className="text-gray-500">Work Type: {job.work_type}</p>
            <p className="text-gray-500">Cost: {job.salary}</p>
            <p className="text-sm text-gray-400">
              Posted {new Date(job.created_at).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default JobsInformation;
