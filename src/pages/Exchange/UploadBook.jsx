import React, { useState } from 'react';
import './UploadBook.css';

function UploadBook() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    summary: '',
    condition: 'new',
    price: '',
    terms: '',
    image: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      setErrorMessage('Please upload an image.');
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append('title', formData.title);
    formDataObj.append('author', formData.author);
    formDataObj.append('summary', formData.summary);
    formDataObj.append('condition', formData.condition);
    formDataObj.append('price', formData.price);
    formDataObj.append('terms', formData.terms);
    formDataObj.append('image', formData.image);

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/exchange/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token for authorization
        },
        body: formDataObj,
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Failed to upload the book.');
      }

      const result = await response.json();
      alert('Book uploaded successfully!');
      console.log('Upload result:', result);

      setFormData({
        title: '',
        author: '',
        summary: '',
        condition: 'new',
        price: '',
        terms: '',
        image: null,
      });
    } catch (error) {
      console.error('Error during book upload:', error.message);
      setErrorMessage(`Error uploading book: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-book-form">
      <h2>Upload a Book for Exchange</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Book Title:</label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            id="author"
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="summary">Summary:</label>
          <textarea
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            rows="4"
            placeholder="Provide a brief summary of the book"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="condition">Condition:</label>
          <select
            id="condition"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            required
          >
            <option value="new">New</option>
            <option value="old">Old</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter the price"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="terms">Exchange Terms:</label>
          <textarea
            id="terms"
            name="terms"
            value={formData.terms}
            onChange={handleChange}
            rows="4"
            placeholder="Specify the exchange terms"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Image:</label>
          <input
            id="image"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Uploading...' : 'Upload Book'}
        </button>
      </form>
    </div>
  );
}

export default UploadBook;
