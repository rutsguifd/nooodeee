import axios from "axios";
import * as publicHolidaysService from "./public-holidays.service";
import { PublicHolidayShort } from "../types";

jest.unmock("axios");

const assertContainsPublicHoliday = (holiday: PublicHolidayShort) => {
  expect(typeof holiday.date).toEqual("string");
  expect(holiday.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  expect(holiday.date).not.toBe("");
  expect(typeof holiday.localName).toBe("string");
  expect(holiday.localName).not.toBe("");
  expect(typeof holiday.name).toBe("string");
  expect(holiday.name).not.toBe("");
};

describe("public-holidays.service.ts - Integration Tests", () => {
  it("should get list of public holidays (integration test)", async () => {
    const result = await publicHolidaysService.getListOfPublicHolidays(
      2024,
      "DE"
    );

    result.forEach((holiday) => assertContainsPublicHoliday(holiday));
  });

  it("should check if today is a public holiday (integration test)", async () => {
    const result = await publicHolidaysService.checkIfTodayIsPublicHoliday(
      "GB"
    );

    expect(typeof result).toEqual("boolean");
  });

  it("should get the next public holidays (integration test)", async () => {
    const result = await publicHolidaysService.getNextPublicHolidays("FR");

    result.forEach((holiday) => assertContainsPublicHoliday(holiday));
  });
});
