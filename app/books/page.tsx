"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { BookHeader } from './Header';
import { PlayfairDisplayFont, ShipporiMinchoFont } from '../font';
import { BookCard } from './bookCard';

export default function Books() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      const res = await fetch('/api/books');
      const data = await res.json();
      const sortedBooks = (data.results || []).sort((a: any, b: any) => {
        const aWeight = a.properties.読破?.status?.name === "未着手" ? 1 : 0;
        const bWeight = b.properties.読破?.status?.name === "未着手" ? 1 : 0;
        return aWeight - bWeight;
      });
      setBooks(sortedBooks);
      setLoading(false);
    }
    fetchBooks();
  }, []);

  return (
    <div className="h-screen overflow-scroll bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <BookHeader />
      <h1 className={`${PlayfairDisplayFont.className} text-white text-4xl text-center md:text-6xl font-bold mb-8 mt-24`}>
        List of Books
      </h1>
      <p className={`${ShipporiMinchoFont.className} text-white text-xl text-center`}>
        読んだ本の概要と感想をまとめています
      </p>
      {loading ? (
        <p className="text-white text-center">Loading...</p>
      ) : (
        <div className="flex flex-wrap justify-start gap-2 px-4">
          {books.map((book) => (
            console.log(book),
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}