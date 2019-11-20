import React, { createContext, useContext, useMemo } from 'react';
import ReactDOM from 'react-dom';
import useMenu from 'use-menu-hook';
import { Manager, Reference, Popper } from 'react-popper';
import './index.css';

let lastId = 0;
const useId = () => useMemo(() => ++lastId, []);

const MenuContext = createContext();

const ButtonMenu = ({ children, label }) => {
  const menu = useMenu();
  const { getMenuProps, getMenuButtonProps, isExpanded } = menu;
  const id = `menu_${useId()}`;
  return (
    <MenuContext.Provider value={menu}>
      <Manager>
        <Reference>
          {({ ref }) => (
            <button {...getMenuButtonProps({ id, ref })}>{label}</button>
          )}
        </Reference>
        <Popper placement="bottom-start">
          {({ ref, style, placement, scheduleUpdate }) => {
            requestAnimationFrame(scheduleUpdate);
            return (
              <ul
                {...getMenuProps({
                  labelledBy: id,
                  ref,
                  placement,
                  style: { ...style, display: !isExpanded(id) && 'none' },
                })}
              >
                {children}
              </ul>
            );
          }}
        </Popper>
      </Manager>
    </MenuContext.Provider>
  );
};

const MenuItem = ({ children, label }) => {
  const { getMenuProps, getMenuItemProps, isExpanded } = useContext(
    MenuContext,
  );
  const id = `menu_${useId()}`;
  return (
    <li>
      <Manager>
        <Reference>
          {({ ref }) => (
            <a {...getMenuItemProps({ id, ref, hasPopup: !!children })}>
              {label}
            </a>
          )}
        </Reference>
        {children && (
          <Popper
            placement="right-start"
            modifiers={{ offset: { offset: -4 } }}
          >
            {({ ref, style, placement, scheduleUpdate }) => {
              requestAnimationFrame(scheduleUpdate);
              return (
                <ul
                  {...getMenuProps({
                    labelledBy: id,
                    ref,
                    placement,
                    style: { ...style, display: !isExpanded(id) && 'none' },
                  })}
                >
                  {children}
                </ul>
              );
            }}
          </Popper>
        )}
      </Manager>
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
