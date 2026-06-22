export const API_BASE_URL = 'http://localhost:3000';
export const WS_URL = 'ws://localhost:3000';
export const AI_WS_URL = import.meta.env.VITE_AI_WS_URL || `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.hostname}:8000`;
