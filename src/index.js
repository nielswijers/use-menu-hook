import { findNode, normalizeKeys } from './utils';
import { useState } from 'react';

export const useMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

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
    const { hasPopup, ...p } = itemProps;
    const returnProps = {
      ...p,
      role: 'menuitem',
      tabIndex: -1,
      onKeyDown: handleKey(itemKeyDownHandlers),
    };

    if (!hasPopup) {
      return returnProps;
    }

    return { 'aria-haspopup': true, 'aria-expanded': false, ...returnProps };
  };

  const getMenuButtonProps = () => {
    return {
      'aria-haspopup': true,
      'aria-expanded': isOpen,
      onKeyDown: handleKey(buttonKeyDownhandlers),
    };
  };

  return { getMenuItemProps, getMenuButtonProps };
};
