import { validateInput, shortenPublicHoliday } from "./helpers";

describe("helpers.ts", () => {
  describe("validateInput", () => {
    it("should throw an error for an unsupported country", () => {
      expect(() => validateInput({ country: "UnsupportedCountry" })).toThrow(
        "Country provided is not supported"
      );
    });

    it("should throw an error for a non-current year", () => {
      expect(() => validateInput({ year: 2021 })).toThrow(
        "Year provided not the current"
      );
    });

    it("should not throw an error for valid input", () => {
      expect(() => validateInput({ country: "DE", year: 2024 })).not.toThrow();
    });
  });

  describe("shortenPublicHoliday", () => {
    it("should shorten a public holiday", () => {
      const publicHoliday = {
        name: "Holiday1",
        localName: "LocalHoliday1",
        date: "2022-01-01",
        countryCode: "DE",
        fixed: true,
        global: false,
        counties: ["Berlin"],
        launchYear: 2022,
        types: ["Type1", "Type2"],
      };
      const result = shortenPublicHoliday(publicHoliday);
      expect(result).toEqual({
        name: "Holiday1",
        localName: "LocalHoliday1",
        date: "2022-01-01",
      });
    });
  });
});
