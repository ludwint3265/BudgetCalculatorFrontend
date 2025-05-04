export const cleanData = (suggestions) => {
  return suggestions.map((option) => option.replaceAll("\\$", "$"));
};
