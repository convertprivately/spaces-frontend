export const HOST = process.env.HOST || "localhost:8000";
export const SSL = process.env.SSL || false;
export const API_URL = `http${SSL ? "s" : ""}://${HOST}`;
export const WS_SPACES_URL = `ws${SSL ? "s" : ""}://${HOST}/ws/spaces`;

export interface IData {
    id: string;
  }