import { useState } from "react";
import Hero from "@/component/Hero";
import FeaturedJobs from "@/component/FeaturedJobs";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query); // Qidiruv so'zi o'zgarganda state'ni yangilaymiz
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Hero onSearch={handleSearch} />
      <FeaturedJobs searchQuery={searchQuery} />{" "}
      {/* FeaturedJobs componentga searchQuery yuboramiz */}
    </div>
  );
};

export default Home;
