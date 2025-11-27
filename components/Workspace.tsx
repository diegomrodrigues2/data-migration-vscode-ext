import React from 'react';
import { FeatureType } from '../types';
import { LayoutIcon, SettingsIcon, BarChartIcon, FileIcon } from './Icons';

interface WorkspaceProps {
  activeFeature: string;
  onFeatureChange: (feature: FeatureType) => void;
}

const Workspace: React.FC<WorkspaceProps> = ({ activeFeature, onFeatureChange }) => {
  
  const renderContent = () => {
    switch (activeFeature) {
      case FeatureType.DASHBOARD:
        return (
          <div className="p-8">
            <h1 className="text-2xl font-light mb-6">Welcome to Workspace</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-vscode-sidebar border border-vscode-border p-4 rounded hover:border-vscode-accent cursor-pointer transition-colors">
                  <h3 className="text-md font-bold mb-2 text-vscode-accent">Project {i}</h3>
                  <p className="text-sm text-gray-400">Last updated: 2 hours ago</p>
                </div>
              ))}
            </div>
          </div>
        );
      case FeatureType.ANALYTICS:
        return (
           <div className="p-8">
            <h1 className="text-2xl font-light mb-6">Analytics</h1>
             <div className="h-64 bg-vscode-sidebar border border-vscode-border rounded flex items-center justify-center text-gray-500">
                Chart Placeholder using d3 or recharts would go here
             </div>
           </div>
        );
      case FeatureType.SETTINGS:
        return (
            <div className="p-8">
                <h1 className="text-2xl font-light mb-6">Settings</h1>
                <div className="max-w-md space-y-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Theme</label>
                        <select className="bg-vscode-input border border-vscode-border p-2 rounded text-sm text-vscode-text">
                            <option>Dark (Default)</option>
                            <option>Light</option>
                            <option>High Contrast</option>
                        </select>
                    </div>
                     <div className="flex items-center gap-2 mt-4">
                        <input type="checkbox" id="telemetry" className="accent-vscode-accent" defaultChecked />
                        <label htmlFor="telemetry" className="text-sm">Enable Telemetry</label>
                    </div>
                </div>
            </div>
        )
      default:
        return <div className="p-8">Select a feature</div>;
    }
  };

  const SidebarItem = ({ id, label, icon: Icon }: { id: FeatureType; label: string; icon: any }) => (
    <button
        onClick={() => onFeatureChange(id)}
        className={`w-full flex items-center px-4 py-2 text-sm border-l-2 transition-colors ${
        activeFeature === id
            ? 'border-vscode-accent bg-[#37373d] text-white'
            : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-[#2a2d2e]'
        }`}
    >
        <Icon className="w-4 h-4 mr-3" />
        {label}
    </button>
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-vscode-bg overflow-hidden">
      {/* Top Header - VS Code Style */}
      <div className="h-9 bg-vscode-header border-b border-vscode-border flex items-center px-4 justify-between select-none">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-vscode-text opacity-90">My Application Workspace</span>
        </div>
        
        {/* Breadcrumbs / Actions */}
        <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-[#ed6a5e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#f5bf4f]"></div>
                <div className="w-3 h-3 rounded-full bg-[#62c554]"></div>
            </div>
        </div>
      </div>

      {/* Main Content Area with Inner Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Inner Sidebar */}
        <div className="w-48 bg-vscode-activityBar border-r border-vscode-border flex flex-col py-2">
            <div className="px-4 py-2 mb-2 text-xs font-bold text-gray-500 uppercase">Menu</div>
            <SidebarItem id={FeatureType.DASHBOARD} label="Dashboard" icon={LayoutIcon} />
            <SidebarItem id={FeatureType.FILES} label="Files" icon={FileIcon} />
            <SidebarItem id={FeatureType.ANALYTICS} label="Analytics" icon={BarChartIcon} />
            <div className="flex-1" />
            <SidebarItem id={FeatureType.SETTINGS} label="Settings" icon={SettingsIcon} />
        </div>

        {/* Feature View */}
        <div className="flex-1 overflow-auto bg-vscode-bg text-vscode-text">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Workspace;