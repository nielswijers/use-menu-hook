import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';
import useMenu from './';

export const setupHook = props => renderHook(() => useMenu(props));
export const Menu = props => {
  const { getMenuItemProps, getMenuButtonProps, getMenuProps } = useMenu(props);
  return (
    <div>
      <button {...getMenuButtonProps({ id: 'button' })}>Food</button>
      <ul {...getMenuProps({ labelledBy: 'button' })}>
        <li>
          <a
            {...getMenuItemProps({ hasPopup: true, id: 'fruit' })}
            href="#fruit"
          >
            Fruit
          </a>
          <ul {...getMenuProps({ labelledBy: 'fruit' })}>
            <li>
              <a {...getMenuItemProps({ id: 'bananas' })} href="#bananas">
                Bananas
              </a>
            </li>
            <li>
              <a
                {...getMenuItemProps({ hasPopup: true, id: 'apples' })}
                href="#apples"
              >
                Apples
              </a>
              <ul {...getMenuProps({ labelledBy: 'apples' })}>
                <li>
                  <a {...getMenuItemProps({ id: 'red' })} href="#red">
                    Red
                  </a>
                </li>
                <li>
                  <a {...getMenuItemProps({ id: 'green' })} href="#green">
                    Green
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a {...getMenuItemProps({ id: 'pears' })} href="#pears">
                Pears
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a {...getMenuItemProps({ id: 'vegetables' })} href="#vegetables">
            Vegetables
          </a>
        </li>
        <li>
          <a {...getMenuItemProps({ id: 'meat' })} href="#meat">
            Meat
          </a>
        </li>
      </ul>
    </div>
  );
};
export const setup = props => render(<Menu {...props} />);
