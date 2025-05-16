import { Review } from "@/types";
import { Avatar, Chip } from "@heroui/react";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { IoIosStar } from "react-icons/io";

function ReviewBox({
  author_details,
  author,
  content,
  created_at,
  currentIndex,
}: Review & { currentIndex: number }) {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = paragraphRef.current;
    if (el) {
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
      const maxHeight = lineHeight * 5;
      setIsOverflowing(el.scrollHeight > maxHeight);
    }
  }, [content]);

  useEffect(() => {
    setIsExpanded(false);
  }, [currentIndex]);

  return (
    <div className="flex flex-col gap-4 p-5 rounded-lg border">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Avatar
          src={
            author_details.avatar_path
              ? `https://image.tmdb.org/t/p/w92${author_details.avatar_path}`
              : "/images/notFound/no-avatar.png"
          }
        />
        <div className="flex flex-col">
          <h4 className="text-xl font-bold">A review by {author}</h4>
          <div className="flex items-center gap-2">
            <Chip className="bg-main text-white hidden sm:flex items-center rounded-lg">
              <IoIosStar className="inline mb-1" /> {author_details.rating * 10}
              %
            </Chip>
            <p>
              Written by {author_details.name} on{" "}
              {moment(created_at, "YYYY-M-D").format("MMMM D, YYYY")}
            </p>
          </div>
        </div>
      </div>
      <div>
        <p
          ref={paragraphRef}
          className={`text-base ${
            isExpanded ? "" : "line-clamp-5"
          } transition-all duration-300`}
        >
          {content}
        </p>
        {isOverflowing && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover:underline focus:outline-none"
          >
            {isExpanded ? "Show less" : "Read the rest"}
          </button>
        )}
      </div>
    </div>
  );
}

export default ReviewBox;
