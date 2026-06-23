export const API_BASE_URL = 'https://localhost:3000';
export const WS_URL = `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/ws/chat`;
export const AI_WS_URL = import.meta.env.VITE_AI_WS_URL || '/ws/story';
