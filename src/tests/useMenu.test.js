import { setupHook } from '../testUtils';

describe('useMenu', () => {
  describe('hook props', () => {
    it('provides prop getters as functions', () => {
      const { result } = setupHook();
      expect(result.current.getMenuItemProps).toBeInstanceOf(Function);
    });
  });
});
