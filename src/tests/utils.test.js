import React from 'react';
import { render } from '@testing-library/react';
import {
  getFirstChildPath, getFirstSiblingPath,
  getParentPath,
  getPathFromElement,
  getSiblingPath,
  rotateTo,
} from '../utils';

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

describe('utils', () => {
  describe('getPathElement', () => {
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
      expect(getPathFromElement(item)).toBe('root/submenu/item');
    });
  });

  describe('rotateTo', () => {
    it('rotates array to item', () => {
      expect(rotateTo(3, [1, 2, 3, 4, 5])).toEqual([3, 4, 5, 1, 2]);
    });
  });

  describe('getParentPath', () => {
    it('returns parent path', () => {
      expect(getParentPath('button/fruit/apples')).toBe('button/fruit');
    });
  });

  describe('getFirstChildPath', () => {
    it('returns first child path', () => {
      expect(getFirstChildPath('button/fruit', paths)).toBe('button/fruit/bananas');
    });
    it('returns last child path', () => {
      expect(getFirstChildPath('button/fruit', paths, true)).toBe('button/fruit/pears');
    });
  });

  describe('getFirstSiblingPath', () => {
    it('return first sibling path', () => {
      const result = getFirstSiblingPath('button/meat', paths);
      expect(result).toBe('button/fruit');
    });
    it('return last sibling path', () => {
      const result = getFirstSiblingPath('button/fruit', paths, true);
      expect(result).toBe('button/meat');
    });
  });

  describe('getSiblingPath', () => {
    it('returns next path', () => {
      const result = getSiblingPath('button/fruit', paths);
      expect(result).toBe('button/vegetables');
    });

    it('returns previous path', () => {
      const result = getSiblingPath('button/vegetables', paths, true);
      expect(result).toBe('button/fruit');
    });

    it('returns next path when last item', () => {
      const result = getSiblingPath('button/meat', paths);
      expect(result).toBe('button/fruit');
    });

    it('returns previous path when first item', () => {
      const result = getSiblingPath('button/fruit', paths, true);
      expect(result).toBe('button/meat');
    });
  });
});
