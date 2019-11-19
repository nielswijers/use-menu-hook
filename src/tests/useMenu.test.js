import { setupHook } from '../testUtils';

describe('useMenu', () => {
  describe('hook props', () => {
    it('provides helper functions', () => {
      const {result} = setupHook();
      expect(result.current.isFocussed).toBeInstanceOf(Function)
      expect(result.current.isExpanded).toBeInstanceOf(Function)
    });

    it('provides prop getters as functions', () => {
      const { result } = setupHook();
      expect(result.current.getMenuItemProps).toBeInstanceOf(Function);
      expect(result.current.getMenuButtonProps).toBeInstanceOf(Function);
      expect(result.current.getMenuProps).toBeInstanceOf(Function);
    });
  });
});
