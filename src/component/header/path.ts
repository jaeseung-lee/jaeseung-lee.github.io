export enum Path {
  ANIMATION,
  PORTFOLIO,
}

export const getPath = (path: Path) => {
  switch (path) {
    case Path.ANIMATION: {
      return "";
    }
    case Path.PORTFOLIO: {
      return "portfolio";
    }
  }
};

export const pathToString = (path: Path) => {
  switch (path) {
    case Path.ANIMATION: {
      return "Animations";
    }
    case Path.PORTFOLIO: {
      return "Portfolio";
    }
  }
};
