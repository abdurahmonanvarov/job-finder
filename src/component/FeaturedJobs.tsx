import { useState, useEffect } from "react";
import { jobsInfo } from "@/services/api";
import { Link } from "react-router-dom";

interface Job {
  id: number | string;
  title: string;
  company: string;
  location: string;
  work_type: string;
  time: string;
  salary: string | number;
  status: string;
}

interface FeaturedJobsProps {
  searchQuery: string;
}

const FeaturedJobs = ({ searchQuery }: FeaturedJobsProps) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const data = await jobsInfo();
        const filteredJobs = data.filter((job: Job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setJobs(filteredJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchJobs();
    } else {
      setJobs([]);
      setLoading(false);
    }
  }, [searchQuery]);

  if (loading)
    return <p className="text-center py-10 dark:text-white">Loading jobs...</p>;

  if (jobs.length === 0)
    return (
      <p className="text-center py-10 dark:text-white">
        No jobs found matching your search.
      </p>
    );

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10 bg-white dark:bg-zinc-900 min-h-screen transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Featured Jobs
      </h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <Link
            to={`/jobs/${job.id}`}
            key={job.id}
            className="border border-gray-200 dark:border-zinc-700 flex flex-col gap-2 rounded-lg p-5 bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md dark:hover:shadow-lg transition duration-300 ease-in-out"
          >
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
              {job.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{job.company}</p>
            <p className="text-gray-600 dark:text-gray-400">
              Location: {job.location}
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Work Type: {job.work_type}
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Cost: {job.salary}
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Posted {job.time}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedJobs;
