import { useBooks } from '@src/BookContext';
import { Book, Section } from '@types';
import BookForm from './BookForm';

interface BookItemProps {
  book: Book;
}

function BookItem({ book }: BookItemProps) {
  const { updateBook } = useBooks();

  const handleUpdate = (sections: Section[]) => {
    updateBook(book.id, { sections: sections });
  };
  
  return (
    <div id={book.id}>
      <h1>{book.title}</h1>
      <BookForm section={book.sections} handleSave={handleUpdate} />
    </div>
  );
}

export default BookItem;
