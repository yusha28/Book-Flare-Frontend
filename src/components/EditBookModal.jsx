import React, { useState } from 'react';
import './EditBookModal.css';

function EditBookModal({ book, onClose, onUpdate }) {
  const [formData, setFormData] = useState(book);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/exchange/edit/${formData._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update book');
      }

      const updatedBook = await response.json();
      onUpdate(updatedBook.book); // Update the book list in parent component
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error updating book:', error.message);
      alert('Failed to update book');
    }
  };

  return (
    <div className="edit-book-modal">
      <div className="modal-content">
        <h2>Edit Book</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author"
            required
          />
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            placeholder="Summary"
            rows="4"
            required
          ></textarea>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            required
          >
            <option value="new">New</option>
            <option value="old">Old</option>
          </select>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
          <textarea
            name="terms"
            value={formData.terms}
            onChange={handleChange}
            placeholder="Terms"
            rows="4"
            required
          ></textarea>
          <button type="submit">Update</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditBookModal;
