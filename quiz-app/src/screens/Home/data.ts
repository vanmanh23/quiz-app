import { FlagTest } from "../../data";
import { SolarSystemTest } from "../../data/solarSystem";
import { Test } from "../../data/types";
import { request } from "../../utils/requests";

// export const data: Test[] = [FlagTest, SolarSystemTest];
export const data = [
    {
        id: "id:test/flag",
        title: "Flags",
        testName: "flags",
        numOfQuestions: 10,
        duration: 10,
        image: {
          uri: "https://assets.weforum.org/article/image/large_BG0pfzM90_bsl3pWCLD2ZvvspIYSUwrhYlc5QyRO96E.jpg",
          alt: "Flags",
        },
      },
      {
        id: "id:test/solar-system",
        title: "Solar System",
        testName: "solarSystem",
        numOfQuestions: 10,
        duration: 10,
        image: {
          uri: "https://www.nasa.gov/wp-content/uploads/2023/11/stsci-01hf7p3b6pw5ds5n9m9xd1ey27.png?resize=2048,775",
          alt: "Solar System",
        },
      },
      {
        id: "id:test/solar2-system",
        title: "Solar2 System",
        testName: "solar2System",
        numOfQuestions: 10,
        duration: 10,
        image: {
          uri: "https://www.nasa.gov/wp-content/uploads/2023/11/stsci-01hf7p3b6pw5ds5n9m9xd1ey27.png?resize=2048,775",
          alt: "Solar System",
        },
      }
]

