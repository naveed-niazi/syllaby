import React from 'react';
import { Book } from '@/src/types';
import BookForm from '@components/BookForm';
import { useBooks } from '@/src/BookContext';
import { useNavigate } from 'react-router-dom';

const initialValue = {
  id: '',
  title: '',
  authorId: '',
  sections: [],
};

function AddBookPage() {
  const redirect = useNavigate();
  const { addBook } = useBooks();

  const [book, setBook] = React.useState<Book>(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!book.title) {
      window.alert('Please enter a title');
      return;
    }
    addBook({ ...book, id: Math.random().toString(36).substr(2, 9) });
    setBook(initialValue);
    redirect('/');
  };

  const handleUpdates = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSave = (sections: Book['sections']) => {
    setBook({ ...book, sections: sections });
  };

  return (
    <div>
      <button onClick={() => redirect('/')}>Back</button>
      <h1>Add Book</h1>
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
      <button onClick={handleSubmit}>Add Book</button>
    </div>
  );
}

export default AddBookPage;
