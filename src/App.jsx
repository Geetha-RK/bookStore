import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";
import './Header.scss';
import './Books.scss';

import './App.scss';

function App() {
  const [books, setBooks] = useState([]);  
  const [error, setError] = useState(null);

  const bookDetails = async() => {
    try{
    const response  = await axios.get('http://localhost:8080/books');
    console.log(response);
    setBooks(response.data); 
    return response;
    }catch (err) {
      console.error("Error fetching books: ", err);
      setError('Failed to fetch books.');  
    }
  }
  useEffect(()=>{
    bookDetails();
  },[]);
  return (
    <>
  <div className="App">
        <header className="header">
          {/* Logo Section */}
          <div className="logo">
            <img src="https://via.placeholder.com/150" alt="Book Store Logo" />
            <h1>Book Store</h1>
          </div>

          {/* Search Bar */}
          <div className="search-bar">
            <input type="text" placeholder="Search for books..." />
            <button type="submit">Search</button>
          </div>

          {/* Upload Button */}
          <div className="upload-button">
            <button>Upload New Book</button>
          </div>
        </header>

        <h1>Book List</h1>
        {error && <p>{error}</p>}

        <div className="card-container">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <h2>{book.title}</h2>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Price:</strong> ${book.price}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App
