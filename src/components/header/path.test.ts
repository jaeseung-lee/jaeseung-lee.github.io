import { expect, test } from "vitest";
import { Path, getPath, pathToString, textToPath } from "./path";

test("Enum path should be stringified correctly", () => {
  expect(pathToString(Path.ANIMATION)).toBe("Animations");
  expect(pathToString(Path.PORTFOLIO)).toBe("Portfolio");

  expect(getPath(Path.ANIMATION)).toBe("");
  expect(getPath(Path.PORTFOLIO)).toBe("portfolio");

  expect(textToPath("")).toBe(Path.ANIMATION);
  expect(textToPath("abc")).toBe(Path.ANIMATION);
  expect(textToPath("portfolio")).toBe(Path.PORTFOLIO);
});
