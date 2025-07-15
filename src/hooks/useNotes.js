import { useState, useEffect } from 'react';
import { notesService } from '../api';

export function useNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all notes
  const fetchNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await notesService.getNotes();
      setNotes(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get a single note
  const getNote = async (noteId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await notesService.getNote(noteId);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Create a new note
  const createNote = async (noteData) => {
    setLoading(true);
    setError(null);
    try {
      const newNote = await notesService.createNote(noteData);
      setNotes(prev => [...prev, newNote]);
      return newNote;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update a note
  const updateNote = async (noteId, noteData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedNote = await notesService.updateNote(noteId, noteData);
      setNotes(prev => prev.map(note => 
        note.id === noteId ? updatedNote : note
      ));
      return updatedNote;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a note
  const deleteNote = async (noteId) => {
    setLoading(true);
    setError(null);
    try {
      await notesService.deleteNote(noteId);
      setNotes(prev => prev.filter(note => note.id !== noteId));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Share a note
  const shareNote = async (shareData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await notesService.shareNote(shareData);
      // Refresh the notes to get updated sharing info
      await fetchNotes();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get note versions
  const getNoteVersions = async (noteId) => {
    setLoading(true);
    setError(null);
    try {
      const versions = await notesService.getNoteVersions(noteId);
      return versions;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Restore note version
  const restoreNoteVersion = async (noteId, versionId) => {
    setLoading(true);
    setError(null);
    try {
      const restoredNote = await notesService.restoreNoteVersion(noteId, versionId);
      setNotes(prev => prev.map(note => 
        note.id === noteId ? restoredNote : note
      ));
      return restoredNote;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  return {
    notes,
    loading,
    error,
    fetchNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote,
    shareNote,
    getNoteVersions,
    restoreNoteVersion,
    clearError
  };
} 