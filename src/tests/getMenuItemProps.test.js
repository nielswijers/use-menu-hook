import { setup, setupHook } from '../testUtils';
import { fireEvent } from '@testing-library/react';

describe('getMenuItemProps', () => {
  describe('hook props', () => {
    it('assigns `menuitem` to role', () => {
      const { result } = setupHook();
      const { role } = result.current.getMenuItemProps();
      expect(role).toBe('menuitem');
    });

    it('assigns `-1` to tabIndex', () => {
      const { result } = setupHook();
      const { tabIndex } = result.current.getMenuItemProps();
      expect(tabIndex).toBe(-1);
    });
  });

  describe('event handlers', () => {
    describe('key down handler', () => {
      it('activates menu item on `Space`', () => {
        const { getByTestId } = setup();
        const target = getByTestId('fruit');
        const expected = getByTestId('bananas');
        fireEvent.keyDown(target, { key: ' ' });
        expect(target.getAttribute('tabIndex')).toBe('-1');
        expect(expected.getAttribute('tabIndex')).toBe('0');
      });

      it('activates menu item on `Enter`', () => {
        const { getByTestId } = setup();
        const target = getByTestId('fruit');
        const expected = getByTestId('bananas');
        fireEvent.keyDown(target, { key: 'Enter' });
        expect(target.getAttribute('tabIndex')).toBe('-1');
        expect(expected.getAttribute('tabIndex')).toBe('0');
      });

      it('closes menu and moves focus to parent item on `Escape`', () => {
        const { getByTestId } = setup();
        const target = getByTestId('apples');
        const expected = getByTestId('fruit');
        fireEvent.keyDown(target, { key: 'Escape' });
        expect(target.getAttribute('tabIndex')).toBe('-1');
        expect(expected.getAttribute('tabIndex')).toBe('0');
      });

      it('opens the submenu and moves focus on the first item on `ArrowRight`', () => {
        const { getByTestId } = setup();
        const target = getByTestId('fruit');
        const expected = getByTestId('bananas');
        fireEvent.keyDown(target, { key: 'ArrowRight' });
        expect(target.getAttribute('tabIndex')).toBe('-1');
        expect(expected.getAttribute('tabIndex')).toBe('0');
      });

      it('closes submenu and focus to parent menu item on `ArrowLeft`', () => {
        const { getByTestId } = setup();
        const target = getByTestId('apples');
        const expected = getByTestId('fruit');
        fireEvent.keyDown(target, { key: 'ArrowLeft' });
        expect(target.getAttribute('tabIndex')).toBe('-1');
        expect(expected.getAttribute('tabIndex')).toBe('0');
      });

      it('moves focus to the next item in the submenu on `ArrowDown`', () => {
        const { getByTestId } = setup();
        const target = getByTestId('fruit');
        const expected = getByTestId('vegetables');
        fireEvent.keyDown(target, { key: 'ArrowDown' });
        expect(target.getAttribute('tabIndex')).toBe('-1');
        expect(expected.getAttribute('tabIndex')).toBe('0');
      });

      it('moves focus to the first item in the submenu if current is last item on `ArrowDown`', () => {
        const { getByTestId } = setup();
        const target = getByTestId('meat');
        const expected = getByTestId('fruit');
        fireEvent.keyDown(target, { key: 'ArrowDown' });
        expect(target.getAttribute('tabIndex')).toBe('-1');
        expect(expected.getAttribute('tabIndex')).toBe('0');
      });

      it('moves focus to previous item in the submenu on `ArrowUp`', () => {
        const { getByTestId } = setup();
        const target = getByTestId('meat');
        const expected = getByTestId('vegetables');
        fireEvent.keyDown(target, { key: 'ArrowUp' });
        expect(target.getAttribute('tabIndex')).toBe('-1');
        expect(expected.getAttribute('tabIndex')).toBe('0');
      });

      it('moves focus to the last item in the submenu if current is first item on `ArrowUp`', () => {
        const { getByTestId } = setup();
        const target = getByTestId('fruit');
        const expected = getByTestId('meat');
        fireEvent.keyDown(target, { key: 'ArrowUp' });
        expect(target.getAttribute('tabIndex')).toBe('-1');
        expect(expected.getAttribute('tabIndex')).toBe('0');
      });

      it('moves focus to the first item in the submenu on `Home`', () => {
        const { getByTestId } = setup();
        const target = getByTestId('pears');
        const expected = getByTestId('bananas');
        fireEvent.keyDown(target, { key: 'Home' });
        expect(target.getAttribute('tabIndex')).toBe('-1');
        expect(expected.getAttribute('tabIndex')).toBe('0');
      });

      it('Moves focus to the last item in the submenu on `End`', () => {
        const { getByTestId } = setup();
        const target = getByTestId('bananas');
        const expected = getByTestId('pears');
        fireEvent.keyDown(target, { key: 'End' });
        expect(target.getAttribute('tabIndex')).toBe('-1');
        expect(expected.getAttribute('tabIndex')).toBe('0');
      });
    });
  });
});
