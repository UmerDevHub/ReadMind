import { Search, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function TopNavigation() {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <nav className="h-16 border-b border-border bg-background flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-50">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold">R</span>
          </div>
          <span className="font-semibold text-lg">ReadMind</span>
        </div>
      </div>

      {/* Center Section */}
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search repositories..."
            className="w-full h-10 pl-10 pr-20 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-muted rounded text-xs text-muted-foreground">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <div className="px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200">
          <span className="text-sm text-blue-700 font-medium">5 generations left</span>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 hover:bg-accent rounded-lg p-1.5 transition-colors"
          >
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
              alt="User avatar"
              className="w-8 h-8 rounded-full"
            />
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-12 w-56 bg-popover border border-border rounded-lg shadow-lg py-2">
              <div className="px-4 py-2 border-b border-border">
                <p className="font-medium">johndoe</p>
                <p className="text-sm text-muted-foreground">john@example.com</p>
              </div>
              <button className="w-full text-left px-4 py-2 hover:bg-accent text-sm">Settings</button>
              <button className="w-full text-left px-4 py-2 hover:bg-accent text-sm">Billing</button>
              <button className="w-full text-left px-4 py-2 hover:bg-accent text-sm">Documentation</button>
              <div className="border-t border-border my-1"></div>
              <button className="w-full text-left px-4 py-2 hover:bg-accent text-sm text-destructive">
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
