/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { Book } from '../types';
import useCache from '@hooks/useCache';

type BookContextType = {
  books: Book[];
  addBook: (book: Book) => void;
  updateBook: (id: string, updatedBook: Partial<Book>) => void;
  deleteBook: (id: string) => void;
};

const BookContext = createContext<BookContextType | undefined>(undefined);

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};

export const BookProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { save, load } = useCache();
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const books = load<Book[]>('books');
    books && setBooks(books);
    () => save('books', books);
  }, []);

  useEffect(() => {
    books &&
      books.length > 0 &&
      save(
        'books',
        books.filter((book) => book)
      );
  }, [books]);

  const addBook = (book: Book) => {
    setBooks((prevBooks) => [...prevBooks, book]);
    window.alert('Book added successfully');
  };

  const updateBook = (id: string, updatedBook: Partial<Book>) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, ...updatedBook } : book
      )
    );
    window.alert('Book Updated successfully');
  };

  const deleteBook = (id: string) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  return (
    <BookContext.Provider value={{ books, addBook, updateBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  );
};
