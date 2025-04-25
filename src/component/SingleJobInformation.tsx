import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MdLocationOn,
  MdWork,
  MdAttachMoney,
  MdAccessTime,
  MdFavoriteBorder,
  MdShare,
  MdEdit,
} from "react-icons/md";
import { jobsInfo } from "@/services/api";
import Delet from "./Delet";
import Edit from "./Edit";

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

function SingleJobInformation() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  useEffect(() => {
    const getJob = async () => {
      try {
        const allJobs = await jobsInfo();
        const matchedJob = allJobs.find((item: Job) => item.id === Number(id));
        setJob(matchedJob || null);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    getJob();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center py-10">
        <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></span>
      </div>
    );

  if (!job)
    return <p className="text-center text-red-500 py-10">Job not found.</p>;

  const handleOpenEdit = () => {
    setOpenEdit(true); // Modalni ochish
  };

  const handleCloseEdit = () => {
    setOpenEdit(false); // Modalni yopish
  };

  return (
    <Card className="rounded-2xl shadow-md p-6">
      <CardContent className="space-y-6 p-0">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">{job.title}</h2>
            <Badge className="mt-1 bg-green-100 text-green-700">Active</Badge>
          </div>
          <div className="flex gap-3 text-xl text-gray-500">
            <div className="">
              {/* Edit Icon and Open Modal */}
              <MdEdit
                className="hover:text-yellow-500 cursor-pointer"
                title="Edit"
                onClick={handleOpenEdit}
              />

              {/* Edit Modal Component */}
              <Edit
                open={openEdit} // Modalning ochilish holati
                setClose={handleCloseEdit} // Modalni yopish uchun funksiya
                editId={job.id} // Tahrirlanadigan job ID
              />
            </div>
            <MdFavoriteBorder
              className="hover:text-pink-500 cursor-pointer"
              title="Like"
            />
            <MdShare
              className="hover:text-blue-500 cursor-pointer"
              title="Share"
            />
          </div>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="font-medium text-black">{job.company}</span>
          </div>
          <div className="flex items-center gap-2">
            <MdLocationOn className="text-lg" />
            {job.location}
          </div>
          <div className="flex items-center gap-2">
            <MdWork className="text-lg" />
            {job.work_type}
          </div>
          <div className="flex items-center gap-2">
            <MdAccessTime className="text-lg" />
            Ish vaqti: {job.ish_vaqti}
          </div>
          <div className="flex items-center gap-2">
            <MdAttachMoney className="text-lg" />${job.salary}
          </div>
          <div className="flex items-center gap-2">
            <MdAccessTime className="text-lg" />
            Posted: {new Date(job.created_at).toLocaleDateString()}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-base mb-1">Job Description</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* Delete Button */}
        <div className="pt-4">
          <Delet deletId={job.id} />
        </div>
      </CardContent>
    </Card>
  );
}

export default SingleJobInformation;
