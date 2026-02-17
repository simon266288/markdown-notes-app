import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Note } from '../shared/types';

const STORAGE_KEY = 'markdown-notes-data';

interface NoteState {
  notes: Note[];
  isLoaded: boolean;
  addNote: (title?: string, content?: string) => Note;
  updateNote: (id: string, updates: Partial<Note>) => Note | null;
  deleteNote: (id: string) => boolean;
  getNoteById: (id: string) => Note | null;
  setLoaded: (loaded: boolean) => void;
}

export const useNoteStore = create<NoteState>()(
  persist(
    (set, get) => ({
      notes: [],
      isLoaded: false,

      addNote: (title = '', content = '') => {
        const now = Date.now();
        const newNote: Note = {
          id: crypto.randomUUID(),
          title,
          content,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({
          notes: [newNote, ...state.notes],
        }));
        return newNote;
      },

      updateNote: (id, updates) => {
        const { notes } = get();
        const index = notes.findIndex((note) => note.id === id);
        if (index === -1) return null;

        const updatedNote: Note = {
          ...notes[index],
          ...updates,
          updatedAt: Date.now(),
        };

        const newNotes = [...notes];
        newNotes[index] = updatedNote;
        set({ notes: newNotes });
        return updatedNote;
      },

      deleteNote: (id) => {
        const { notes } = get();
        const filtered = notes.filter((note) => note.id !== id);
        if (filtered.length === notes.length) return false;
        set({ notes: filtered });
        return true;
      },

      getNoteById: (id) => {
        const { notes } = get();
        return notes.find((note) => note.id === id) || null;
      },

      setLoaded: (loaded) => {
        set({ isLoaded: loaded });
      },
    }),
    {
      name: STORAGE_KEY,
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setLoaded(true);
        }
      },
    }
  )
);
