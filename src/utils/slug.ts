// utils/slug.ts

// Function to generate URL-friendly slug from Title
export const generateSlug = (title: string): string => {
  if (!title) return '';
  
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/gi, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single
    .trim();
};

// Function to decode slug back to original title
export const decodeSlug = (slug: string): string => {
  if (!slug) return '';
  
  // First decode URL encoded characters
  const decodedSlug = decodeURIComponent(slug);
  
  return decodedSlug
    .replace(/-/g, ' ') // Replace hyphens with spaces
    .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letter of each word
};