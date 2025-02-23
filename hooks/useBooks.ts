import { useState, useEffect } from 'react';
import { Book } from '@/types';

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const savedBooks = localStorage.getItem('books');
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }
  }, []);

  const addBook = (book: Omit<Book, 'id'>) => {
    const newBook = { ...book, id: Date.now().toString() };
    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
  };

  const updateBook = (updatedBook: Book) => {
    const updatedBooks = books.map(book => 
      book.id === updatedBook.id ? updatedBook : book
    );
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
  };

  const deleteBook = (id: string) => {
    const updatedBooks = books.filter(book => book.id !== id);
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
  };

  return { books, addBook, updateBook, deleteBook };
}