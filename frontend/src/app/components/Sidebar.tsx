import { LayoutDashboard, Folder, Clock, Grid3x3, Settings, Code, HelpCircle, ChevronLeft } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'repositories', icon: Folder, label: 'My Repositories' },
    { id: 'history', icon: Clock, label: 'Generation History' },
    { id: 'templates', icon: Grid3x3, label: 'Templates' },
  ];

  const secondaryItems = [
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'api', icon: Code, label: 'API Access' },
    { id: 'help', icon: HelpCircle, label: 'Help & Docs' },
  ];

  return (
    <aside
      className={`h-full bg-sidebar border-r border-sidebar-border fixed left-0 top-16 bottom-0 transition-all duration-300 z-40 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Primary Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground border-l-2 border-sidebar-primary'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className={isActive ? 'font-medium' : ''}>{item.label}</span>}
              </button>
            );
          })}

          {/* Divider */}
          {!collapsed && <div className="h-px bg-sidebar-border my-4"></div>}

          {/* Secondary Items */}
          {secondaryItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Upgrade CTA */}
        {!collapsed && (
          <div className="px-3 pb-6">
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg p-4 text-white">
              <h4 className="font-semibold mb-1">Upgrade to Pro</h4>
              <p className="text-sm opacity-90 mb-3">Unlimited generations</p>
              <button className="w-full bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>
        )}

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mx-3 mb-4 flex items-center justify-center p-2 hover:bg-sidebar-accent rounded-lg transition-colors"
        >
          <ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </aside>
  );
}
