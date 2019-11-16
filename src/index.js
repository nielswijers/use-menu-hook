import { findNode, getPath, normalizeKeys } from './utils';
import { useEffect, useRef, useState } from 'react';

const defaultProps = {
  isOpen: false,
};

export const useMenu = userProps => {
  const props = { ...defaultProps, ...userProps };
  const pathRefs = useRef({});
  const getPathRef = id => pathRefs.current[id];
  const setPathRef = (id, path) => (pathRefs.current[id] = path);
  const [isOpen, setIsOpen] = useState(props.isOpen);
  const [mousePath, setMousePath] = useState('');
  const isInPath = id => {
    return mousePath.indexOf(getPathRef(id)) > -1;
  };

  const itemKeyDownHandlers = {
    ArrowDown: function(event) {
      const li = findNode(event.currentTarget, 'parentElement', 'li');
      let item = findNode(li, 'nextElementSibling', '[role="menuitem"]', true);
      event.currentTarget.setAttribute('tabIndex', -1);
      if (!item) {
        item = findNode(
          li,
          'parentElement',
          'ul',
        ).firstElementChild.querySelector('[role="menuitem"]');
      }
      item.setAttribute('tabIndex', 0);
      item.focus();
    },
    ArrowUp(event) {
      const li = findNode(event.currentTarget, 'parentElement', 'li');
      let item = findNode(
        li,
        'previousElementSibling',
        '[role="menuitem"]',
        true,
      );
      if (!item) {
        item = findNode(
          li,
          'parentElement',
          'ul',
        ).lastElementChild.querySelector('[role="menuitem"]');
      }
      event.currentTarget.setAttribute('tabIndex', -1);
      item.setAttribute('tabIndex', 0);
      item.focus();
    },
    ArrowLeft(event) {
      const li = findNode(event.currentTarget, 'parentElement', 'ul');
      const item = findNode(
        li,
        'previousElementSibling',
        '[role="menuitem"]',
        true,
      );
      if (item) {
        event.currentTarget.setAttribute('tabIndex', -1);
        item.setAttribute('tabIndex', 0);
        item.setAttribute('aria-expanded', false);
        item.focus();
      }
    },
    ArrowRight(event) {
      const item = findNode(
        event.currentTarget,
        'nextElementSibling',
        '[role="menuitem"]',
        true,
      );
      if (item) {
        event.currentTarget.setAttribute('tabIndex', -1);
        event.currentTarget.setAttribute('aria-expanded', true);
        item.setAttribute('tabIndex', 0);
        item.focus();
      }
    },
    Enter(event) {
      const item = findNode(
        event.currentTarget,
        'nextElementSibling',
        '[role="menuitem"]',
        true,
      );
      if (item) {
        event.currentTarget.setAttribute('tabIndex', -1);
        event.currentTarget.setAttribute('aria-expanded', true);
        item.setAttribute('tabIndex', 0);
        item.focus();
      }
    },
    Home(event) {
      const li = findNode(event.currentTarget, 'parentElement', 'li');
      const item = findNode(
        li,
        'parentElement',
        'ul',
      ).firstElementChild.querySelector('[role="menuitem"]');
      event.currentTarget.setAttribute('tabIndex', -1);
      item.setAttribute('tabIndex', 0);
      item.focus();
    },
    End(event) {
      const li = findNode(event.currentTarget, 'parentElement', 'li');
      const item = findNode(
        li,
        'parentElement',
        'ul',
      ).lastElementChild.querySelector('[role="menuitem"]');
      event.currentTarget.setAttribute('tabIndex', -1);
      item.setAttribute('tabIndex', 0);
      item.focus();
    },
    Escape(event) {
      const li = findNode(event.currentTarget, 'parentElement', 'ul');
      const item = findNode(
        li,
        'previousElementSibling',
        '[aria-haspopup="true"]',
        true,
      );
      if (item) {
        event.currentTarget.setAttribute('tabIndex', -1);
        item.setAttribute('tabIndex', 0);
        item.setAttribute('aria-expanded', false);
        item.focus();
      }
    },
    Space(event) {
      const item = findNode(
        event.currentTarget,
        'nextElementSibling',
        '[role="menuitem"]',
        true,
      );
      if (item) {
        event.currentTarget.setAttribute('tabIndex', -1);
        event.currentTarget.setAttribute('aria-expanded', true);
        item.setAttribute('tabIndex', 0);
        item.focus();
      }
    },
  };
  const buttonHandleClick = event => {
    setIsOpen(true);

    const item = event.currentTarget.nextElementSibling.querySelector(
      '[role="menuitem"]',
    );
    item.setAttribute('tabIndex', 0);
    item.focus();
  };

  const buttonHandleMouseEnter = id => event => {
    setIsOpen(true);
    setMousePath(getPathRef(id));
  };

  const buttonHandleMouseLeave = id => event => {
    const menu = document.querySelector(`[aria-labelledby=${id}]`);
    if (
      !menu ||
      !(event.relatedTarget instanceof HTMLElement) ||
      (menu !== event.relatedTarget && !menu.contains(event.relatedTarget))
    ) {
      setIsOpen(false);
      setMousePath('');
    }
  };

  const buttonKeyDownhandlers = {
    ArrowDown(event) {
      event.preventDefault();
      event.stopPropagation();
      setIsOpen(true);

      const item = event.currentTarget.nextElementSibling.querySelector(
        '[role="menuitem"]',
      );
      item.setAttribute('tabIndex', 0);
      item.focus();
    },
    ArrowUp(event) {
      event.preventDefault();
      event.stopPropagation();
      setIsOpen(true);
      const item = event.currentTarget.nextElementSibling.lastChild.querySelector(
        '[role="menuitem"]',
      );
      item.setAttribute('tabIndex', 0);
      item.focus();
    },
    Space(event) {
      event.preventDefault();
      event.stopPropagation();
      setIsOpen(true);
      const item = event.currentTarget.nextElementSibling.querySelector(
        '[role="menuitem"]',
      );
      item.setAttribute('tabIndex', 0);
      item.focus();
    },
    Enter(event) {
      event.preventDefault();
      event.stopPropagation();
      setIsOpen(true);
      const item = event.currentTarget.nextElementSibling.querySelector(
        '[role="menuitem"]',
      );
      item.setAttribute('tabIndex', 0);
      item.focus();
    },
  };

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
      ref: el => {
        setPathRef(id, getPath(el));
      },
      role: 'menuitem',
      tabIndex: isInPath(id) ? 0 : -1,
      onKeyDown: handleKey(itemKeyDownHandlers),
      onMouseEnter: buttonHandleMouseEnter(id),
      onMouseLeave: buttonHandleMouseLeave(id),
    };

    if (!hasPopup) {
      return returnProps;
    }

    return {
      'aria-haspopup': true,
      'aria-expanded': isInPath(id) ? true : false,
      ...returnProps,
    };
  };

  const getMenuButtonProps = ({ id } = {}) => {
    if (typeof id === 'undefined') {
      throw new Error('getMenuButtonProps requires an id');
    }
    return {
      id,
      'aria-haspopup': true,
      'aria-expanded': isOpen,
      ref: el => {
        setPathRef(id, getPath(el));
      },
      onKeyDown: handleKey(buttonKeyDownhandlers),
      onClick: buttonHandleClick,
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
