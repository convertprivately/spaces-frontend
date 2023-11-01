export const HOST = process.env.NEXT_PUBLIC_HOST || "localhost:8000";
export const SSL = process.env.NEXT_PUBLIC_SSL || false;
export const API_URL = `http${SSL ? "s" : ""}://${HOST}`;
export const WS_SPACES_URL = `ws${SSL ? "s" : ""}://${HOST}/ws/spaces`;

export interface IData {
    id: string;
    title?: string;
    creator?: string;
    url?: string;
  }