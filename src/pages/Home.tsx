import FeaturedJobs from "@/component/FeaturedJobs";
import Hero from "@/component/Hero";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Hero />
      <FeaturedJobs />
    </div>
  );
}

export default Home;
