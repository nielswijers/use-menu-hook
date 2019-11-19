export const normalizeKeys = key => {
  if (key === ' ') {
    return 'Space';
  }
  return key;
};

export const getPathFromElement = el => {
  if (!el) {
    return '';
  }
  let path = el.getAttribute('id');
  while (el) {
    const name = el.getAttribute('aria-labelledby');
    if (name) {
      path = `${name}/${path}`;
    }
    el = el.parentElement;
  }
  return path;
};

export const test = match => {
  const regex = new RegExp(match);
  return regex.test.bind(regex);
};
