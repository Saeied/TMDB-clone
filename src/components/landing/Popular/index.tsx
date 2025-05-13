import Slider from "@/components/common/Slider";
import instance from "@/services/interceptor";
import { Button } from "@heroui/button";

async function Popular() {
  const res = await instance.get("/movie/popular");
  const data = await res.data;

  return (
    <div className="flex flex-col gap-1 py-10 px-7 lg:px-20 xl:px-52">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <h2 className="text-[24px] font-[500]">What's Popular</h2>
        <Button className="bg-main text-[#1ed5a9]">click</Button>
      </div>
      <div className="relative">
        <Slider data={data} />
      </div>
    </div>
  );
}

export default Popular;
