import React from 'react';
import { Book } from '@types';
import BookForm from '@components/BookForm';
import { useBooks } from '@src/BookContext';

const initialValue = {
  title: '',
  authorId: '',
  sections: [],
};

function AddBookPage() {
  const { addBook } = useBooks();

  const [book, setBook] = React.useState<Partial<Book>>(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!book.title) return;
    book.id = Math.random().toString(36).substr(2, 9);
    addBook(book);
    setBook(initialValue);
  };

  const handleUpdates = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSave = (sections: Book['sections']) => {
    setBook({ ...book, sections: sections });
  };

  return (
    <div>
      <h1>Add Book</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            required
            type="text"
            id="title"
            name="title"
            value={book.title}
            onChange={handleUpdates}
          />
        </div>
        <BookForm section={book.sections} handleSave={handleSave} />
      </form>
    </div>
  );
}

export default AddBookPage;
