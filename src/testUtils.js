import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useMenu } from './index';
import { render } from '@testing-library/react';

export const setupHook = props => renderHook(() => useMenu(props));
export const Menu = props => {
  const { getMenuItemProps } = useMenu(props);
  return (
    <div>
      <button aria-haspopup="true" aria-expanded="true">
        open menu
      </button>
      <ul>
        <li>
          <a
            {...getMenuItemProps({ hasPopup: true })}
            data-testid="fruit"
            href="#"
          >
            Fruit 👉🏿
          </a>
          <ul>
            <li>
              <a {...getMenuItemProps()} data-testid="bananas" href="#">
                Bananas
              </a>
            </li>
            <li>
              <a
                {...getMenuItemProps({ hasPopup: true })}
                data-testid="apples"
                href="#"
              >
                Apples 👉🏿
              </a>
              <ul>
                <li>
                  <a {...getMenuItemProps()} data-testid="red" href="#">
                    Red
                  </a>
                </li>
                <li>
                  <a {...getMenuItemProps()} data-testid="green" href="#">
                    Green
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a {...getMenuItemProps()} data-testid="pears" href="#">
                Pears
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a {...getMenuItemProps()} data-testid="vegetables" href="#">
            Vegetables
          </a>
        </li>
        <li>
          <a {...getMenuItemProps()} data-testid="meat" href="#">
            Meat
          </a>
        </li>
      </ul>
    </div>
  );
};
export const setup = props => render(<Menu {...props} />);
