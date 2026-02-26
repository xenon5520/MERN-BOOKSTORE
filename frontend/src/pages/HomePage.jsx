import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import api from '../lib/axios';
import BookCard from '../components/BookCard.jsx';
import BookNotFound from '../components/BookNotFound.jsx';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get('/books');
        setBooks(res.data);
      } catch (error) {
        console.error('Error fetching books', error);
        toast.error('Failed to load books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="flex justify-center py-16">
            <span className="loading loading-spinner loading-lg text-primary" />
          </div>
        )}

        {!loading && books.length === 0 && <BookNotFound />}

        {!loading && books.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <BookCard key={book._id} book={book} setBooks={setBooks} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
