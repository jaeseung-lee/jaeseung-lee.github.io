import { expect, test } from "vitest";
import { Path, getPath, pathToString } from "./path";

test("Enum path should be stringified correctly", () => {
  expect(pathToString(Path.ANIMATION)).toBe("Animations");
  expect(pathToString(Path.PORTFOLIO)).toBe("Portfolio");

  expect(getPath(Path.ANIMATION)).toBe("");
  expect(getPath(Path.PORTFOLIO)).toBe("portfolio");
});
