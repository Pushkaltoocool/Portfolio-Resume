import { api } from './api.js';

// Downscale large raster images client-side so uploads stay under the 4.5MB
// serverless body limit; GIFs/SVGs and small files pass through untouched.
async function fileToDataUrl(file) {
  const passthrough = ['image/gif', 'image/svg+xml'];
  const readRaw = () =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Could not read file.'));
      reader.readAsDataURL(file);
    });

  if (passthrough.includes(file.type) || file.size < 900 * 1024) return readRaw();

  const bitmap = await createImageBitmap(file).catch(() => null);
  if (!bitmap) return readRaw();

  const MAX = 1920;
  const scale = Math.min(1, MAX / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/jpeg', 0.85);
}

// Uploads to imgbb (via the server proxy) and returns the hosted image URL.
export async function uploadImage(file) {
  if (!file.type.startsWith('image/')) throw new Error('Only image files can be uploaded.');
  const dataUrl = await fileToDataUrl(file);
  const res = await api('/api/upload', {
    method: 'POST',
    admin: true,
    body: { image: dataUrl, name: file.name?.replace(/\.[^.]+$/, '') },
  });
  return res.url;
}
