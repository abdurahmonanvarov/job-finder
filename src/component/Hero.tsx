import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Hero = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedQuery) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  return (
    <section className="mt-32 mb-28 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white dark:from-zinc-900">
      <div className="max-w-2xl w-full text-center space-y-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-black dark:text-white">
          Find Your Dream Job Today
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-zinc-300">
          Browse thousands of job listings and find the perfect match for your
          skills and experience.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
          <Input
            placeholder="🔍 Search jobs..."
            className="w-full sm:w-auto flex-1 text-base py-6 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            className="w-full sm:w-auto px-6 py-5 bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-zinc-300"
            onClick={() => onSearch(searchQuery)}
          >
            Search Jobs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
