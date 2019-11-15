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
