"use client";

import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import BookList from "@/components/BookList";
import AddBookModal from "@/components/AddBookModal";
import SearchAndFilter from "@/components/SearchAndFilter";
import { useBooks } from "@/hooks/useBooks";

export default function BookPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const { books, addBook, updateBook, deleteBook } = useBooks();

  const genres = useMemo(() => {
    return Array.from(new Set(books.map(book => book.genre)));
  }, [books]);

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = 
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase()) ||
        book.description.toLowerCase().includes(search.toLowerCase());
      
      const matchesGenre = !selectedGenre || book.genre === selectedGenre;
      
      return matchesSearch && matchesGenre;
    });
  }, [books, search, selectedGenre]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-xl text-gray-600 dark:text-gray-400">
            Welcome to
          </h1>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
            Your Personal Library
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          <span>Add Book</span>
        </button>
      </div>

      <SearchAndFilter
        search={search}
        setSearch={setSearch}
        genre={selectedGenre}
        setGenre={setSelectedGenre}
        genres={genres}
      />
      
      <BookList 
        books={filteredBooks}
        setBooks={(updatedBooks) => {
          const updatedBook = updatedBooks.find(
            (book, index) => book !== books[index]
          );
          if (updatedBook) {
            updateBook(updatedBook);
          }
        }}
        onDelete={deleteBook}
      />
      
      <AddBookModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onAdd={addBook}
      />
    </div>
  );
}