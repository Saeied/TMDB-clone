import HeaderInfo from "@/components/movieDetails/HeaderInfo";
import MainContent from "@/components/movieDetails/MainContent";
import ShortcutBar from "@/components/movieDetails/ShortcutBar";
import instance from "@/services/interceptor";
import { Suspense } from "react";

const MovieDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const response = await instance.get(`/movie/${id}`);
  const data = await response.data;

  return (
    <div>
      <ShortcutBar />
      <Suspense fallback={<p className="text-4xl">fetching data....</p>}>
        <HeaderInfo movie={data} id={id} />
      </Suspense>
      <MainContent movie={data} />
    </div>
  );
};

export default MovieDetails;
