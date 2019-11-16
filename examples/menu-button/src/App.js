import React from 'react';
import './App.css';
import { useMenu } from 'use-menu-hook';

function App() {
  const { getMenuItemProps } = useMenu();

  return (
    <div className="App">
      <button aria-expanded={true} aria-haspopup={true}>
        Open me
      </button>
      <ul>
        <li>
          <a {...getMenuItemProps({ hasPopup: true })} href="#fruit">
            Fruit Fruit <span role="img" aria-label="open">👉🏿</span>
          </a>
          <ul>
            <li>
              <a {...getMenuItemProps()} href="#bananas">
                Bananas
              </a>
            </li>
            <li>
              <a {...getMenuItemProps({ hasPopup: true })} href="#apples">
                Apples <span role="img" aria-label="open">👉🏿</span>
              </a>
              <ul>
                <li>
                  <a {...getMenuItemProps()} href="#red">
                    Red
                  </a>
                </li>
                <li>
                  <a {...getMenuItemProps()} href="#green">
                    Green
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a {...getMenuItemProps()} href="#pears">
                Pears
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a {...getMenuItemProps()} href="#vegetables">
            Vegetables
          </a>
        </li>
        <li>
          <a {...getMenuItemProps()} href="#meat">
            Meat
          </a>
        </li>
      </ul>
    </div>
  );
}

export default App;
