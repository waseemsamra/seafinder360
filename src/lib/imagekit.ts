export const IMAGEKIT_URL_ENDPOINT = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/piwakgkp8';
export const IMAGEKIT_PUBLIC_KEY = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || 'public_u35OU4q8+HwStfWDVlX0u27C7/M=';

export function getImageKitUrl(path: string, transformations: string = '') {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) {
    if (path.includes('ik.imagekit.io')) return path;
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  if (transformations) {
    return `${IMAGEKIT_URL_ENDPOINT}/${cleanPath}?tr=${transformations}`;
  }
  return `${IMAGEKIT_URL_ENDPOINT}/${cleanPath}`;
}
