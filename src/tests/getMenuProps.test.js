import { setupHook } from '../testUtils';

describe('getMenuProps', () => {
  describe('hook props', () => {
    it('assigns labelledBy', () => {
      const { result } = setupHook();
      expect(() => {
        result.current.getMenuProps();
      }).toThrow('labelledBy is required');
    });

    it('assigns labelledBy', () => {
      const { result } = setupHook();
      const props = result.current.getMenuProps({ labelledBy: 'someid' });
      expect(props['aria-labelledby']).toBe('someid');
    });

    it('passes the props', () => {
      const { result } = setupHook();
      const props = result.current.getMenuProps({
        labelledBy: 'someid',
        someProp: 1,
      });
      expect(props.someProp).toBe(1);
    });

    it('assigns `menu` to role', () => {
      const { result } = setupHook();
      const props = result.current.getMenuProps({ labelledBy: 'someid' });
      expect(props.role).toBe('menu');
    });
  });
});
