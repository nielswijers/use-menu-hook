import { setup, setupHook } from '../testUtils';
import { fireEvent } from '@testing-library/react';

describe('getMenuButtonProps', () => {
  describe('hook props', () => {
    it('assigns false to aria-expanded`', () => {
      const { result } = setupHook();
      const props = result.current.getMenuButtonProps();
      expect(props['aria-expanded']).toBe(false);
    });

    it('assigns true to aria-haspopup`', () => {
      const { result } = setupHook();
      const props = result.current.getMenuButtonProps();
      expect(props['aria-haspopup']).toBe(true);
    });
  });

  describe('event handlers', () => {
    describe('keydown handlers', () => {
      it('opens menu and moves focus to first menuitem on `ArrowDown`', () => {
        const { getByTestId } = setup();
        const button = getByTestId('button');
        const item = getByTestId('fruit');
        fireEvent.keyDown(button, { key: 'ArrowDown' });
        expect(button.getAttribute('aria-expanded')).toBe('true');
        expect(document.activeElement).toBe(item)
      });
      it('opens menu and moves focus to first menuitem on `Space`', () => {
        const { getByTestId } = setup();
        const button = getByTestId('button');
        const item = getByTestId('fruit');
        fireEvent.keyDown(button, { key: ' ' });
        expect(button.getAttribute('aria-expanded')).toBe('true');
        expect(document.activeElement).toBe(item)
      });
      it('opens menu and moves focus to first menuitem on `Enter`', () => {
        const { getByTestId } = setup();
        const button = getByTestId('button');
        const item = getByTestId('fruit');
        fireEvent.keyDown(button, { key: 'Enter' });
        expect(button.getAttribute('aria-expanded')).toBe('true');
        expect(document.activeElement).toBe(item)
      });
      it('opens menu and moves focus to last menuitem on `ArrowUp`', () => {
        const { getByTestId } = setup();
        const button = getByTestId('button');
        const item = getByTestId('meat');
        fireEvent.keyDown(button, { key: 'ArrowUp' });
        expect(button.getAttribute('aria-expanded')).toBe('true');
        expect(document.activeElement).toBe(item)
      });
    });
  });
});
