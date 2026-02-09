import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Moon, Sun } from 'lucide-react';
import { Note } from '../types/note';
import { NoteCard } from '../components/NoteCard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

// Mock data for now
const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Project Ideas',
    content: 'Brainstorming for the new feature...\n\n# Hello World\n\nThis is my first note.',
    updatedAt: new Date('2023-10-26').getTime(),
    createdAt: new Date('2023-10-26').getTime(),
  },
  {
    id: '2',
    title: 'Meeting Notes',
    content: 'Discussion about the roadmap...\n\n- Item 1\n- Item 2',
    updatedAt: new Date('2023-10-25').getTime(),
    createdAt: new Date('2023-10-25').getTime(),
  },
];

export const NotesList: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [notes] = useState<Note[]>(mockNotes);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewNote = () => {
    const newId = crypto.randomUUID();
    navigate(`/note/${newId}`);
  };

  const handleNoteClick = (noteId: string) => {
    navigate(`/note/${noteId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">我的笔记</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
            <Button onClick={handleNewNote} size="sm">
              <Plus className="w-4 h-4 mr-1" />
              新建
            </Button>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="search"
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="搜索笔记..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Notes List */}
      <main className="max-w-4xl mx-auto px-4 pb-8">
        {filteredNotes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              {searchQuery ? '没有找到匹配的笔记' : '还没有笔记，点击"新建"创建一个吧'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onClick={() => handleNoteClick(note.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
