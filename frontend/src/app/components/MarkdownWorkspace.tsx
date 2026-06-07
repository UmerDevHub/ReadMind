import { Sparkles, FileText, RefreshCw, Download, Copy, Eye, Code2, GitCommit, X } from 'lucide-react';
import { useState } from 'react';

interface Repository {
  name: string;
  language: string;
  languageColor: string;
}

interface MarkdownWorkspaceProps {
  selectedRepo: Repository | null;
  onBack: () => void;
}

type ViewState = 'empty' | 'generating' | 'preview' | 'commit-modal' | 'success';

export function MarkdownWorkspace({ selectedRepo, onBack }: MarkdownWorkspaceProps) {
  const [viewState, setViewState] = useState<ViewState>('empty');
  const [editMode, setEditMode] = useState(false);
  const [markdown, setMarkdown] = useState('');

  // Sample generated markdown
  const sampleMarkdown = `# Awesome React App

A modern, production-ready React application built with TypeScript and Vite.

## Features

- ⚡️ Lightning-fast development with Vite
- 🎨 Styled with Tailwind CSS
- 📦 Component-based architecture
- 🔒 Type-safe with TypeScript
- 🧪 Tested with Vitest

## Installation

\`\`\`bash
npm install
\`\`\`

## Usage

Start the development server:

\`\`\`bash
npm run dev
\`\`\`

Build for production:

\`\`\`bash
npm run build
\`\`\`

## Contributing

Pull requests are welcome! Please read our contributing guidelines first.

## License

MIT © 2026`;

  const handleGenerate = () => {
    setViewState('generating');
    setTimeout(() => {
      setMarkdown(sampleMarkdown);
      setViewState('preview');
    }, 3000);
  };

  const handleCommit = () => {
    setViewState('commit-modal');
  };

  const handleConfirmCommit = () => {
    setViewState('success');
    setTimeout(() => {
      setViewState('empty');
      onBack();
    }, 4000);
  };

  // Empty State
  if (viewState === 'empty' && !selectedRepo) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center max-w-md px-6">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <FileText className="w-10 h-10 text-blue-600" />
            <Sparkles className="w-6 h-6 text-purple-600 absolute translate-x-6 -translate-y-6" />
          </div>
          <h2 className="mb-3">Select a repository to generate README</h2>
          <p className="text-muted-foreground mb-6">
            Our AI analyzes your code structure, dependencies, and commits to create comprehensive documentation
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm">
              ✨ Auto-detects tech stack
            </span>
            <span className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm">
              📝 Generates setup instructions
            </span>
            <span className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm">
              🚀 Includes badges & shields
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Generating State
  if (viewState === 'generating') {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center max-w-md px-6">
          <div className="w-16 h-16 mx-auto mb-6 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 justify-center">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="text-sm">Analyzing repository structure</span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <div className="w-5 h-5 rounded-full border-2 border-blue-500 animate-pulse"></div>
              <span className="text-sm">Reading package files</span>
            </div>
            <div className="flex items-center gap-3 justify-center opacity-50">
              <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
              <span className="text-sm">Generating content</span>
            </div>
            <div className="flex items-center gap-3 justify-center opacity-50">
              <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
              <span className="text-sm">Formatting markdown</span>
            </div>
          </div>

          {selectedRepo && (
            <div className="mt-8 p-4 bg-card border border-border rounded-lg">
              <h3 className="font-medium">{selectedRepo.name}</h3>
              <div className="flex items-center gap-2 justify-center mt-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: selectedRepo.languageColor }}
                ></span>
                <span className="text-sm text-muted-foreground">{selectedRepo.language}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Preview & Edit State
  if (viewState === 'preview') {
    return (
      <div className="flex-1 flex flex-col bg-background">
        {/* Action Bar */}
        <div className="h-14 border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="text-muted-foreground hover:text-foreground">
              ← Back
            </button>
            {selectedRepo && (
              <>
                <span className="text-muted-foreground">/</span>
                <span className="font-medium">{selectedRepo.name}</span>
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: selectedRepo.languageColor }}
                ></span>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
              <button
                onClick={() => setEditMode(false)}
                className={`px-3 py-1.5 rounded text-sm transition-colors ${
                  !editMode ? 'bg-background shadow-sm' : 'hover:bg-background/50'
                }`}
              >
                <Eye className="w-4 h-4 inline mr-1" />
                Preview
              </button>
              <button
                onClick={() => setEditMode(true)}
                className={`px-3 py-1.5 rounded text-sm transition-colors ${
                  editMode ? 'bg-background shadow-sm' : 'hover:bg-background/50'
                }`}
              >
                <Code2 className="w-4 h-4 inline mr-1" />
                Edit
              </button>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors">
              <RefreshCw className="w-4 h-4" />
              Regenerate
            </button>

            <button
              onClick={handleCommit}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              <GitCommit className="w-4 h-4" />
              Commit to GitHub
            </button>
          </div>
        </div>

        {/* Split View */}
        <div className="flex-1 flex overflow-hidden">
          {editMode ? (
            <>
              {/* Editor Pane */}
              <div className="flex-1 border-r border-border flex flex-col">
                <div className="h-10 border-b border-border flex items-center px-4 bg-muted/30">
                  <span className="text-sm text-muted-foreground">Markdown Editor</span>
                </div>
                <textarea
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                  className="flex-1 p-6 font-mono text-sm bg-background resize-none focus:outline-none"
                  spellCheck={false}
                />
              </div>

              {/* Preview Pane */}
              <div className="flex-1 flex flex-col">
                <div className="h-10 border-b border-border flex items-center justify-between px-4 bg-muted/30">
                  <span className="text-sm text-muted-foreground">Live Preview</span>
                  <div className="flex gap-2">
                    <button className="text-xs hover:text-foreground text-muted-foreground">
                      <Copy className="w-3 h-3 inline mr-1" />
                      Copy
                    </button>
                    <button className="text-xs hover:text-foreground text-muted-foreground">
                      <Download className="w-3 h-3 inline mr-1" />
                      Download
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-auto p-6">
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap">{markdown}</pre>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 overflow-auto p-8">
              <div className="max-w-4xl mx-auto prose prose-sm">
                <pre className="whitespace-pre-wrap bg-card p-6 rounded-lg border border-border">
                  {markdown}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Commit Modal
  if (viewState === 'commit-modal') {
    return (
      <div className="flex-1 flex items-center justify-center bg-background/50 backdrop-blur-sm">
        <div className="bg-popover border border-border rounded-lg shadow-xl w-full max-w-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2>Commit README to GitHub</h2>
            <button onClick={() => setViewState('preview')} className="text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>

          {selectedRepo && (
            <div className="bg-card border border-border rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">{selectedRepo.name}</span>
                <span className="text-sm text-muted-foreground">README.md (4.2 KB)</span>
              </div>

              <div className="mb-3">
                <label className="block text-sm mb-2">Branch</label>
                <select className="w-full h-10 px-3 rounded-lg bg-input-background border border-border">
                  <option>main</option>
                  <option>develop</option>
                  <option>+ Create new branch</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2">Commit message</label>
                <input
                  type="text"
                  defaultValue="docs: update README.md via ReadMind"
                  className="w-full h-10 px-3 rounded-lg bg-input-background border border-border"
                />
              </div>
            </div>
          )}

          <div className="space-y-2 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded" />
              <span className="text-sm">Create pull request instead of direct commit</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded" />
              <span className="text-sm">Backup existing README as README.old.md</span>
            </label>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setViewState('preview')}
              className="flex-1 h-10 px-4 rounded-lg border border-border hover:bg-accent transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmCommit}
              className="flex-1 h-10 px-4 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              Commit
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success State
  if (viewState === 'success') {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center max-w-md px-6">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-4xl">✓</span>
          </div>
          <h2 className="mb-3">README committed successfully! 🎉</h2>
          <div className="space-y-3 mb-6">
            <button className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              View on GitHub
            </button>
            <button className="block w-full px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
              Generate for another repo
            </button>
            <button className="block w-full px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors">
              Share README
            </button>
          </div>

          <div className="pt-6 border-t border-border">
            <p className="text-sm mb-3">Rate this README</p>
            <div className="flex gap-2 justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} className="text-2xl hover:scale-110 transition-transform">
                  ⭐
                </button>
              ))}
            </div>
            <textarea
              placeholder="Anything we can improve?"
              className="w-full h-20 px-3 py-2 rounded-lg bg-input-background border border-border resize-none text-sm"
            ></textarea>
          </div>
        </div>
      </div>
    );
  }

  // Initial state with selected repo
  return (
    <div className="flex-1 flex items-center justify-center bg-background">
      <div className="text-center max-w-md px-6">
        {selectedRepo && (
          <div className="p-6 bg-card border border-border rounded-lg mb-6">
            <h3 className="font-medium mb-2">{selectedRepo.name}</h3>
            <div className="flex items-center gap-2 justify-center">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: selectedRepo.languageColor }}
              ></span>
              <span className="text-sm text-muted-foreground">{selectedRepo.language}</span>
            </div>
          </div>
        )}
        <button
          onClick={handleGenerate}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
        >
          <Sparkles className="w-5 h-5" />
          Generate README
        </button>
      </div>
    </div>
  );
}
