export const HOST = "localhost:8000";
export const SSL = false;
export const API_URL = `http${SSL ? "s" : ""}://${HOST}`;
export const WS_SPACES_URL = `ws${SSL ? "s" : ""}://${HOST}/ws/spaces`;

export interface IData {
    id: string;
  }