import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Save } from 'lucide-react';
import { MarkdownEditor } from '../components/MarkdownEditor';
import { MarkdownPreview } from '../components/MarkdownPreview';
import { Button } from '../components/ui/Button';
import { useNotes } from '../hooks/useNotes';
import { getNoteById, createNote } from '../utils/storage';

export const EditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { modifyNote, removeNote } = useNotes();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Load note or create new one
  useEffect(() => {
    if (!id) return;
    
    let note = getNoteById(id);
    if (!note) {
      note = createNote('', '');
      navigate(`/note/${note.id}`, { replace: true });
    }
    
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [id, navigate]);

  // Auto-save with debounce
  useEffect(() => {
    if (!id) return;
    
    const timer = setTimeout(() => {
      if (title || content) {
        modifyNote(id, { title, content });
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [title, content, id, modifyNote]);

  const handleSave = () => {
    if (id) {
      modifyNote(id, { title, content });
      setIsSaving(true);
      setTimeout(() => setIsSaving(false), 500);
    }
  };

  const handleDelete = () => {
    if (id && window.confirm('确定要删除这个笔记吗？')) {
      removeNote(id);
      navigate('/');
    }
  };

  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-gray-500 dark:text-gray-400">加载中...</div>
      </div>
    );
  }

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
          <Button variant="ghost" size="sm" onClick={handleDelete}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Editor and Preview */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor */}
        <div className="w-1/2 h-full border-r border-gray-200 dark:border-gray-700">
          <MarkdownEditor value={content} onChange={setContent} isDark={true} />
        </div>

        {/* Preview */}
        <div className="w-1/2 h-full overflow-auto p-6 bg-white dark:bg-gray-900">
          <MarkdownPreview content={content} />
        </div>
      </div>
    </div>
  );
};
