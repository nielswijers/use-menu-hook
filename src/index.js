import {
  findNode,
  getFirstChildPath,
  getFirstSiblingPath,
  getParentPath,
  getPathFromElement,
  getSiblingPath,
  normalizeKeys,
} from './utils';
import { useEffect, useRef, useState } from 'react';

const defaultProps = {
  isOpen: false,
};

export const useMenu = userProps => {
  const props = { ...defaultProps, ...userProps };
  const pathRefs = useRef({});
  const getPathRef = id => pathRefs.current[id];
  const [mousePath, setMousePath] = useState(undefined);
  const [keyPath, setKeyPath] = useState(undefined);

  const isInKeyPath = id => !!(keyPath && keyPath.indexOf(getPathRef(id)) > -1);

  const isInPath = id => {
    return !!(
      (mousePath && mousePath.indexOf(getPathRef(id)) > -1) ||
      (keyPath && keyPath.indexOf(getPathRef(id)) > -1)
    );
  };

  const isInChildPath = id => {
    return !!(
      (mousePath && mousePath.indexOf(getPathRef(id)) > -1) ||
      (keyPath && keyPath.indexOf(getPathRef(id) + '/') > -1)
    );
  };

  const buildRefs = el => {
    if (el) {
      const id = el.getAttribute('id');
      pathRefs.current[id] = getPathFromElement(el);
      const root = document.querySelector(`[aria-labelledby="${id}"]`);
      Array.from(root.querySelectorAll('[role="menuitem"]')).forEach(x => {
        pathRefs.current[x.getAttribute('id')] = getPathFromElement(x);
      });
    }
  };

  useEffect(() => {
    const index = Object.values(pathRefs.current).indexOf(keyPath);
    const id = Object.keys(pathRefs.current)[index];
    const el = document.getElementById(id);
    if (el) {
      el.focus();
    }
  }, [keyPath]);

  const toChild = (id, reverse) => {
    const path = getPathRef(id);
    const firstChildPath = getFirstChildPath(
      path,
      Object.values(pathRefs.current),
      reverse,
    );
    setKeyPath(firstChildPath);
  };

  const toParent = id => {
    const path = getPathRef(id);
    const parentPath = getParentPath(path);
    setKeyPath(parentPath);
  };

  const toSibling = (id, reverse) => {
    const path = getPathRef(id);
    const siblingPath = getSiblingPath(
      path,
      Object.values(pathRefs.current),
      reverse,
    );
    setKeyPath(siblingPath);
  };

  const toFirstSibling = (id, reverse) => {
    const path = getPathRef(id);
    const siblingPath = getFirstSiblingPath(
      path,
      Object.values(pathRefs.current),
      reverse,
    );
    setKeyPath(siblingPath);
  };

  const itemKeyDownHandlers = {
    ArrowDown(id, event) {
      toSibling(id);
    },
    ArrowUp(id, event) {
      toSibling(id, true);
    },
    ArrowLeft(id, event) {
      toParent(id);
    },
    ArrowRight(id, event) {
      toChild(id);
    },
    Enter(id, event) {
      toChild(id);
    },
    Home(id, event) {
      toFirstSibling(id);
    },
    End(id, event) {
      toFirstSibling(id, true);
    },
    Escape(id, event) {
      toParent(id);
    },
    Space(id, event) {
      toChild(id);
    },
  };

  const buttonHandleClick = id => event => {
    setKeyPath(getPathRef(id));
  };

  const buttonHandleMouseEnter = id => event => {
    setMousePath(getPathRef(id));
  };

  const buttonHandleMouseLeave = id => event => {
    const menu = document.querySelector(`[aria-labelledby=${id}]`);
    if (
      !menu ||
      !(event.relatedTarget instanceof HTMLElement) ||
      (menu !== event.relatedTarget && !menu.contains(event.relatedTarget))
    ) {
      setMousePath('');
    }
  };

  const buttonKeyDownhandlers = {
    ArrowDown(id, event) {
      toChild(id);
    },
    ArrowUp(id, event) {
      toChild(id, true);
    },
    Space(id, event) {
      toChild(id);
    },
    Enter(id, event) {
      toChild(id);
    },
  };

  const handleKey = (id, handlers) => event => {
    const key = normalizeKeys(event.key);
    if (handlers[key]) {
      handlers[key](id, event);
    }
  };

  const getMenuItemProps = (itemProps = {}) => {
    const { hasPopup, id, ...p } = itemProps;
    if (typeof id === 'undefined') {
      throw new Error('getMenuItemProps requires an id');
    }
    const returnProps = {
      ...p,
      id,
      role: 'menuitem',
      tabIndex: keyPath && keyPath === getPathRef(id) ? 0 : -1,
      onKeyDown: handleKey(id, itemKeyDownHandlers),
      onClick: buttonHandleClick(id),
      onMouseEnter: buttonHandleMouseEnter(id),
      onMouseLeave: buttonHandleMouseLeave(id),
    };

    if (!hasPopup) {
      return returnProps;
    }

    return {
      'aria-haspopup': true,
      'aria-expanded': isInChildPath(id) ? true : false,
      ...returnProps,
    };
  };

  const getMenuButtonProps = ({ id } = {}) => {
    if (typeof id === 'undefined') {
      throw new Error('getMenuButtonProps requires an id');
    }
    return {
      id,
      ref: el => {
        buildRefs(el);
      },
      'aria-haspopup': true,
      'aria-expanded': isInPath(id),
      onKeyDown: handleKey(id, buttonKeyDownhandlers),
      onClick: buttonHandleClick(id),
      onMouseEnter: buttonHandleMouseEnter(id),
      onMouseLeave: buttonHandleMouseLeave(id),
    };
  };

  const getMenuProps = ({ labelledBy } = {}) => {
    if (typeof labelledBy === 'undefined') {
      throw new Error('labelledBy is required');
    }
    return {
      role: 'menu',
      'aria-labelledby': labelledBy,
      style: {
        display: isInPath(labelledBy) ? undefined : 'none',
      },
    };
  };

  return {
    getMenuItemProps,
    getMenuButtonProps,
    getMenuProps,
  };
};
