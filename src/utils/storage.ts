import type { Note } from '../types/note';

const STORAGE_KEY = 'markdown-notes-data';

export const saveNotes = (notes: Note[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error('Failed to save notes:', error);
  }
};

export const loadNotes = (): Note[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Failed to load notes:', error);
  }
  return [];
};

export const getNoteById = (id: string): Note | null => {
  const notes = loadNotes();
  return notes.find((note) => note.id === id) || null;
};

export const createNote = (title: string = '', content: string = ''): Note => {
  const now = Date.now();
  const note: Note = {
    id: crypto.randomUUID(),
    title,
    content,
    createdAt: now,
    updatedAt: now,
  };
  
  const notes = loadNotes();
  notes.unshift(note);
  saveNotes(notes);
  
  return note;
};

export const updateNote = (id: string, updates: Partial<Note>): Note | null => {
  const notes = loadNotes();
  const index = notes.findIndex((note) => note.id === id);
  
  if (index === -1) return null;
  
  const updatedNote = {
    ...notes[index],
    ...updates,
    updatedAt: Date.now(),
  };
  
  notes[index] = updatedNote;
  saveNotes(notes);
  
  return updatedNote;
};

export const deleteNote = (id: string): boolean => {
  const notes = loadNotes();
  const filtered = notes.filter((note) => note.id !== id);
  
  if (filtered.length === notes.length) return false;
  
  saveNotes(filtered);
  return true;
};
