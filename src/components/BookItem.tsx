import { useBooks } from '@/src/BookContext';
import { Book, Section } from '@/src/types';
import BookForm from '@components/BookForm';
import BookView from './BookView';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface BookItemProps {
  book: Book;
}

function BookItem({ book }: BookItemProps) {
  const navigate = useNavigate();
  const { updateBook } = useBooks();

  const handleUpdate = (sections: Section[]) => {
    updateBook(book.id, { sections: sections });
  };

  const [view, setView] = useState(false);

  return (
    <div id={book.id}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h1>{book.title}</h1>
        </div>
        <div>
          <button
            style={{ height: '30px', marginTop: '20px' }}
            onClick={() => setView(!view)}
          >
            {view ? 'Edit' : 'View'}
          </button>
          <button
            style={{ height: '30px', marginTop: '20px' }}
            onClick={() => navigate('/')}
          >
            Go back
          </button>
        </div>
      </div>
      {view ? (
        book.sections.map((section) => (
          <BookView key={section.id} section={section} />
        ))
      ) : (
        <BookForm section={book.sections} handleSave={handleUpdate} />
      )}
    </div>
  );
}

export default BookItem;
