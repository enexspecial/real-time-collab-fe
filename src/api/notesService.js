import apiClient from './config.js';

/**
 * Notes API Service
 * Handles all note-related operations
 */

export const notesService = {
  /**
   * Get all notes for the authenticated user
   * @returns {Promise<Array>} Array of notes
   */
  async getNotes() {
    try {
      const response = await apiClient.get('/notes');
      return response.data;
    } catch (error) {
      throw this.handleNotesError(error);
    }
  },

  /**
   * Get a specific note by ID
   * @param {string} noteId - Note ID
   * @returns {Promise<Object>} Note data
   */
  async getNote(noteId) {
    try {
      const response = await apiClient.get(`/notes/${noteId}`);
      return response.data;
    } catch (error) {
      throw this.handleNotesError(error);
    }
  },

  /**
   * Create a new note
   * @param {Object} noteData - Note creation data
   * @param {string} noteData.title - Note title
   * @param {string} noteData.content - Note content
   * @param {boolean} noteData.isPublic - Whether note is public
   * @returns {Promise<Object>} Created note data
   */
  async createNote(noteData) {
    try {
      const response = await apiClient.post('/notes', noteData);
      return response.data;
    } catch (error) {
      throw this.handleNotesError(error);
    }
  },

  /**
   * Update an existing note
   * @param {string} noteId - Note ID
   * @param {Object} noteData - Note update data
   * @param {string} noteData.title - Note title
   * @param {string} noteData.content - Note content
   * @param {boolean} noteData.isPublic - Whether note is public
   * @returns {Promise<Object>} Updated note data
   */
  async updateNote(noteId, noteData) {
    try {
      const response = await apiClient.put(`/notes/${noteId}`, noteData);
      return response.data;
    } catch (error) {
      throw this.handleNotesError(error);
    }
  },

  /**
   * Delete a note
   * @param {string} noteId - Note ID
   * @returns {Promise<void>}
   */
  async deleteNote(noteId) {
    try {
      await apiClient.delete(`/notes/${noteId}`);
    } catch (error) {
      throw this.handleNotesError(error);
    }
  },

  /**
   * Share a note with another user
   * @param {Object} shareData - Share data
   * @param {string} shareData.noteId - Note ID to share
   * @param {string} shareData.userId - User ID to share with
   * @param {boolean} shareData.canEdit - Whether user can edit
   * @returns {Promise<Object>} Share response
   */
  async shareNote(shareData) {
    try {
      const response = await apiClient.post('/notes/share', shareData);
      return response.data;
    } catch (error) {
      throw this.handleNotesError(error);
    }
  },

  /**
   * Get version history of a note
   * @param {string} noteId - Note ID
   * @returns {Promise<Array>} Array of note versions
   */
  async getNoteVersions(noteId) {
    try {
      const response = await apiClient.get(`/notes/${noteId}/versions`);
      return response.data;
    } catch (error) {
      throw this.handleNotesError(error);
    }
  },

  /**
   * Restore a note to a previous version
   * @param {string} noteId - Note ID
   * @param {string} versionId - Version ID to restore
   * @returns {Promise<Object>} Restored note data
   */
  async restoreNoteVersion(noteId, versionId) {
    try {
      const response = await apiClient.post(`/notes/${noteId}/versions/${versionId}/restore`);
      return response.data;
    } catch (error) {
      throw this.handleNotesError(error);
    }
  },

  /**
   * Handle notes API errors
   * @param {Error} error - Axios error
   * @returns {Error} Formatted error with user-friendly message
   */
  handleNotesError(error) {
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          return new Error(data.message || 'Invalid note data');
        case 401:
          return new Error('You must be logged in to perform this action');
        case 404:
          return new Error('Note not found');
        case 403:
          return new Error('You do not have permission to perform this action');
        default:
          return new Error(data.message || 'Failed to perform note operation');
      }
    }
    
    return new Error('Network error. Please check your connection.');
  }
}; 