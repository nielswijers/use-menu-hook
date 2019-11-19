import * as changeTypes from './stateChangeTypes';
import { test } from './utils';
const rotate = (id, paths) => {
  const index = paths.findIndex(test(`${id}$`));
  return paths.slice(index).concat(paths.slice(0, index));
};

const parent = (id, paths) => paths.find(test(`${id}$`)).replace(`/${id}`, '');
const children = (id, paths) => paths.filter(test(`${id}/[a-zA-Z0-9]+$`));
const siblings = (id, paths) => children(parent(id, paths), paths);

export default function menuReducer(state, action) {
  const { paths } = state;
  const { type } = action;
  let changes;

  switch (type) {
    case changeTypes.SetPaths: {
      changes = {
        paths: action.paths,
      };
      break;
    }
    case changeTypes.ItemKeyDownArrowDown: {
      changes = {
        activeKeyPath: rotate(action.id, siblings(action.id, paths))[1],
      };
      break;
    }
    case changeTypes.ItemKeyDownArrowUp: {
      changes = {
        activeKeyPath: rotate(
          action.id,
          siblings(action.id, paths),
        ).reverse()[0],
      };
      break;
    }
    case changeTypes.ItemKeyDownArrowLeft: {
      changes = {
        activeKeyPath: parent(action.id, paths),
      };
      break;
    }
    case changeTypes.ItemKeyDownArrowRight: {
      changes = {
        activeKeyPath: children(action.id, paths)[0],
      };
      break;
    }
    case changeTypes.ItemKeyDownEnter: {
      changes = {
        activeKeyPath: children(action.id, paths)[0],
      };
      break;
    }
    case changeTypes.ItemKeyDownHome: {
      changes = {
        activeKeyPath: siblings(action.id, paths)[0],
      };
      break;
    }
    case changeTypes.ItemKeyDownEnd: {
      changes = {
        activeKeyPath: siblings(action.id, paths).reverse()[0],
      };
      break;
    }
    case changeTypes.ItemKeyDownEscape: {
      changes = {
        activeKeyPath: parent(action.id, paths),
      };
      break;
    }
    case changeTypes.ItemKeyDownSpace: {
      changes = {
        activeKeyPath: children(action.id, paths)[0],
      };
      break;
    }
    case changeTypes.ButtonKeyDownArrowDown: {
      changes = {
        activeKeyPath: children(action.id, paths)[0],
      };
      break;
    }
    case changeTypes.ButtonKeyDownArrowUp: {
      changes = {
        activeKeyPath: children(action.id, paths).reverse()[0],
      };
      break;
    }
    case changeTypes.ButtonKeyDownSpace: {
      changes = {
        activeKeyPath: children(action.id, paths)[0],
      };
      break;
    }
    case changeTypes.ButtonKeyDownEnter: {
      changes = {
        activeKeyPath: children(action.id, paths)[0],
      };
      break;
    }
    case changeTypes.SetActiveMousePath: {
      changes = {
        activeMousePath: paths.find(test(`${action.id}$`)),
      };
      break;
    }
    case changeTypes.ClearActiveMousePath: {
      changes = {
        activeMousePath: '',
      };
      break;
    }
    default: {
      throw new Error('Reducer called without proper action type.');
    }
  }

  return { ...state, ...changes };
}
