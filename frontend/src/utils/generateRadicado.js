export function generateRadicado() {
  const year = new Date().getFullYear();
  const randomSequence = Math.floor(100000 + Math.random() * 900000)
    .toString()
    .slice(0, 6);

  return `MAT-${year}-${randomSequence}`;
}