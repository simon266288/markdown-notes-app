# Markdown 笔记应用

一个极简的 Markdown 笔记 Web 应用，支持实时预览、代码高亮和深色模式。

## ✨ 功能特点

- **📝 Markdown 编辑器** - 基于 CodeMirror 6，支持实时编辑
- **👁️ 实时预览** - 分屏显示编辑区和预览区，所见即所得
- **🌙 深色模式** - 支持浅色/深色主题切换
- **🎨 代码高亮** - 支持 JavaScript、Python、Java 等多种语言
- **💾 本地存储** - 数据保存在浏览器 LocalStorage
- **📱 响应式设计** - 桌面端左右分屏，移动端上下分屏
- **🔍 搜索功能** - 快速查找笔记

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

应用将在 http://localhost:5173 运行

### 构建生产版本

```bash
npm run build
```

## 📦 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite 5
- **样式**: Tailwind CSS v4
- **路由**: React Router v6
- **Markdown 编辑器**: CodeMirror 6
- **Markdown 渲染**: react-markdown + remark-gfm
- **代码高亮**: react-syntax-highlighter (Prism)
- **图标**: Lucide React

## 📁 项目结构

```
markdown-notes-app/
├── src/
│   ├── components/          # 组件
│   │   ├── ui/              # 基础 UI 组件
│   │   ├── MarkdownEditor.tsx    # Markdown 编辑器
│   │   ├── MarkdownPreview.tsx   # Markdown 预览
│   │   ├── NoteCard.tsx         # 笔记卡片
│   │   └── ThemeToggle.tsx      # 主题切换
│   ├── contexts/            # React Context
│   │   └── ThemeContext.tsx     # 主题状态管理
│   ├── hooks/              # 自定义 Hooks
│   │   └── useNotes.ts          # 笔记 CRUD 操作
│   ├── pages/              # 页面
│   │   ├── NotesList.tsx        # 笔记列表页
│   │   └── EditorPage.tsx       # 编辑器页
│   ├── types/              # 类型定义
│   │   └── note.ts              # 笔记类型
│   ├── utils/              # 工具函数
│   │   └── storage.ts           # LocalStorage 封装
│   ├── App.tsx             # 应用入口
│   └── index.css           # 全局样式
├── vite.config.ts          # Vite 配置
└── package.json
```

## 📖 使用说明

### 新建笔记

点击右上角「新建」按钮创建新笔记。

### 编辑笔记

点击笔记卡片进入编辑页面，可以：
- 编辑标题
- 编写 Markdown 内容
- 实时预览渲染效果

### 删除笔记

在编辑页面点击删除按钮可删除当前笔记。

### 搜索笔记

在笔记列表页使用搜索框过滤笔记。

## 🎯 Markdown 语法支持

- **GFM** (GitHub Flavored Markdown) 完整支持
- 标题（# ~ ######）
- 粗体、斜体、删除线
- 列表（有序、无序）
- 链接和图片
- 代码块（支持语法高亮）
- 表格
- 引用块
- 水平分割线

## 🤝 许可证

MIT License
