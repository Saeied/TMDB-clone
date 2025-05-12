import instance from "@/services/interceptor";
import HeaderSearchInput from "./HeaderSearchInput";

const LandingHeader = async () => {
  const res = await instance.get(
    `https://api.themoviedb.org/3/trending/movie/day`
  );
  const data = await res.data;
  const randomNum = Math.floor(Math.random() * 19);

  return (
    <div
      style={{
        background: `url(https://image.tmdb.org/t/p/original${data.results[randomNum].backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "contain",
        backgroundRepeat: "no-repeat",
      }}
      className="flex flex-col gap-12 py-[90px] px-7 lg:px-20 xl:px-52"
    >
      <div className="flex flex-col leading-none text-white">
        <h2 className="text-[3em] font-bold">Welcome.</h2>
        <h3 className="text-[2em] font-[600]">
          Millions of movies, TV shows and people to discover. Explore now.
        </h3>
      </div>
      <HeaderSearchInput />
    </div>
  );
};

export default LandingHeader;
