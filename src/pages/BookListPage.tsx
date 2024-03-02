import { useBooks } from '@/src/BookContext';
import { Book } from '@/src/types';

function BookListPage() {
  const { books } = useBooks();
  return (
    <div className="book-list">
      <h1>Books List</h1>
      {books.map((book: Book) => (
        <div key={book.id} className="list-item">
          <a key={book.id} href={`/book/${book.id}`} className="book-item">
            {book.title}
          </a>
        </div>
      ))}
      {books.length === 0 && <p>No books to display</p>}
      <div className="add-book">
        <a className="book-item" href="/add-book">
          <span className="plus">+</span> Add Book
        </a>
      </div>
    </div>
  );
}

export default BookListPage;
