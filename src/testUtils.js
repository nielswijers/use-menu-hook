import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useMenu } from './index';
import { render } from '@testing-library/react';

export const setupHook = props => renderHook(() => useMenu(props));
export const Menu = props => {
  const {
    getMenuItemProps,
    getMenuButtonProps,
    getMenuRootProps,
    getMenuProps,
  } = useMenu(props);
  return (
    <div>
      <button data-testid="button" {...getMenuButtonProps({ id: 'button' })}>
        open menu
      </button>
      <ul data-testid="root" {...getMenuProps({ labelledBy: 'button' })}>
        <li>
          <a
            {...getMenuItemProps({ hasPopup: true, id: 'fruit' })}
            data-testid="fruit"
            href="#fruit"
          >
            Fruit
          </a>
          <ul {...getMenuProps({ labelledBy: 'fruit' })}>
            <li>
              <a
                {...getMenuItemProps({ id: 'bananas' })}
                data-testid="bananas"
                href="#bananas"
              >
                Bananas
              </a>
            </li>
            <li>
              <a
                {...getMenuItemProps({ hasPopup: true, id: 'apples' })}
                data-testid="apples"
                href="#apples"
              >
                Apples
              </a>
              <ul {...getMenuProps({ labelledBy: 'apples' })}>
                <li>
                  <a
                    {...getMenuItemProps({ id: 'red' })}
                    data-testid="red"
                    href="#red"
                  >
                    Red
                  </a>
                </li>
                <li>
                  <a
                    {...getMenuItemProps({ id: 'green' })}
                    data-testid="green"
                    href="#green"
                  >
                    Green
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a
                {...getMenuItemProps({ id: 'pears' })}
                data-testid="pears"
                href="#pears"
              >
                Pears
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a
            {...getMenuItemProps({ id: 'vegetables' })}
            data-testid="vegetables"
            href="#vegetables"
          >
            Vegetables
          </a>
        </li>
        <li>
          <a
            {...getMenuItemProps({ id: 'meat' })}
            data-testid="meat"
            href="#meat"
          >
            Meat
          </a>
        </li>
      </ul>
    </div>
  );
};
export const setup = props => render(<Menu {...props} />);
