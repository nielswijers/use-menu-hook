export const normalizeKeys = key => {
  if (key === ' ') {
    return 'Space';
  }
  return key;
};

export const findNode = (el, method, matcher, nested) => {
  let target = el[method];
  while (target) {
    if (target.matches(matcher)) {
      return target;
    }
    if (nested) {
      const child = target.querySelector(matcher);
      if (child) {
        return child;
      }
    }

    target = target[method];
  }
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

export const rotateTo = (value, arr) => {
  const index = arr.indexOf(value);
  return arr.slice(index).concat(arr.slice(0, index));
};

export const getParentPath = path => {
  return path.replace(/\/[a-zA-Z0-9]+$/, '');
};

export const getFirstChildPath = (path, paths, reverse) => {
  const regex = new RegExp(`${path}/[a-zA-Z0-9]+$`);

  const result = rotateTo(path, paths).filter(x => regex.test(x));
  return reverse ? result.pop() : result[0];
};

export const getFirstSiblingPath = (path, paths, reverse) => {
  const regex = new RegExp(`${getParentPath(path)}/[a-zA-Z0-9]+$`);

  const result = paths.filter(x => regex.test(x));
  return reverse ? result.pop() : result[0];
};

export const getSiblingPath = (path, paths, reverse = false) => {
  const regex = new RegExp(`${getParentPath(path)}/[a-zA-Z0-9]+$`);

  const result = rotateTo(path, paths).filter(x => regex.test(x));

  return reverse ? result.pop() : result[1];
};
