import HeaderInfo from "@/components/movieDetails/HeaderInfo";
import MainContent from "@/components/movieDetails/MainContent";
import instance from "@/services/interceptor";
import { Spinner } from "@heroui/spinner";
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
    <>
      <Suspense
        fallback={
          <div className="my-20 text-center">
            <Spinner variant="wave" />
          </div>
        }
      >
        <HeaderInfo movie={data} id={id} />
      </Suspense>
      <MainContent movie={data} />
    </>
  );
};

export default MovieDetails;
