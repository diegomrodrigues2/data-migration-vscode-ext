import React from 'react';
import { Conversation } from '../types';
import { PlusIcon, HistoryIcon, MessageSquareIcon, FolderIcon } from './Icons';
import ChatInterface from './ChatInterface';

interface ChatSidebarProps {
  conversations: Conversation[];
  onNewChat: () => void;
  onSelectChat: (id: string | null) => void;
  activeChatId: string | null;
  onSeeAllHistory: () => void;
  onOpenWorkspace: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  conversations,
  onNewChat,
  onSelectChat,
  activeChatId,
  onSeeAllHistory,
  onOpenWorkspace
}) => {
  // If a chat is active, show the Chat Interface
  if (activeChatId) {
    return (
      <ChatInterface 
        chatId={activeChatId} 
        onBack={() => onSelectChat(null)} 
      />
    );
  }

  // Otherwise, show the History List
  const recentConversations = conversations.slice(0, 5);

  return (
    <div className="flex flex-col h-full bg-vscode-sidebar border-r border-vscode-border flex-shrink-0 w-full">
      {/* Sidebar Header */}
      <div className="h-9 px-4 flex items-center border-b border-vscode-border bg-vscode-header text-xs font-bold tracking-wide uppercase text-vscode-text">
        Agent History
      </div>

      {/* List Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
            {recentConversations.length === 0 && (
                <div className="px-2 py-4 text-xs text-gray-500 italic">No recent chats</div>
            )}
            {recentConversations.map((conv) => (
            <button
                key={conv.id}
                onClick={() => onSelectChat(conv.id)}
                className="w-full flex items-center px-2 py-2 mb-1 rounded-sm text-sm text-vscode-text hover:bg-vscode-listHover hover:text-white transition-colors group"
            >
                <MessageSquareIcon className="w-4 h-4 mr-3 opacity-70" />
                <div className="flex flex-col items-start min-w-0">
                  <span className="truncate w-full font-medium">{conv.title}</span>
                  <span className="text-xs text-gray-500 truncate w-full">{conv.lastMessage || "No messages"}</span>
                </div>
            </button>
            ))}
        </div>

        {/* See All History Button */}
        {conversations.length > 0 && (
            <div className="px-4">
                <button
                onClick={onSeeAllHistory}
                className="w-full flex items-center justify-start py-1.5 text-xs text-vscode-accent hover:underline"
                >
                <HistoryIcon className="w-3 h-3 mr-1.5" />
                See All History
                </button>
            </div>
        )}
      </div>

      {/* Bottom Section: Buttons */}
      <div className="p-4 border-t border-vscode-border bg-vscode-bg flex flex-col gap-2">
        <button
          onClick={onOpenWorkspace}
          className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-4 rounded-sm transition-colors shadow-sm"
        >
          <FolderIcon className="w-4 h-4 mr-2" />
          Open Workspace
        </button>
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center bg-vscode-accent hover:bg-blue-600 text-white text-sm py-2 px-4 rounded-sm transition-colors shadow-sm"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          New Chat
        </button>
      </div>
    </div>
  );
};

export default ChatSidebar;