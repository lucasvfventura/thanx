"use client"
// Utility function to decode a JWT and extract its payload
export function decodeJwtPayload(token: string): any | null {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    // atob handles base64 decoding
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch (e) {
    return null;
  }
}
