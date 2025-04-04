"use client";

import { useRouter } from "next/navigation";
import { ShipporiMinchoFont } from "../font";

export const BookCard = (props: { book: any }) => {
  const { book } = props;
  const router = useRouter();

  const handleClick = () => {
    if (book.properties.読破?.status?.name != "未着手") {
      router.push(`/books/${book.id}`);
    }
  };

  const readingBadge =
    book.properties.読破?.status?.name === "未着手" ? (
      <div
        className={`${ShipporiMinchoFont.className} absolute inset-0 flex my-2 mx-3 items-center justify-center bg-blue-300 bg-opacity-70 text-black text-lg font-bold rounded`}
      >
        読書中...
      </div>
    ) : null;

  return (
    <div
      key={book.id}
      onClick={handleClick}
      className="cursor-pointer flex flex-col p-0 bg-gray-700 rounded-lg mx-auto my-4 shadow-lg transition-transform transform hover:scale-105 duration-300"
    >
      <div className="relative">
        <img
          src={book.properties.表紙.files[0]?.file.url}
          alt="Book Cover"
          width={200}
          className="rounded my-2 mx-3"
        />
        {readingBadge}
      </div>
      <div
        className={`${ShipporiMinchoFont.className} text-white mx-3 text-xl font-bold mb-2 text-center max-w-[200px]`}
      >
        {book.properties.タイトル.title[0]?.plain_text || "No Title"}
      </div>
    </div>
  );
};