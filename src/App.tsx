import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '@pages/LoginPage';
import BookListPage from '@pages/BookListPage';
import BookPage from '@pages/BookPage';
import PrivateRoute from './PrivateRoute';
import AddBookPage from '@pages/AddBookPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<LoginPage isNew />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<BookListPage />} />
          <Route path="/books" element={<BookListPage />} />
          <Route path="/book/:bookId" element={<BookPage />} />
          <Route path="/add-book" element={<AddBookPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
