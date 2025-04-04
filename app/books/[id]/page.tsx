"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BookHeader } from "../Header";
import { ShipporiMinchoFont } from "../../font";

export default function BookDetail() {
  const { id } = useParams();
  const [bookDetail, setBookDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookDetail() {
      try {
        const res = await fetch(`/api/books/${id}`);
        const data = await res.json();
        setBookDetail(data);
      } catch (error) {
        console.error("Error fetching book detail:", error);
      }
      setLoading(false);
    }
    if (id) fetchBookDetail();
  }, [id]);

  if (loading) return <p className="text-white text-center mt-8">Loading...</p>;

  return (
    console.log(bookDetail),
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
      <BookHeader />
      <div className="py-10 w-screen px-20 flex gap-20">
        <div className="w-auto text-left flex flex-col items-center">
          <h1 className={`${ShipporiMinchoFont.className} text-4xl font-bold my-4 text-center`}>
            {bookDetail.properties.タイトル.title[0]?.plain_text || "No Title"}
          </h1>
          <img
            src={bookDetail.properties.表紙.files[0]?.file.url}
            alt="Book Cover"
            width={300}
            className="rounded my-4 mx-auto z-[1]"
          />
          <div className="mx-auto">
            <p className="text-lg text-left">
              <span className="font-bold">著者:</span>{" "}
              {bookDetail.properties.著者.rich_text[0]?.text.content || "Unknown"}
            </p>
            <p className="text-lg text-left">
              <span className="font-bold">読了日:</span>{" "}
              {bookDetail.properties.読了日.date.start || "Unknown"}
            </p>
          </div>
        </div>
        {/* 本文表示 */}
        <div className="flex-1 mt-4 space-y-4 mr-5 flex flex-col">
          <p className={`${ShipporiMinchoFont.className} text-4xl font-bold mb-4 text-left`}>
            感想
          </p>
          {bookDetail.content && bookDetail.content.map((block: any) => {
            if (block.type === "paragraph") {
              return (
                <p key={block.id} className="text-base whitespace-pre-wrap">
                  {block.paragraph.rich_text.map(
                      (textItem: any, index: number) =>
                        textItem.annotations.bold ? (
                          <strong key={index}>
                            {textItem.plain_text}
                          </strong>
                        ) : (
                          <React.Fragment key={index}>
                            {textItem.plain_text}
                          </React.Fragment>
                        )
                    )}
                </p>
              );
            } else if (block.type === "text") {
              return (
                <p key={block.id} className="text-base">
                  {block.text.content}
                </p>
              );
            }
            // 他のタイプの処理を必要に応じて追加
            return null;
          })}
        </div>
      </div>
    </div>
  );
}