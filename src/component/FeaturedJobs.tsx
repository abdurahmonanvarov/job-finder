import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, Clock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Link } from "react-router-dom";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "New York, NY",
    type: "Full-time",
    posted: "2 days ago",
    status: "Open",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "DataSystems",
    location: "Remote",
    type: "Full-time",
    posted: "1 week ago",
    status: "Urgent",
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "CreativeMinds",
    location: "San Francisco, CA",
    type: "Full-time",
    posted: "3 days ago",
    status: "Open",
  },
];

const FeaturedJobs = () => {
  const [filter, setFilter] = useState("all");

  const filteredJobs = jobs.filter((job) => {
    if (filter === "all") return true;
    if (filter === "exist") return job.status === "Open";
    if (filter === "unexist") return job.status !== "Open";
    return true;
  });

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold">Featured Jobs</h2>
          <p className="text-gray-500">Explore our latest job opportunities</p>
        </div>

        {/* Select variant for filtering */}
        <Select onValueChange={(value) => setFilter(value)} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="View All Jobs" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">View All Jobs</SelectItem>
            <SelectItem value="exist">Exist</SelectItem>
            <SelectItem value="unexist">Unexist</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="border rounded-lg p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="font-semibold text-lg">{job.title}</h3>
                <p className="text-gray-500">{job.company}</p>
              </div>
              <Badge
                variant="outline"
                className={`${
                  job.status === "Open"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {job.status}
              </Badge>
            </div>

            <div className="mt-4 space-y-2 text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {job.location}
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                {job.type}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Posted {job.posted}
              </div>
            </div>

            <div className="mt-4">
              <Link
                to={`/jobs/${job.id}`}
                className="p-0 h-auto text-sm font-semibold text-blue-500 hover:text-blue-700"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedJobs;
