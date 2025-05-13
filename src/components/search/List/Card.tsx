import moment from "moment";

export default function CustomCard({
  title,
  name,
  original_name,
  poster_path,
  release_date,
  first_air_date,
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
          <h2 className="text-[20px] line-clamp-1">
            {title ? title : `${name}`}
            {original_name && (
              <span className="text-gray-400 text-[18px] font-thin">{` (${original_name})`}</span>
            )}
          </h2>
          <p className="text-gray-500">
            {release_date ? (
              moment(release_date, "YYYY-M-D").format("MMMM D, YYYY")
            ) : (
              <>
                {first_air_date
                  ? moment(first_air_date, "YYYY-M-D").format("MMMM D, YYYY")
                  : null}
              </>
            )}
          </p>
        </div>
        <p className="text-[15px] text-justify line-clamp-2 leading-tight">
          {overview}
        </p>
      </div>
    </div>
  );
}
