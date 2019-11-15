import { findNode, normalizeKeys } from './utils';

export const useMenu = () => {
  const keyDownHandlers = {
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
      onKeyDown: handleKey(keyDownHandlers),
    };

    if (!hasPopup) {
      return returnProps;
    }

    return { 'aria-haspopup': false, 'aria-expanded': false, ...returnProps };
  };

  return { getMenuItemProps };
};
