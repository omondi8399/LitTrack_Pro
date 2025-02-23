"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Book } from "@/types";
import BookCard from "./BookCard";
import { useState } from "react";
import EditBookModal from "./EditBookModal";

interface Props {
  books: Book[];
  setBooks: (books: Book[]) => void;
  onDelete: (id: string) => void;

}

export default function BookList({ books, setBooks, onDelete }: Props) {
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const handleEdit = (updatedBook: Book) => {
    setBooks(books.map(book => book.id === updatedBook.id ? updatedBook : book));
    setEditingBook(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
          {books.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <BookCard
                book={book}
                onEdit={() => setEditingBook(book)}
                onDelete={() => onDelete(book.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        
        {books.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-12 px-4">
            <div className="text-center">
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No books added</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by adding your first book.</p>
            </div>
          </div>
        )}
      </div>

      <EditBookModal
        book={editingBook}
        isOpen={!!editingBook}
        onClose={() => setEditingBook(null)}
        onEdit={handleEdit}
      />
    </>
  );
}