import { setup, setupHook } from '../testUtils';
import { fireEvent } from '@testing-library/react';

const itemProps = { id: 'button' };
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
      expect(props.id).toBe('button');
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
    describe('click handler', () => {
      it('opens menu and moves focus to first menuitem on `ArrowDown`', () => {
        const { getByTestId } = setup();
        const button = getByTestId('button');
        const item = getByTestId('fruit');
        fireEvent.click(button);
        expect(button.getAttribute('aria-expanded')).toBe('true');
        expect(document.activeElement).toBe(item);
      });
    });

    describe('mouse enter handler', () => {
      it('opens the menu', () => {
        const { getByTestId } = setup();
        const button = getByTestId('button');
        fireEvent.mouseEnter(button);
        expect(button.getAttribute('aria-expanded')).toBe('true');
      });
    });

    describe('mouse leave handler', () => {
      it('closes the menu', () => {
        const { getByTestId } = setup({ isOpen: true });
        const button = getByTestId('button');
        fireEvent.mouseLeave(button);
        expect(button.getAttribute('aria-expanded')).toBe('false');
      });

      it('does not close the menu if mouse is over', () => {
        const { getByTestId } = setup({ isOpen: true });
        const button = getByTestId('button');
        const root = getByTestId('root');
        fireEvent.mouseLeave(button);
        fireEvent.mouseEnter(root);
        expect(button.getAttribute('aria-expanded')).toBe('true');
      });
    });

    describe('keydown handlers', () => {
      it('opens menu and moves focus to first menuitem on `ArrowDown`', () => {
        const { getByTestId } = setup();
        const button = getByTestId('button');
        const item = getByTestId('fruit');
        fireEvent.keyDown(button, { key: 'ArrowDown' });
        expect(button.getAttribute('aria-expanded')).toBe('true');
        expect(document.activeElement).toBe(item);
      });
      it('opens menu and moves focus to first menuitem on `Space`', () => {
        const { getByTestId } = setup();
        const button = getByTestId('button');
        const item = getByTestId('fruit');
        fireEvent.keyDown(button, { key: ' ' });
        expect(button.getAttribute('aria-expanded')).toBe('true');
        expect(document.activeElement).toBe(item);
      });
      it('opens menu and moves focus to first menuitem on `Enter`', () => {
        const { getByTestId } = setup();
        const button = getByTestId('button');
        const item = getByTestId('fruit');
        fireEvent.keyDown(button, { key: 'Enter' });
        expect(button.getAttribute('aria-expanded')).toBe('true');
        expect(document.activeElement).toBe(item);
      });
      it('opens menu and moves focus to last menuitem on `ArrowUp`', () => {
        const { getByTestId } = setup();
        const button = getByTestId('button');
        const item = getByTestId('meat');
        fireEvent.keyDown(button, { key: 'ArrowUp' });
        expect(button.getAttribute('aria-expanded')).toBe('true');
        expect(document.activeElement).toBe(item);
      });
    });
  });
});
