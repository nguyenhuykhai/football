export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export const formatAge = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const age = new Date().getFullYear() - date.getFullYear();
  return `${age} years old`;
};