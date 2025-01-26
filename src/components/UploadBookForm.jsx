// import React, { useState } from 'react';
// import axios from 'axios';

// function UploadBookForm() {
//   const [formData, setFormData] = useState({
//     title: '',
//     author: '',
//     description: '',
//     image: null,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append('title', formData.title);
//     data.append('author', formData.author);
//     data.append('description', formData.description);
//     data.append('image', formData.image);

//     try {
//       const response = await axios.post('http://localhost:5000/api/exchange/upload', data, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       alert('Book uploaded successfully!');
//       setFormData({ title: '', author: '', description: '', image: null });
//     } catch (error) {
//       alert('Failed to upload book');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Upload a Book for Exchange</h2>
//       <input
//         type="text"
//         name="title"
//         value={formData.title}
//         onChange={handleChange}
//         placeholder="Book Title"
//         required
//       />
//       <input
//         type="text"
//         name="author"
//         value={formData.author}
//         onChange={handleChange}
//         placeholder="Author"
//         required
//       />
//       <textarea
//         name="description"
//         value={formData.description}
//         onChange={handleChange}
//         placeholder="Book Description"
//         required
//       />
//       <input type="file" onChange={handleFileChange} accept="image/*" required />
//       <button type="submit">Upload</button>
//     </form>
//   );
// }

// export default UploadBookForm;
