import { setup, setupHook } from '../testUtils';
import { fireEvent } from '@testing-library/react';

const itemProps = { id: 'Food' };
describe('getMenuButtonProps', () => {
  describe('hook props', () => {
    it('throws if no id provided', () => {
      const { result } = setupHook();
      expect(() => {
        result.current.getMenuButtonProps();
      }).toThrow('getMenuButtonProps requires an id');
    });

    it('assigns the id`', () => {
      const { result } = setupHook();
      const props = result.current.getMenuButtonProps(itemProps);
      expect(props.id).toBe('Food');
    });
    it('passes the props', () => {
      const { result } = setupHook();
      const props = result.current.getMenuButtonProps({
        id: 'someid',
        someProp: 1,
      });
      expect(props.someProp).toBe(1);
    });
    it('assigns false to aria-expanded`', () => {
      const { result } = setupHook();
      const props = result.current.getMenuButtonProps(itemProps);
      expect(props['aria-expanded']).toBe(false);
    });

    it('assigns true to aria-haspopup`', () => {
      const { result } = setupHook();
      const props = result.current.getMenuButtonProps(itemProps);
      expect(props['aria-haspopup']).toBe(true);
    });
  });

  describe('event handlers', () => {
    describe('mouse enter handler', () => {
      it('opens the corresponding menu', () => {
        const { getByText, getByLabelText } = setup();
        const button = getByText('Food');
        const menu = getByLabelText('Food');
        fireEvent.mouseEnter(button);
        expect(menu.style.display).toBe('');
      });
    });

    describe('mouse leave handler', () => {
      it('closes the menu', () => {
        const { getByText } = setup();
        const button = getByText('Food');
        fireEvent.mouseEnter(button);
        fireEvent.mouseLeave(button, { relatedTarget: document.body });
        expect(button.getAttribute('aria-expanded')).toBe('false');
      });

      it('does not close the menu if mouse is over it', () => {
        const { getByText, getByLabelText } = setup();
        const button = getByText('Food');
        const menu = getByLabelText('Food');
        fireEvent.mouseEnter(button);
        fireEvent.mouseLeave(button, { relatedTarget: menu });
        expect(menu.style.display).toBe('');
        expect(button.getAttribute('aria-expanded')).toBe('true');
      });
    });

    describe('keydown handlers', () => {
      it('opens menu and moves focus to first menuitem on `ArrowDown`', () => {
        const { getByText } = setup();
        const button = getByText('Food');
        const item = getByText('Fruit');
        fireEvent.keyDown(button, { key: 'ArrowDown' });
        expect(button.getAttribute('aria-expanded')).toBe('true');
        expect(document.activeElement).toBe(item);
      });
      it('opens menu and moves focus to first menuitem on `Space`', () => {
        const { getByText } = setup();
        const button = getByText('Food');
        const item = getByText('Fruit');
        fireEvent.keyDown(button, { key: ' ' });
        expect(button.getAttribute('aria-expanded')).toBe('true');
        expect(document.activeElement).toBe(item);
      });
      it('opens menu and moves focus to first menuitem on `Enter`', () => {
        const { getByText } = setup();
        const button = getByText('Food');
        const item = getByText('Fruit');
        fireEvent.keyDown(button, { key: 'Enter' });
        expect(button.getAttribute('aria-expanded')).toBe('true');
        expect(document.activeElement).toBe(item);
      });
      it('opens menu and moves focus to last menuitem on `ArrowUp`', () => {
        const { getByText } = setup();
        const button = getByText('Food');
        const item = getByText('Meat');
        fireEvent.keyDown(button, { key: 'ArrowUp' });
        expect(button.getAttribute('aria-expanded')).toBe('true');
        expect(document.activeElement).toBe(item);
      });
    });
  });
});
