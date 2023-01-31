const dec2hex = (dec: number) => {
  return ('0' + dec.toString(16)).substring(-2);
};

export const generateCodeVerifier = () => {
  // generate random length for code_verifier which should be between 43 and 128
  const length = Math.random() * (129 - 43) + 43;
  const array = new Uint32Array(length / 2);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec2hex).join('');
};

const sha256 = (plain: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
};

const base64urlencode = (hashed: ArrayBuffer) => {
  let str = '';
  const bytes = new Uint8Array(hashed);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    str += String.fromCharCode(bytes[i]);
  }
  return window.btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

export const generateCodeChallengeFromVerifier = async (codeVerifier: string) => {
  const hashed = await sha256(codeVerifier);
  const base64encoded = base64urlencode(hashed);
  return base64encoded;
};
