import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

const LandingHeader = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.API_KEY}`
  );
  const data = await res.json();
  const randomNum = Math.floor(Math.random() * 20);

  return (
    <div
      style={{
        background: `url(https://image.tmdb.org/t/p/original${data.results[randomNum].backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "contain",
        backgroundRepeat: "no-repeat",
      }}
      className={`flex flex-col gap-12 py-[100px] px-7 lg:px-20 xl:px-52`}
    >
      <div className="flex flex-col leading-none text-white">
        <h2 className="text-[3em] font-bold">Welcome.</h2>
        <h3 className="text-[2em] font-[600]">
          Millions of movies, TV shows and people to discover. Explore now.
        </h3>
      </div>
      <div>
        <Input
          classNames={{
            input: "text-[16px]",
            inputWrapper:
              "bg-white rounded-full ps-5 py-6 pe-0 overflow-hidden",
          }}
          placeholder="Search for a movie, tv show, person......"
          endContent={
            <Button
              style={{
                background:
                  "linear-gradient(to right, rgba(30, 214, 169, 1) 0%, rgba(1, 180, 228, 1) 100%)",
              }}
              className="text-white rounded-3xl py-6 px-7 text-[16px]"
            >
              Search
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default LandingHeader;
