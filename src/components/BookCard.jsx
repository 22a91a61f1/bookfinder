function BookCard({ book, onView }) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://via.placeholder.com/150x220.png?text=No+Cover";

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 hover:shadow-xl hover:-translate-y-1 transition transform duration-300 flex flex-col items-center">
      <img
        src={coverUrl}
        alt={book.title}
        className="w-36 h-52 object-cover rounded-md mb-3"
      />
      <h2 className="text-md font-semibold text-center line-clamp-2">
        {book.title}
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm text-center mt-1 italic">
        {book.author_name ? book.author_name[0] : "Unknown Author"}
      </p>
      <button
        onClick={() => onView(book)}
        className="mt-3 bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
      >
        View Details
      </button>
    </div>
  );
}

export default BookCard;
