import { Star, GitFork, ChevronDown, RefreshCw } from 'lucide-react';

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

interface RepositoryListProps {
  onSelectRepo: (repo: Repository) => void;
}

export function RepositoryList({ onSelectRepo }: RepositoryListProps) {
  const repositories: Repository[] = [
    {
      id: '1',
      name: 'awesome-react-app',
      owner: 'johndoe',
      language: 'TypeScript',
      languageColor: '#3178c6',
      stars: 245,
      forks: 32,
      lastUpdated: '2 days ago',
      status: 'no-readme',
    },
    {
      id: '2',
      name: 'node-api-server',
      owner: 'johndoe',
      language: 'JavaScript',
      languageColor: '#f1e05a',
      stars: 128,
      forks: 18,
      lastUpdated: '5 days ago',
      status: 'outdated',
    },
    {
      id: '3',
      name: 'python-ml-toolkit',
      owner: 'johndoe',
      language: 'Python',
      languageColor: '#3572A5',
      stars: 567,
      forks: 89,
      lastUpdated: '1 week ago',
      status: 'has-readme',
    },
    {
      id: '4',
      name: 'go-microservices',
      owner: 'acme-org',
      language: 'Go',
      languageColor: '#00ADD8',
      stars: 892,
      forks: 156,
      lastUpdated: '3 days ago',
      status: 'no-readme',
    },
    {
      id: '5',
      name: 'rust-cli-tools',
      owner: 'johndoe',
      language: 'Rust',
      languageColor: '#dea584',
      stars: 1203,
      forks: 203,
      lastUpdated: '1 day ago',
      status: 'outdated',
    },
  ];

  const getStatusIndicator = (status: Repository['status']) => {
    switch (status) {
      case 'has-readme':
        return { color: 'bg-green-500', label: 'Has README' };
      case 'outdated':
        return { color: 'bg-yellow-500', label: 'Outdated README' };
      case 'no-readme':
        return { color: 'bg-gray-400', label: 'No README' };
    }
  };

  return (
    <div className="w-[400px] border-r border-border bg-background h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="mb-4">Select Repository</h2>

        <div className="flex gap-2 mb-4">
          <select className="flex-1 h-9 px-3 rounded-lg bg-input-background border border-border text-sm">
            <option>All repos</option>
            <option>My repos</option>
            <option>Organizations</option>
          </select>
          <select className="flex-1 h-9 px-3 rounded-lg bg-input-background border border-border text-sm">
            <option>Sort by: Recent</option>
            <option>Sort by: Name</option>
            <option>Sort by: Stars</option>
          </select>
        </div>

        <button className="w-full flex items-center justify-center gap-2 h-9 px-3 rounded-lg bg-input-background border border-border hover:bg-accent transition-colors text-sm">
          <RefreshCw className="w-4 h-4" />
          Sync from GitHub
        </button>
        <p className="text-xs text-muted-foreground mt-2">Last synced: 5 minutes ago</p>
      </div>

      {/* Repository List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {repositories.map((repo) => {
          const statusInfo = getStatusIndicator(repo.status);
          return (
            <button
              key={repo.id}
              onClick={() => onSelectRepo(repo)}
              className="w-full p-3 rounded-lg border border-border bg-card hover:shadow-md hover:border-ring transition-all text-left group"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{repo.name}</h3>
                  <p className="text-sm text-muted-foreground">{repo.owner}</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${statusInfo.color} mt-2 flex-shrink-0`}></div>
              </div>

              <div className="flex items-center gap-3 mb-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: repo.languageColor }}
                  ></span>
                  {repo.language}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  {repo.stars}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="w-3 h-3" />
                  {repo.forks}
                </span>
              </div>

              <p className="text-xs text-muted-foreground">Updated {repo.lastUpdated}</p>

              <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="inline-block px-3 py-1 bg-blue-500 text-white rounded text-sm">
                  Analyze
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
