import { ActivityType } from "../app";
import { DateTime } from "luxon";

export const mockActivity: ActivityType = {
  name: "Meditation",
  blurb: "Lorem Ipsum",
  instances: [
   { 
    date: String(DateTime.now()),
    id: "instanceqwerty",
    count: 0,
    notes: "note",
    hashtags: ["lol"]
  }
  ],
  id: "qwerty",
  color: "rgb(74 222 128)"
}

