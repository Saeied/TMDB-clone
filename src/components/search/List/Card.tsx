import moment from "moment";

export default function CustomCard({
  title,
  poster_path,
  release_date,
  overview,
}) {
  return (
    <div className="flex gap-3 rounded-lg overflow-hidden max-h-[145px] pe-5 border shadow-md">
      <img
        src={
          poster_path == null
            ? "/images/notFound/download.png"
            : `https://image.tmdb.org/t/p/w92${poster_path}`
        }
      />

      <div className="flex flex-col justify-between py-4">
        <div>
          <h2 className="text-[20px]">{title}</h2>
          <p className="text-gray-500">
            {moment(release_date, "YYYY-M-D").format("MMMM D, YYYY")}
          </p>
        </div>
        <p className="text-[15px] text-justify line-clamp-2 leading-tight">
          {overview}
        </p>
      </div>
    </div>
  );
}
