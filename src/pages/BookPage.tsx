import BookItem from '@components/BookItem';
import { useBooks } from '@/src/BookContext';
import { useParams } from 'react-router-dom';
import { Book } from '@/src/types';

function BookPage() {
  const { bookId } = useParams();
  const book = useBooks().books.find((book: Book) => book.id === bookId);

  if (!book) return <div>Book not found</div>;

  return (
    <div>
      <BookItem book={book} />
    </div>
  );
}

export default BookPage;
