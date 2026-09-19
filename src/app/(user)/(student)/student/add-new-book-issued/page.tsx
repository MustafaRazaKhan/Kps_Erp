"use client";

import React, { useState } from "react";
import { FaSearch, FaBook, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const AddNewBookIssued = () => {
  const [search, setSearch] = useState("");

  // Dummy books added by Library Admin
  const books = [
    {
      id: 1,
      bookId: "BK001",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      category: "Literature",
      quantity: 5,
      available: 4,
      status: "Available",
    },
    {
      id: 2,
      bookId: "BK002",
      title: "Introduction to Physics",
      author: "H.C. Verma",
      category: "Physics",
      quantity: 10,
      available: 7,
      status: "Available",
    },
    {
      id: 3,
      bookId: "BK003",
      title: "Mathematics for Class 10",
      author: "R.D. Sharma",
      category: "Mathematics",
      quantity: 8,
      available: 0,
      status: "Issued",
    },
    {
      id: 4,
      bookId: "BK004",
      title: "Wings of Fire",
      author: "A.P.J. Abdul Kalam",
      category: "Biography",
      quantity: 6,
      available: 3,
      status: "Available",
    },
    {
      id: 5,
      bookId: "BK005",
      title: "English Grammar",
      author: "Wren & Martin",
      category: "English",
      quantity: 12,
      available: 9,
      status: "Available",
    },
    {
      id: 6,
      bookId: "BK006",
      title: "Computer Science Basics",
      author: "Sumita Arora",
      category: "Computer",
      quantity: 7,
      available: 2,
      status: "Available",
    },
  ];

  const filteredBooks = books.filter((book) => {
    const value = search.toLowerCase();

    return (
      book.title.toLowerCase().includes(value) ||
      book.author.toLowerCase().includes(value) ||
      book.bookId.toLowerCase().includes(value) ||
      book.category.toLowerCase().includes(value)
    );
  });

  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Issue Book</h1>

          <p className="text-sm text-gray-500 mt-1">
            Select a book from the library to issue it to a student.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FaBook className="text-[#ff0066]" />
          <span>{books.length} Books</span>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <div className="relative max-w-xl">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by book name, author, category or book ID..."
            className="w-full h-11 pl-11 pr-4 rounded-lg border border-gray-200 outline-none focus:border-[#ff0066] focus:ring-1 focus:ring-[#ff0066] transition"
          />
        </div>
      </div>

      {/* Book List */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-gray-800">Library Books</h2>

            <p className="text-xs text-gray-500 mt-1">
              Books added by the Library Admin
            </p>
          </div>

          <span className="text-sm text-gray-500">
            {filteredBooks.length} result
            {filteredBooks.length !== 1 && "s"}
          </span>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-xs uppercase tracking-wide text-gray-500">
                <th className="px-5 py-3">Book ID</th>
                <th className="px-5 py-3">Book</th>
                <th className="px-5 py-3">Author</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3 text-center">Quantity</th>
                <th className="px-5 py-3 text-center">Available</th>
                <th className="px-5 py-3 text-center">Status</th>
                <th className="px-5 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-50 transition">
                    <td className="px-5 py-4">
                      <span className="font-medium text-[#ff0066]">
                        {book.bookId}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-pink-50 text-[#ff0066] flex items-center justify-center">
                          <FaBook />
                        </div>

                        <div>
                          <p className="font-semibold text-gray-800">
                            {book.title}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {book.author}
                    </td>

                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 rounded-full bg-gray-100 text-xs text-gray-600">
                        {book.category}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-center text-sm text-gray-700">
                      {book.quantity}
                    </td>

                    <td className="px-5 py-4 text-center">
                      <span
                        className={`font-semibold ${
                          book.available > 0 ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {book.available}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-center">
                      {book.available > 0 ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium">
                          <FaCheckCircle />
                          Available
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-500 text-xs font-medium">
                          <FaTimesCircle />
                          Issued
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4 text-center">
                      <button
                        disabled={book.available === 0}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                          book.available > 0
                            ? "bg-[#ff0066] text-white hover:bg-pink-700"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        Issue Book
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center">
                    <FaBook className="mx-auto text-3xl text-gray-300 mb-3" />

                    <p className="font-medium text-gray-600">No books found</p>

                    <p className="text-sm text-gray-400 mt-1">
                      Try searching with another book name or author.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-gray-100">
          {filteredBooks.map((book) => (
            <div key={book.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className="h-11 w-11 rounded-lg bg-pink-50 text-[#ff0066] flex items-center justify-center shrink-0">
                  <FaBook />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800">{book.title}</h3>

                  <p className="text-sm text-gray-500">{book.author}</p>

                  <p className="text-xs text-[#ff0066] mt-1">{book.bookId}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-xs text-gray-400">Category</p>

                  <p className="text-sm font-medium text-gray-700">
                    {book.category}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-xs text-gray-400">Total</p>

                  <p className="text-sm font-semibold text-gray-700">
                    {book.quantity}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-2">
                  <p className="text-xs text-gray-400">Available</p>

                  <p
                    className={`text-sm font-semibold ${
                      book.available > 0 ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {book.available}
                  </p>
                </div>
              </div>

              <button
                disabled={book.available === 0}
                className={`w-full mt-4 py-2.5 rounded-lg text-sm font-medium transition ${
                  book.available > 0
                    ? "bg-[#ff0066] text-white hover:bg-pink-700"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {book.available > 0 ? "Issue Book" : "Not Available"}
              </button>
            </div>
          ))}

          {filteredBooks.length === 0 && (
            <div className="p-10 text-center">
              <FaBook className="mx-auto text-3xl text-gray-300 mb-3" />

              <p className="font-medium text-gray-600">No books found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddNewBookIssued;
