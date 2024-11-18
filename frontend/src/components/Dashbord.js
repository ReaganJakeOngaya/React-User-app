import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './Dashboard.css';

function Dashboard() {
  const [user, setUser] = useState({});
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    fetchUserData();
    fetchNotes();
  }, []);

  // Fetch user data for profile
  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user', { params: { user_id: 1 } });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Fetch user's notes
  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/notes', { params: { user_id: 1 } });
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Add a new note
  const handleAddNote = async () => {
    if (!newNote.trim()) return; // Avoid adding empty notes

    try {
      const response = await axios.post('http://localhost:5000/notes', { user_id: 1, content: newNote });
      setNotes([...notes, response.data]);
      setNewNote("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Delete a note
  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`);
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="dashboard">
      <Navbar />
      <div className="container">
        {/* Profile Section */}
        <section className="profile">
          <h2>Profile</h2>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>First Name:</strong> {user.first_name}</p>
          <p><strong>Last Name:</strong> {user.last_name}</p>
        </section>

        {/* Notes Section */}
        <section className="notes">
          <h2>Your Notes</h2>
          <div className="add-note">
            <input 
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Write a new note..."
            />
            <button onClick={handleAddNote}>Add Note</button>
          </div>
          <ul>
            {notes.map(note => (
              <li key={note.id} className="note-item">
                <p>{note.content}</p>
                <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;

