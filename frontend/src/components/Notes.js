import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/notes', { params: { user_id: 1 } });
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleAddNote = async () => {
    try {
      const response = await axios.post('http://localhost:5000/notes', { user_id: 1, content: newNote });
      setNotes([...notes, response.data]);
      setNewNote("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`);
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const toggleLike = (note) => {
    const updatedNote = { ...note, is_liked: !note.is_liked };
    updateNoteStatus(updatedNote);
  };

  const toggleBookmark = (note) => {
    const updatedNote = { ...note, is_bookmarked: !note.is_bookmarked };
    updateNoteStatus(updatedNote);
  };

  const updateNoteStatus = async (note) => {
    try {
      await axios.put(`http://localhost:5000/notes/${note.id}`, note);
      setNotes(notes.map(n => n.id === note.id ? note : n));
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <div className="notes">
      <input 
        type="text"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="Write a new note..."
      />
      <button onClick={handleAddNote}>Add Note</button>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <p>{note.content}</p>
            <button onClick={() => toggleLike(note)}>{note.is_liked ? "Unlike" : "Like"}</button>
            <button onClick={() => toggleBookmark(note)}>{note.is_bookmarked ? "Unbookmark" : "Bookmark"}</button>
            <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;
