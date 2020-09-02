
export default function setWindowTitle(newTitle: string | null, defaultTitle: string = 'Spotify Player'): void {
  const title = newTitle ? `${newTitle} - ${defaultTitle}` : defaultTitle;
  document.title = title;
}
