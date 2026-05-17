// Tiny helper to mint atelier-style reference codes (BSP-XXXX / CNC-XXXX).
// Uses crypto.getRandomValues so the codes survive Edge / server boundaries
// without a Node-only import.

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function randomChunk(length: number): string {
  const bytes = new Uint8Array(length);
  globalThis.crypto.getRandomValues(bytes);
  let out = "";
  for (let i = 0; i < length; i += 1) {
    const byte = bytes[i] ?? 0;
    out += ALPHABET.charAt(byte % ALPHABET.length);
  }
  return out;
}

export function mintReference(prefix: string, chunkLength = 4): string {
  return `${prefix}-${randomChunk(chunkLength)}`;
}
