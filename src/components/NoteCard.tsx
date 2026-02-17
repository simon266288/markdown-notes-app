import React from 'react';
import type { Note } from '../shared/types';
import { Card } from '../shared/ui';

interface NoteCardProps {
  note: Note;
  onClick?: () => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onClick }) => {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getPreview = (content: string) => {
    return content.slice(0, 100).replace(/[#*`]/g, '') + (content.length > 100 ? '...' : '');
  };

  return (
    <Card onClick={onClick} className="p-4 mb-3">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
        {note.title || '无标题笔记'}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        Last modified: {formatDate(note.updatedAt)}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
        {getPreview(note.content)}
      </p>
    </Card>
  );
};
