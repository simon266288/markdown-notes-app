import { create } from 'zustand';

interface UIState {
  searchQuery: string;
  isSaving: boolean;
  setSearchQuery: (query: string) => void;
  setSaving: (saving: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  searchQuery: '',
  isSaving: false,

  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  setSaving: (saving) => {
    set({ isSaving: saving });
  },
}));
