function BookModal({ book, onClose }) {
  if (!book) return null;

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : "https://via.placeholder.com/200x300.png?text=No+Cover";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-11/12 max-w-md relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
          ✖
        </button>

        <div className="flex flex-col items-center">
          <img
            src={coverUrl}
            alt={book.title}
            className="w-40 h-56 object-cover rounded-lg mb-4"
          />
          <h2 className="text-2xl font-bold text-center text-blue-700 dark:text-blue-400 mb-2">
            {book.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            <strong>Author:</strong>{" "}
            {book.author_name ? book.author_name[0] : "Unknown"}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            <strong>First Published:</strong>{" "}
            {book.first_publish_year || "N/A"}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-3">
            <strong>Language:</strong>{" "}
            {book.language ? book.language[0].toUpperCase() : "N/A"}
          </p>
          <a
            href={`https://openlibrary.org${book.key}`}
            target="_blank"
            rel="noreferrer"
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            🔗 View on Open Library
          </a>
        </div>
      </div>
    </div>
  );
}

export default BookModal;
