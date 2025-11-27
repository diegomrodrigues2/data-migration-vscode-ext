export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: number;
}

export interface AppState {
  conversations: Conversation[];
  currentChatId: string | null;
  activeFeature: string;
}

export enum FeatureType {
  DASHBOARD = 'DASHBOARD',
  SETTINGS = 'SETTINGS',
  ANALYTICS = 'ANALYTICS',
  FILES = 'FILES'
}