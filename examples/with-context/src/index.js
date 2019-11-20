import React, { createContext, useContext, useMemo } from 'react';
import ReactDOM from 'react-dom';
import useMenu from 'use-menu-hook';
import './index.css';

let lastId = 0;
const useId = () => useMemo(() => ++lastId, []);

const MenuContext = createContext();

const ButtonMenu = ({ label, children }) => {
  const menu = useMenu();
  const id = `menu_${useId()}`;
  return (
    <MenuContext.Provider value={menu}>
      <button {...menu.getMenuButtonProps({ id, hasPopup: !!children })}>
        {label}
      </button>
      {children && (
        <ul {...menu.getMenuProps({ labelledBy: id })}>{children}</ul>
      )}
    </MenuContext.Provider>
  );
};

const MenuItem = ({ label, children }) => {
  const { getMenuItemProps, getMenuProps } = useContext(MenuContext);
  const id = `item_${useId()}`;
  return (
    <li role="none">
      <a href={`#${label}`} {...getMenuItemProps({ id, hasPopup: !!children })}>
        {label}
      </a>
      {children && <ul {...getMenuProps({ labelledBy: id })}>{children}</ul>}
    </li>
  );
};

function App() {
  return (
    <div>
      <ButtonMenu label="Food">
        <MenuItem label="Fruit">
          <MenuItem label="Bananas" />
          <MenuItem label="Apples">
            <MenuItem label="Red" />
            <MenuItem label="Green" />
          </MenuItem>
          <MenuItem label="Pears" />
        </MenuItem>
        <MenuItem label="Vegetables" />
        <MenuItem label="Meat" />
      </ButtonMenu>
    </div>
  );
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
