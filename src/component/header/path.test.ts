import { expect, test } from "vitest";
import { Path, pathToString } from "./path";

test("Enum path should be stringified correctly", () => {
  expect(pathToString(Path.INDEX)).toBe("Home");
});
