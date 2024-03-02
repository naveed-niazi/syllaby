import { useBooks } from '@/src/BookContext';
import { Book, Section } from '@/src/types';
import BookForm from '@components/BookForm';
import BookView from './BookView';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useBookPermissions from '@hooks/useBookPermissions';

interface BookItemProps {
  book: Book;
}

function BookItem({ book }: BookItemProps) {
  const navigate = useNavigate();
  const { updateBook, deleteBook } = useBooks();
  const { isAuthor, reader } = useBookPermissions(book);

  const handleUpdate = (sections: Section[]) => {
    updateBook(book.id, { sections: sections });
  };

  const handleDelete = () => {
    deleteBook(book.id);
    navigate('/');
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
            disabled={reader}
            className="action-button"
            onClick={() => setView(!view)}
          >
            {view ? 'Edit' : 'View'}
          </button>
          <button disabled={!isAuthor} className="action-button" onClick={handleDelete}>
            Delete
          </button>
          <button className="action-button" onClick={() => navigate('/')}>
            Go back
          </button>
        </div>
      </div>
      {view || reader ? (
        book.sections.map((section) => (
          <BookView key={section.id} section={section} />
        ))
      ) : (
        <BookForm
          section={book.sections}
          handleSave={handleUpdate}
          isAuthor={isAuthor}
        />
      )}
    </div>
  );
}

export default BookItem;
