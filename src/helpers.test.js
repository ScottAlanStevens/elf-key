const { buildBytes } = require("./helpers");

const cases = [
  ["4321", [[6, 4, 33, 32, 31, 30, 0, 0]]],
  ["54321", [[7, 4, 34, 33, 32, 31, 30, 0]]],
  ["654321", [[8, 4, 35, 34, 33, 32, 31, 30]]],
  [
    "7654321",
    [
      [9, 4, 36, 35, 34, 33, 32, 31],
      [30, 0, 0, 0, 0, 0, 0, 0],
    ],
  ],
  [
    "87654321",
    [
      [10, 4, 37, 36, 35, 34, 33, 32],
      [31, 30, 0, 0, 0, 0, 0, 0],
    ],
  ],
];

test.each(cases)(
  "'buildBytes' builds bytes %s",
  (testInput, expectedResult) => {
    // act
    const result = buildBytes(testInput);

    // assert
    expect(result).toStrictEqual(expectedResult);
  }
);
