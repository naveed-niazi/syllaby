/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { Book } from './types';
import useCache from '@hooks/useCache';
import useAuth from '@hooks/useAuth';

type BookContextType = {
  books: Book[];
  addBook: (book: Book) => void;
  updateBook: (id: string, updatedBook: Partial<Book>) => void;
  deleteBook: (id: string) => void;
};

const BookContext = createContext<BookContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
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
  const { user } = useAuth();
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
    if (!user) return window.alert('You must be logged in to add a book');
    setBooks((prevBooks) => [...prevBooks, { ...book, authorId: user.id }]);

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
    const confirm = window.confirm(
      'Are you sure you want to delete this book?'
    );
    if (!confirm) return;
    const book = books.find((book) => book.id === id);
    if (book?.authorId !== user?.id)
      return window.alert('You can only delete books you created');
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  return (
    <BookContext.Provider value={{ books, addBook, updateBook, deleteBook }}>
      {children}
    </BookContext.Provider>
  );
};
