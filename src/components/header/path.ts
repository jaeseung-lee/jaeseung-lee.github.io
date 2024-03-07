export enum Path {
  ANIMATION,
  COMPONENT,
}

export const getPath = (path: Path) => {
  switch (path) {
    case Path.ANIMATION: {
      return "";
    }
    case Path.COMPONENT: {
      return "component";
    }
  }
};

export const pathToString = (path: Path) => {
  switch (path) {
    case Path.ANIMATION: {
      return "Animations";
    }
    case Path.COMPONENT: {
      return "Component";
    }
  }
};

export const textToPath = (text: string) => {
  switch (text) {
    case "component": {
      return Path.COMPONENT;
    }
    default: {
      return Path.ANIMATION;
    }
  }
};
