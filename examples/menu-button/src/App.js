import React from 'react';
import { useMenu } from 'use-menu-hook';

function App() {
  const {
    getMenuItemProps,
    getMenuButtonProps,
    getMenuProps,
  } = useMenu();
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
            <li {...getMenuItemProps({ id: 'bananas' })}>
              <a  href="#bananas">
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
}

export default App;
