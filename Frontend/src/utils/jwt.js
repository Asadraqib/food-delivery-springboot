/**
 * Decode a JWT token's payload without verifying the signature.
 * Good enough for client-side role checks — the server still validates on every request.
 */
export function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}
