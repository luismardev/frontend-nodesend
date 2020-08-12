export const capitalize = (text) => {
  return text.replace(/\b\w/g, (p1) => {
    return p1.toUpperCase();
  });
};
