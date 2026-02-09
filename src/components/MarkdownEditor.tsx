import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { oneDark } from '@codemirror/theme-one-dark';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  isDark?: boolean;
}

export const MarkdownEditor: React.FC<EditorProps> = ({ value, onChange, isDark = false }) => {
  const theme = isDark ? oneDark : [];

  return (
    <div className="h-full text-base">
      <CodeMirror
        value={value}
        height="100%"
        theme={theme}
        extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}
        onChange={onChange}
        className="h-full"
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightSpecialChars: true,
          foldGutter: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: true,
          crosshairCursor: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          closeBracketsKeymap: true,
          defaultKeymap: true,
          searchKeymap: true,
          historyKeymap: true,
          foldKeymap: true,
          completionKeymap: true,
          lintKeymap: true,
        }}
      />
    </div>
  );
};
