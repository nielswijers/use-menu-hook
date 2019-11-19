import { setup, setupHook } from '../testUtils';
import { fireEvent, act } from '@testing-library/react';

const paths = [
  'button',
  'button/fruit',
  'button/fruit/bananas',
  'button/fruit/apples',
  'button/fruit/apples/red',
  'button/fruit/apples/green',
  'button/fruit/pears',
  'button/vegetables',
  'button/meat',
];
const itemProps = { id: 'someid' };

describe('getMenuItemProps', () => {
  describe('hook props', () => {
    it('throws if no id is provided', () => {
      const { result } = setupHook();
      expect(() => {
        result.current.getMenuItemProps();
      }).toThrow('getMenuItemProps requires an id');
    });

    it('assigns the id', () => {
      const { result } = setupHook();
      const props = result.current.getMenuItemProps(itemProps);
      expect(props.id).toBe('someid');
    });

    it('assigns `menuitem` to role', () => {
      const { result } = setupHook();
      const props = result.current.getMenuItemProps(itemProps);
      expect(props.role).toBe('menuitem');
    });

    it('assigns `-1` to tabIndex', () => {
      const { result } = setupHook();
      const props = result.current.getMenuItemProps(itemProps);
      expect(props.tabIndex).toBe(-1);
    });

    it('assigns `0` to tabIndex if focussed', () => {
      const { result } = setupHook({ paths, activeKeyPath: 'button/fruit' });
      const props = result.current.getMenuItemProps({ id: 'fruit' });
      expect(props.tabIndex).toBe(0);
    });
    describe('no popup', () => {
      it('does not assign aria-expanded', () => {
        const { result } = setupHook();
        const props = result.current.getMenuItemProps(itemProps);
        expect(props['aria-expanded']).toBeUndefined();
      });

      it('does not assign aria-haspopup', () => {
        const { result } = setupHook();
        const props = result.current.getMenuItemProps(itemProps);
        expect(props['aria-haspopup']).toBeUndefined();
      });
    });

    describe('has popup', () => {
      it('assigns `true` to aria-haspopup', () => {
        const { result } = setupHook();
        const props = result.current.getMenuItemProps({
          hasPopup: true,
          id: 'someid',
        });
        expect(props['aria-haspopup']).toBe(true);
      });

      it('assigns `false` aria-expanded', () => {
        const { result } = setupHook();
        const props = result.current.getMenuItemProps({
          hasPopup: true,
          id: 'someid',
        });
        expect(props['aria-expanded']).toBe(false);
      });

      it('assigns `true` aria-expanded if expanded', () => {
        const { result } = setupHook({
          paths,
          activeKeyPath: 'menu/fruit/bananas',
        });
        const props = result.current.getMenuItemProps({
          hasPopup: true,
          id: 'fruit',
        });
        expect(props['aria-expanded']).toBe(true);
      });
    });
  });

  describe('event handlers', () => {
    describe('key down handler', () => {
      it('activates menu item on `Space`', () => {
        const { getByText } = setup();
        fireEvent.keyDown(getByText('Fruit'), { key: ' ' });
        expect(document.activeElement === getByText('Bananas')).toBe(true);
      });

      it('activates menu item on `Enter`', () => {
        const { getByText } = setup();
        fireEvent.keyDown(getByText('Fruit'), { key: 'Space' });
        expect(document.activeElement === getByText('Bananas')).toBe(true);
      });

      it('closes menu and moves focus to parent item on `Escape`', () => {
        const { getByText } = setup();
        const target = getByText('Apples');
        const expected = getByText('Fruit');
        fireEvent.keyDown(target, { key: 'Escape' });
        expect(target.getAttribute('tabIndex')).toBe('-1');
        expect(expected.getAttribute('tabIndex')).toBe('0');
        expect(document.activeElement).toBe(expected);
      });

      it('opens the submenu and moves focus on the first item on `ArrowRight`', () => {
        const { getByText } = setup();
        const target = getByText('Fruit');
        const expected = getByText('Bananas');
        fireEvent.keyDown(target, { key: 'ArrowRight' });
        expect(target.getAttribute('tabIndex')).toBe('-1');
        expect(expected.getAttribute('tabIndex')).toBe('0');
        expect(document.activeElement).toBe(expected);
      });

      it('closes submenu and focus to parent menu item on `ArrowLeft`', () => {
        const { getByText } = setup();
        const target = getByText('Apples');
        const expected = getByText('Fruit');
        fireEvent.keyDown(target, { key: 'ArrowLeft' });
        expect(target.getAttribute('tabIndex')).toBe('-1');
        expect(expected.getAttribute('tabIndex')).toBe('0');
        expect(document.activeElement).toBe(expected);
      });

      it('moves focus to the next item in the submenu on `ArrowDown`', () => {
        const { getByText } = setup();
        const target = getByText('Fruit');
        const expected = getByText('Vegetables');
        fireEvent.keyDown(target, { key: 'ArrowDown' });
        expect(document.activeElement).toBe(expected);
      });

      it('moves focus to the first item in the submenu if current is last item on `ArrowDown`', () => {
        const { getByText } = setup();
        const target = getByText('Meat');
        const expected = getByText('Fruit');
        fireEvent.keyDown(target, { key: 'ArrowDown' });
        expect(target.getAttribute('tabIndex')).toBe('-1');
        expect(expected.getAttribute('tabIndex')).toBe('0');
        expect(document.activeElement).toBe(expected);
      });

      it('moves focus to previous item in the submenu on `ArrowUp`', () => {
        const { getByText } = setup();
        const target = getByText('Meat');
        const expected = getByText('Vegetables');
        fireEvent.keyDown(target, { key: 'ArrowUp' });
        expect(document.activeElement).toBe(expected);
      });

      it('moves focus to the last item in the submenu if current is first item on `ArrowUp`', () => {
        const { getByText } = setup();
        const target = getByText('Fruit');
        const expected = getByText('Meat');
        fireEvent.keyDown(target, { key: 'ArrowUp' });
        expect(target.getAttribute('tabIndex')).toBe('-1');
        expect(expected.getAttribute('tabIndex')).toBe('0');
        expect(document.activeElement).toBe(expected);
      });

      it('moves focus to the first item in the submenu on `Home`', () => {
        const { getByText } = setup();
        const target = getByText('Meat');
        const expected = getByText('Fruit');
        fireEvent.keyDown(target, { key: 'Home' });
        expect(target.getAttribute('tabIndex')).toBe('-1');
        expect(expected.getAttribute('tabIndex')).toBe('0');
        expect(document.activeElement).toBe(expected);
      });

      it('Moves focus to the last item in the submenu on `End`', () => {
        const { getByText } = setup();
        const target = getByText('Fruit');
        const expected = getByText('Meat');
        fireEvent.keyDown(target, { key: 'End' });
        expect(target.getAttribute('tabIndex')).toBe('-1');
        expect(expected.getAttribute('tabIndex')).toBe('0');
        expect(document.activeElement).toBe(expected);
      });
    });
  });
});
