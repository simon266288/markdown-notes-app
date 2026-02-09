import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Save } from 'lucide-react';
import { Note } from '../types/note';
import { MarkdownEditor } from '../components/MarkdownEditor';
import { Button } from '../components/ui/Button';

// Mock function to get note (will be replaced with real implementation)
const getNoteById = (id: string): Note | null => {
  // Temporary mock implementation
  const mockNote: Note = {
    id: id,
    title: 'Sample Note',
    content: '# Hello World\n\nStart writing your markdown here...',
    updatedAt: Date.now(),
    createdAt: Date.now(),
  };
  return mockNote;
};

export const EditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (id) {
      const note = getNoteById(id);
      if (note) {
        setTitle(note.title);
        setContent(note.content);
      }
    }
  }, [id]);

  const handleSave = () => {
    setIsSaving(true);
    // TODO: Implement actual save
    setTimeout(() => {
      setIsSaving(false);
    }, 500);
  };

  const handleDelete = () => {
    if (window.confirm('确定要删除这个笔记吗？')) {
      // TODO: Implement actual delete
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      {/* Header */}
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
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isDark ? (
              <Save className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Save className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>
          <Button variant="ghost" size="sm" onClick={handleDelete}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Editor and Preview */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor */}
        <div className="w-1/2 h-full border-r border-gray-200 dark:border-gray-700">
          <MarkdownEditor value={content} onChange={setContent} isDark={isDark} />
        </div>

        {/* Preview */}
        <div className="w-1/2 h-full overflow-auto p-4 bg-white dark:bg-gray-900">
          <div className="prose dark:prose-invert max-w-none">
            <pre className="whitespace-pre-wrap">{content}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};
