import {
  getFirstChildPath,
  getFirstSiblingPath,
  getParentPath,
  getPathFromElement,
  getSiblingPath,
  normalizeKeys,
  test,
} from './utils';
import { useEffect, useReducer, useRef, useState } from 'react';
import menuReducer from './reducer';
import * as changeTypes from './stateChangeTypes';

const defaultProps = {
  paths: [],
  activeKeyPath: '',
  activeMousePath: '',
};

const useMenu = userProps => {
  const buttonRef = useRef();
  const props = { ...defaultProps, ...userProps };
  const [{ paths, activeKeyPath, activeMousePath }, dispatch] = useReducer(
    menuReducer,
    {
      paths: props.paths,
      activeKeyPath: props.activeKeyPath,
      activeMousePath: props.activeMousePath,
    },
  );

  const isFocussed = id => {
    return activeKeyPath === paths.find(test(`${id}$`));
  };

  const isExpanded = id => {
    return !!(activeKeyPath.match(`${id}/`) || activeMousePath.match(id));
  };

  useEffect(() => {
    const el = buttonRef.current;
    if (el) {
      const paths = [];
      const id = el.getAttribute('id');
      paths.push(getPathFromElement(el));
      const root = document.querySelector(`[aria-labelledby="${id}"]`);
      Array.from(root.querySelectorAll('[role="menuitem"]')).forEach(x => {
        paths.push(getPathFromElement(x));
      });
      dispatch({ type: changeTypes.SetPaths, paths });
    }
  }, []);

  useEffect(() => {
    const match = activeKeyPath.match(/\/?([a-zA-Z0-9]+)$/) || [];
    const id = match[1];
    const el = document.getElementById(id);
    if (el) {
      el.focus();
    }
  }, [activeKeyPath]);

  const itemKeyDownHandlers = id => ({
    ArrowDown(event) {
      dispatch({ type: changeTypes.ItemKeyDownArrowDown, id });
    },
    ArrowUp(event) {
      dispatch({ type: changeTypes.ItemKeyDownArrowUp, id });
    },
    ArrowLeft(event) {
      dispatch({ type: changeTypes.ItemKeyDownArrowLeft, id });
    },
    ArrowRight(event) {
      dispatch({ type: changeTypes.ItemKeyDownArrowRight, id });
    },
    Enter(event) {
      dispatch({ type: changeTypes.ItemKeyDownEnter, id });
    },
    Home(event) {
      dispatch({ type: changeTypes.ItemKeyDownHome, id });
    },
    End(event) {
      dispatch({ type: changeTypes.ItemKeyDownEnd, id });
    },
    Escape(event) {
      dispatch({ type: changeTypes.ItemKeyDownEscape, id });
    },
    Space(event) {
      dispatch({ type: changeTypes.ItemKeyDownSpace, id });
    },
  });

  const buttonHandleClick = id => event => {
    // setKeyPath(getPathRef(id));
  };

  const buttonHandleMouseEnter = id => event => {
    dispatch({ type: changeTypes.SetActiveMousePath, id });
  };

  const buttonHandleMouseLeave = id => event => {
    const menu = document.querySelector(`[aria-labelledby=${id}]`);
    if (
      !menu ||
      !(event.relatedTarget instanceof HTMLElement) ||
      (menu !== event.relatedTarget && !menu.contains(event.relatedTarget))
    ) {
      dispatch({ type: changeTypes.ClearActiveMousePath, id });
    }
  };

  const buttonKeyDownhandlers = id => ({
    ArrowDown(event) {
      dispatch({ type: changeTypes.ButtonKeyDownArrowDown, id });
    },
    ArrowUp(event) {
      dispatch({ type: changeTypes.ButtonKeyDownArrowUp, id });
    },
    Space(event) {
      dispatch({ type: changeTypes.ButtonKeyDownSpace, id });
    },
    Enter(event) {
      dispatch({ type: changeTypes.ButtonKeyDownEnter, id });
    },
  });

  const handleKey = handlers => event => {
    const key = normalizeKeys(event.key);
    if (handlers[key]) {
      handlers[key](event);
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
      tabIndex: isFocussed(id) ? 0 : -1,
      onKeyDown: handleKey(itemKeyDownHandlers(id)),
      onClick: buttonHandleClick(id),
      onMouseEnter: buttonHandleMouseEnter(id),
      onMouseLeave: buttonHandleMouseLeave(id),
    };

    if (!hasPopup) {
      return returnProps;
    }

    return {
      'aria-haspopup': true,
      'aria-expanded': isExpanded(id),
      ...returnProps,
    };
  };

  const getMenuButtonProps = ({ id } = {}) => {
    if (typeof id === 'undefined') {
      throw new Error('getMenuButtonProps requires an id');
    }
    return {
      id,
      ref: buttonRef,
      'aria-haspopup': true,
      'aria-expanded': isExpanded(id),
      onKeyDown: handleKey(buttonKeyDownhandlers(id)),
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
        display: isExpanded(labelledBy) ? undefined : 'none',
      },
    };
  };

  return {
    getMenuItemProps,
    getMenuButtonProps,
    getMenuProps,
    isFocussed,
    isExpanded,
  };
};
export default useMenu;
