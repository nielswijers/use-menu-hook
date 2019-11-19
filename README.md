# useMenu
![npm bundle size](https://img.shields.io/bundlephobia/min/use-menu-hook)
![npm](https://img.shields.io/npm/v/use-menu-hook)
## The problem

You need an menu experience in your application and you want it to be
accessible. You also want it to be simple and flexible to account for your use
cases.

## This solution
`useMenu` is a React hook that provides all the logic to create a WAI-ARIA menu component.

## Installation
```
npm install use-menu-hook --save

// or
yarn add use-menu-hook
```
> This packages depends on react, Please make sure you installed react as well.

## Usage 
> [Try it in the browser](https://codesandbox.io/s/fervent-tesla-o68gp)
```
import useMenu from "use-menu-hook";

function MenuButton() {
  const { getMenuButtonProps, getMenuItemProps, getMenuProps } = useMenu();

  return (
    <div className="App">
      <button {...getMenuButtonProps({ id: "colors" })}>Colors</button>
      <ul {...getMenuProps({ labelledBy: "colors" })}>
        <li {...getMenuItemProps({ id: "red" })}>Red</li>
        <li {...getMenuItemProps({ id: "green" })}>Green</li>
        <li {...getMenuItemProps({ id: "blue" })}>Blue</li>
      </ul>
    </div>
  );
}
```

## More Examples

- [Menu button](https://codesandbox.io/s/github/nielswijers/use-menu-hook/tree/master/examples/menu-button)

## Inspiration
- [Navigation Menu Button Example](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html)
- [Navigation Menubar Example](https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-1/menubar-1.html)
- [useSelect](https://github.com/downshift-js/downshift/tree/master/src/hooks/useSelect)
