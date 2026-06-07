import { useState } from 'react';
import { TopNavigation } from './components/TopNavigation';
import { Sidebar } from './components/Sidebar';
import { RepositoryList } from './components/RepositoryList';
import { MarkdownWorkspace } from './components/MarkdownWorkspace';

interface Repository {
  id: string;
  name: string;
  owner: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  lastUpdated: string;
  status: 'has-readme' | 'outdated' | 'no-readme';
}

export default function App() {
  const [activeView, setActiveView] = useState('repositories');
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSelectRepo = (repo: Repository) => {
    setSelectedRepo(repo);
  };

  const handleBackToList = () => {
    setSelectedRepo(null);
  };

  return (
    <div className="size-full bg-background">
      <TopNavigation />

      <div className="flex h-full pt-16">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />

        <div className="flex flex-1 ml-64">
          {activeView === 'repositories' && (
            <>
              <RepositoryList onSelectRepo={handleSelectRepo} />
              <MarkdownWorkspace selectedRepo={selectedRepo} onBack={handleBackToList} />
            </>
          )}

          {activeView === 'dashboard' && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h1 className="mb-4">Dashboard</h1>
                <p className="text-muted-foreground">Welcome to ReadMind</p>
              </div>
            </div>
          )}

          {activeView === 'history' && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h1 className="mb-4">Generation History</h1>
                <p className="text-muted-foreground">View your past README generations</p>
              </div>
            </div>
          )}

          {activeView === 'templates' && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h1 className="mb-4">Templates</h1>
                <p className="text-muted-foreground">Browse pre-built README templates</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}