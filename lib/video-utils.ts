export function getVideoType(url: string): 'youtube' | 'drive' | 'unknown' {
  if (!url) return 'unknown';
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
  if (url.includes('drive.google.com')) return 'drive';
  return 'unknown';
}

export function getYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export function getGoogleDriveEmbedUrl(url: string): string | null {
  if (!url) return null;
  if (url.includes('drive.google.com')) {
    return url.replace('/view', '/preview');
  }
  return null;
}
