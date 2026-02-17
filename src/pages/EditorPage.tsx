import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { MarkdownEditor } from '../components/MarkdownEditor';
import { MarkdownPreview } from '../components/MarkdownPreview';
import { Button } from '../shared/ui';
import { ThemeToggle } from '../components/ThemeToggle';
import { useNoteStore, useThemeStore, useUIStore } from '../store';

export const EditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  const addNote = useNoteStore((state) => state.addNote);
  const updateNote = useNoteStore((state) => state.updateNote);
  const deleteNote = useNoteStore((state) => state.deleteNote);
  const getNoteById = useNoteStore((state) => state.getNoteById);
  const { isSaving, setSaving } = useUIStore();
  
  const existingNote = id ? getNoteById(id) : null;
  const noteId = useMemo(() => {
    if (!id) return null;
    if (existingNote) return id;
    const newNote = addNote('', '');
    return newNote.id;
  }, [id, existingNote, addNote]);
  
  const note = noteId ? getNoteById(noteId) : null;
  const [title, setTitle] = useState(note?.title ?? '');
  const [content, setContent] = useState(note?.content ?? '');

  useEffect(() => {
    if (noteId && noteId !== id) {
      navigate(`/note/${noteId}`, { replace: true });
    }
  }, [noteId, id, navigate]);

  useEffect(() => {
    if (!noteId) return;
    
    const timer = setTimeout(() => {
      if (title || content) {
        updateNote(noteId, { title, content });
        setSaving(true);
        setTimeout(() => setSaving(false), 500);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [title, content, noteId, updateNote, setSaving]);

  const handleDelete = () => {
    if (noteId && window.confirm('确定要删除这个笔记吗？')) {
      deleteNote(noteId);
      navigate('/');
    }
  };

  if (!noteId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-gray-500 dark:text-gray-400">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center gap-3 flex-1">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="无标题笔记"
            className="flex-1 text-lg font-semibold bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-sm ${isSaving ? 'text-gray-500' : 'text-green-600'}`}>
            {isSaving ? '保存中...' : '已保存'}
          </span>
          <ThemeToggle />
          <Button variant="ghost" size="sm" onClick={handleDelete}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700">
          <MarkdownEditor value={content} onChange={setContent} isDark={theme === 'dark'} />
        </div>

        <div className="w-full lg:w-1/2 h-1/2 lg:h-full overflow-auto p-4 lg:p-6 bg-white dark:bg-gray-900">
          <MarkdownPreview content={content} />
        </div>
      </div>
    </div>
  );
};
