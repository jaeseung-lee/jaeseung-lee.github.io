import { expect, test } from "vitest";
import { getBackImageIndex, getNextImageIndex } from "./ZoomSlideShowAnimation";

test("Get backward or forward index properly", () => {
  expect(getNextImageIndex(/* imageListLength-*/ 10, 1)).toBe(2);
  expect(getNextImageIndex(/* imageListLength-*/ 10, 9)).toBe(0);

  expect(getBackImageIndex(/* imageListLength-*/ 10, 0)).toBe(9);
  expect(getBackImageIndex(/* imageListLength-*/ 10, 9)).toBe(8);
});
