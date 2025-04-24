import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="mt-32 mb-28 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white">
      <div className="max-w-2xl w-full text-center space-y-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Find Your Dream Job Today
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600">
          Browse thousands of job listings and find the perfect match for your
          skills and experience.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
          <Input
            placeholder="🔍 Search jobs..."
            className="w-full sm:w-auto flex-1 text-base py-6"
          />
          <Button className="w-full sm:w-auto px-6 py-5 bg-black hover:bg-gray-800">
            Search Jobs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
