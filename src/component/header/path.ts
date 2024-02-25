export enum Path {
  INDEX,
}

export const pathToString = (path: Path) => {
  switch (path) {
    case Path.INDEX: {
      return "Home";
    }
  }
};
