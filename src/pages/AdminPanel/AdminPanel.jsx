import React, { useState } from 'react';

function AdminPanel() {
  const [newAudiobook, setNewAudiobook] = useState({
    title: '',
    author: '',
    price: '',
    image: null,
  });
  const [chapters, setChapters] = useState([{ title: '', audioFile: null }]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', newAudiobook.title);
    formData.append('author', newAudiobook.author);
    formData.append('price', newAudiobook.price);
    formData.append('image', newAudiobook.image);

    // Add chapters to FormData
    chapters.forEach((chapter, index) => {
      formData.append(`chapters[${index}][title]`, chapter.title);
      formData.append(`chapters[${index}][audioFile]`, chapter.audioFile);
    });

    try {
      const response = await fetch('http://localhost:5000/api/audiobooks', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Audiobook added successfully!');
        resetForm();
      } else {
        console.error('Failed to add audiobook');
      }
    } catch (error) {
      console.error('Error adding audiobook:', error);
      alert('An error occurred while adding the audiobook.');
    }
  };

  const handleFileChange = (e) => {
    setNewAudiobook((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const resetForm = () => {
    setNewAudiobook({
      title: '',
      author: '',
      price: '',
      image: null,
    });
    setChapters([{ title: '', audioFile: null }]);
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newAudiobook.title}
          onChange={(e) => setNewAudiobook({ ...newAudiobook, title: e.target.value })}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={newAudiobook.author}
          onChange={(e) => setNewAudiobook({ ...newAudiobook, author: e.target.value })}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newAudiobook.price}
          onChange={(e) => setNewAudiobook({ ...newAudiobook, price: e.target.value })}
          required
        />
        <input type="file" name="image" onChange={handleFileChange} required />

        <button type="submit">Add Audiobook</button>
      </form>
    </div>
  );
}

export default AdminPanel;
