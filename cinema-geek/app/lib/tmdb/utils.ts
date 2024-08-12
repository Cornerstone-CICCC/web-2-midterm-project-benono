const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/'

export function getImageUrl(
  path: string | null,
  size: string = 'w500'
): string {
  if (!path) return ''
  return `${IMAGE_BASE_URL}${size}${path}`
}
