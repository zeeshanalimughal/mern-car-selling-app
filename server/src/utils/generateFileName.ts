import { randomBytes } from 'crypto';
import { createHash } from 'crypto';

/**
 * Generate a unique file name.
 * @param length The length of the random string to generate.
 * @param prefix Optional prefix for the file name.
 * @returns A unique file name.
 */
export function generateUniqueFileName(length = 10, prefix = "") {
  const randomBytesBuffer = randomBytes(length);
  const hash = createHash('sha256').update(randomBytesBuffer).digest('hex');
  const uniqueId = hash.slice(0, length);
  const timestamp = Date.now();
  return `${prefix}${uniqueId}-${timestamp}`;
}

// Example usage:
const fileName = generateUniqueFileName(10, 'file-');
console.log(fileName);
