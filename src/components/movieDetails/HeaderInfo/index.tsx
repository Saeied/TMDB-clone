import { cn, formatMinutes } from "@/lib/utils";
import { Cast, Crew, MovieProps } from "@/types";
import { Image } from "@heroui/image";
import { CircularProgress } from "@heroui/progress";
import { Chip } from "@heroui/chip";
import { FaInfoCircle } from "react-icons/fa";
import { AvatarGroup, Avatar } from "@heroui/avatar";
import { FaHeart, FaList, FaBookmark, FaPlay } from "react-icons/fa6";
import instance from "@/services/interceptor";

const icons = [<FaList />, <FaHeart />, <FaBookmark />];

export default async function HeaderInfo({
  movie,
  id,
}: {
  movie: MovieProps;
  id: string;
}) {
  const response = await instance.get(`/movie/${id}/credits`);
  const credits: { cast: Cast[]; crew: Crew[] } = await response.data;

  return (
    <div
      className="flex flex-col lg:flex-row items-center lg:items-start gap-8 px-7 py-6 lg:px-20 xl:px-52 bg-blend-hard-light bg-opacity-50"
      style={{
        backgroundColor: "rgba(122, 96, 45, 0.8)",
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "multiply",
      }}
    >
      <div className="w-full lg:w-1/4 flex justify-center">
        <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
      </div>

      <div className="text-white w-full lg:w-3/4 flex flex-col items-center lg:items-start gap-6">
        <div className="text-center sm:text-start">
          <h1 className="text-[20px] sm:text-4xl font-bold">
            {movie.title} ({movie.release_date.slice(0, 4)})
          </h1>
          <p>
            {movie.release_date} ({movie.origin_country}) •{" "}
            {movie.genres.map((genre) => `${genre.name}, `)} •{" "}
            {formatMinutes(movie.runtime)}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-5 items-center">
          <div className="flex items-center gap-1">
            <CircularProgress
              className="hover:scale-110 transition cursor-pointer"
              classNames={{
                svg: "sm:w-16 sm:h-16",
                value: "sm:text-[15px]",
              }}
              aria-label="Loading..."
              color={
                cn(
                  movie.vote_average * 10 >= 70
                    ? "success"
                    : movie.vote_average * 10 >= 30
                    ? "warning"
                    : "danger"
                ) as "success" | "warning" | "danger"
              }
              showValueLabel={true}
              size="lg"
              value={movie.vote_average * 10}
            />
            <p>
              User
              <br />
              Score
            </p>
          </div>

          <AvatarGroup className="hidden sm:flex">
            <Avatar src="/images/emojis/1f60d-f12478ffe50d98da9d6cafbf29ef1777b8d1d2bb123224c978ca9ba4e6e6159b.svg" />
            <Avatar src="/images/emojis/1f600-f53b445a86235a4ef54899ad2f1a936e3ff6d1dcdaafc9ed63d6a6070491c0a1.svg" />
            <Avatar src="/images/emojis/1f92f-a18cb233c7639241a00dd2fea97c74a12765c05a55b881653868dad147165eda.svg" />
          </AvatarGroup>

          <Chip
            className="text-white cursor-pointer hover:scale-105 transition"
            classNames={{ base: "bg-main py-5" }}
          >
            What's your{" "}
            <span className="underline decoration-[#01B4E4] decoration-2 underline-offset-4">
              Vibe
            </span>{" "}
            ? <FaInfoCircle className="inline" />
          </Chip>
        </div>

        <ul className="hidden sm:flex items-center gap-6">
          {icons.map((icon, index) => (
            <li
              key={index}
              className="bg-main p-4 rounded-full cursor-pointer hover:scale-125 transition"
            >
              {icon}
            </li>
          ))}
          <li className="hover:text-gray-400 flex items-center gap-2 cursor-pointer transition">
            <FaPlay className="" /> Play Trailer
          </li>
        </ul>

        <div className="text-center lg:text-start">
          <h3>
            <i className="text-gray-300">{movie.tagline}</i>
          </h3>
          <h3 className="text-[20px]">Overview</h3>
          <p>{movie.overview}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 justify-items-center sm:justify-items-start">
          {credits.crew
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 10)
            .map((crew) => (
              <div key={crew.id} className="my-3">
                <p>{crew.name}</p>
                <p>{crew.job}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
