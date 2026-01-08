/// <reference types="vite/client" />

interface Window {
  ipc: {
    send: (channel: string, data: any) => void;
    on: (channel: string, func: (event: any, ...args: any[]) => void) => void;
    removeListener: (channel: string, func: (event: any, ...args: any[]) => void) => void;
  };
}

