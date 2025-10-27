import { useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import BookModal from "../components/BookModal";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null); // modal state

  const handleSearch = async (query) => {
    setSearchTerm(query);
    setLoading(true);
    setBooks([]);
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
      );
      const results = response.data.docs.slice(0, 30);
      setBooks(results.length >= 3 ? results : []);
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 px-6 py-10 relative">
      {/* Title */}
      <h1 className="text-5xl font-extrabold text-center text-blue-700 dark:text-blue-400 mb-8 tracking-tight">
        📚 Book Finder
      </h1>

      {/* Dark mode toggle */}
      <button
        onClick={() => document.documentElement.classList.toggle("dark")}
        className="absolute top-6 right-6 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-3 py-1 rounded-md shadow hover:scale-105 transition"
      >
        🌓 Toggle Theme
      </button>

      {/* Search bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Loading */}
      {loading ? (
        <p className="text-center mt-8 text-gray-500 text-lg animate-pulse">
          Loading books...
        </p>
      ) : (
        <>
          {searchTerm && (
            <p className="text-center text-gray-700 dark:text-gray-300 mt-8 text-lg">
              Showing results for:{" "}
              <span className="font-semibold text-blue-700 dark:text-blue-400">
                {searchTerm}
              </span>
            </p>
          )}

          {books.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-10">
              {books.map((book) => (
                <BookCard key={book.key} book={book} onView={setSelectedBook} />
              ))}
            </div>
          ) : (
            !loading &&
            searchTerm && (
              <p className="text-center text-gray-500 mt-10 text-lg italic">
                No books found. Try another search!
              </p>
            )
          )}
        </>
      )}

      {/* Modal */}
      {selectedBook && (
        <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        title="Back to top"
      >
        ⬆️
      </button>
    </div>
  );
}

export default Home;
