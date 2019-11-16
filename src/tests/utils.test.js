import React from 'react';
import { render } from '@testing-library/react';
import { getPath } from '../utils';

describe('utils', () => {
  describe('getPath', () => {
    it('gets path from element', () => {
      const { getByTestId } = render(
        <ul aria-labelledby="root">
          <ul aria-labelledby="submenu">
            <li>
              <a href="#item" data-testid="item" id="item">
                item
              </a>
            </li>
          </ul>
        </ul>,
      );
      const item = getByTestId('item');
      expect(getPath(item)).toBe('root/submenu/item')
    });
  });
});
