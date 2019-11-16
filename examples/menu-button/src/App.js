import React from 'react';
import { useMenu } from 'use-menu-hook';

function App() {
  const { getMenuItemProps, getMenuButtonProps, getMenuRootProps } = useMenu();

  return (
    <div>
      <button data-testid="button" {...getMenuButtonProps({ id: 'button' })}>
        open menu
      </button>
      <ul data-testid="root" {...getMenuRootProps()}>
        <li>
          <a
            {...getMenuItemProps({ hasPopup: true, id: 'fruit' })}
            data-testid="fruit"
            href="#fruit"
          >
            Fruit
          </a>
          <ul>
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
              <ul>
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
}

export default App;
