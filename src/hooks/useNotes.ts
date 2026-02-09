import { useState, useEffect, useCallback } from 'react';
import type { Note } from '../types/note';
import { loadNotes, createNote, updateNote, deleteNote } from '../utils/storage';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setNotes(loadNotes());
    setIsLoaded(true);
  }, []);

  const addNote = useCallback((title: string = '', content: string = '') => {
    const newNote = createNote(title, content);
    setNotes((prev) => [newNote, ...prev]);
    return newNote;
  }, []);

  const modifyNote = useCallback((id: string, updates: Partial<Note>) => {
    const updated = updateNote(id, updates);
    if (updated) {
      setNotes((prev) =>
        prev.map((note) => (note.id === id ? updated : note))
      );
    }
    return updated;
  }, []);

  const removeNote = useCallback((id: string) => {
    if (deleteNote(id)) {
      setNotes((prev) => prev.filter((note) => note.id !== id));
      return true;
    }
    return false;
  }, []);

  return {
    notes,
    isLoaded,
    addNote,
    modifyNote,
    removeNote,
  };
};
