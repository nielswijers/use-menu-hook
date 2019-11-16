import { setupHook } from '../testUtils';

describe('getMenuRootProps', () => {
  describe('hook props', () => {
    it('assigns `menu` to role', () => {
      const { result } = setupHook();
      const props = result.current.getMenuRootProps();
      expect(props.role).toBe('menu');
    });
  });
});
