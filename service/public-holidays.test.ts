import axios from "axios";
import * as publicHolidaysService from "./public-holidays.service";
import { shortenPublicHoliday } from "../helpers/helpers";
import { PublicHoliday } from "../types";

jest.mock("axios");

describe("public-holidays.service.ts", () => {
  it("should get list of public holidays", async () => {
    const mockedPublicHolidays: PublicHoliday[] = [
      {
        name: "Holiday1",
        localName: "LocalHoliday1",
        date: "2022-01-01",
        countryCode: "DE",
        fixed: true,
        global: false,
        counties: ["Berlin"],
        launchYear: 2022,
        types: ["Type1", "Type2"],
      },
      {
        name: "Holiday2",
        localName: "LocalHoliday2",
        date: "2022-02-01",
        countryCode: "DE",
        fixed: true,
        global: false,
        counties: ["Bavaria"],
        launchYear: null,
        types: ["Type3"],
      },
    ];

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: mockedPublicHolidays,
    });

    const result = await publicHolidaysService.getListOfPublicHolidays(
      2024,
      "DE"
    );

    expect(result).toEqual(mockedPublicHolidays.map(shortenPublicHoliday));
  });

  it("should handle an error when getting list of public holidays", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(
      new Error("API error")
    );

    const result = await publicHolidaysService.getListOfPublicHolidays(
      2024,
      "DE"
    );

    expect(result).toEqual([]);
  });

  it("should check if today is a public holiday", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      status: 200,
    });

    const result = await publicHolidaysService.checkIfTodayIsPublicHoliday(
      "GB"
    );

    expect(result).toBeTruthy();
  });

  it("should get the next public holidays", async () => {
    const mockedNextPublicHolidays: PublicHoliday[] = [
      {
        name: "Next Holiday1",
        localName: "Next LocalHoliday1",
        date: "2022-01-01",
        countryCode: "DE",
        fixed: true,
        global: false,
        counties: ["Berlin"],
        launchYear: 2022,
        types: ["Type1", "Type2"],
      },
      {
        name: "Next Holiday2",
        localName: "Next LocalHoliday2",
        date: "2022-02-01",
        countryCode: "DE",
        fixed: true,
        global: false,
        counties: ["Bavaria"],
        launchYear: null,
        types: ["Type3"],
      },
    ];
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: mockedNextPublicHolidays,
    });

    const result = await publicHolidaysService.getNextPublicHolidays("FR");

    expect(result).toEqual(mockedNextPublicHolidays.map(shortenPublicHoliday));
  });

  it("should handle an error when checking if today is a public holiday", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(
      new Error("API error")
    );

    const result = await publicHolidaysService.checkIfTodayIsPublicHoliday(
      "GB"
    );

    expect(result).toBeFalsy();
  });

  it("should handle an error when getting the next public holidays", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(
      new Error("API error")
    );

    const result = await publicHolidaysService.getNextPublicHolidays("FR");

    expect(result).toEqual([]);
  });

  it("should handle an error when getting the next public holidays", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(
      new Error("API error")
    );

    const result = await publicHolidaysService.getNextPublicHolidays("FR");

    expect(result).toEqual([]);
  });
});
