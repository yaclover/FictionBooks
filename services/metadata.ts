
export interface ExternalMetadata {
  title?: string;
  author?: string;
  year?: number;
}

export async function fetchBookMetadata(title: string, author?: string): Promise<ExternalMetadata | null> {
  try {
    const query = encodeURIComponent(`title:${title}${author ? ` author:${author}` : ''}`);
    const response = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=1`);
    const data = await response.json();

    if (data.docs && data.docs.length > 0) {
      const doc = data.docs[0];
      return {
        title: doc.title,
        author: doc.author_name?.[0],
        year: doc.first_publish_year,
      };
    }
  } catch (error) {
    console.error('Failed to fetch book metadata:', error);
  }
  return null;
}
