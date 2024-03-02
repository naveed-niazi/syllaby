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

  const handleUpdates = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSave = (sections: Book['sections']) => {
    setBook({ ...book, sections: sections });
    if (!book.title) {
      window.alert('Please enter a title');
      return;
    }
    addBook({ ...book, id: Math.random().toString(36).substr(2, 9) });
    setBook(initialValue);
    redirect('/');
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1>Add Book</h1>
        <button className="action-button" onClick={() => redirect('/')}>
          Back
        </button>
      </div>
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
      <BookForm isNew section={book.sections} handleSave={handleSave} />
    </div>
  );
}

export default AddBookPage;
