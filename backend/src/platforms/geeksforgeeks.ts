import axios from "axios";
import { CONTEST_INTERFACE, PLATFORM } from "../types";

const GFG_BASE_URL = "https://practice.geeksforgeeks.org/contest/"; // used for generating contest links
const GFG_API =
  "https://practiceapi.geeksforgeeks.org/api/vr/events/?page_number=1&sub_type=all&type=contest";

const fetchGfgContests = async () => {
  try {
    const response = await axios.get(GFG_API);
    const data = response.data;

    let result = [];
    if (data?.results?.upcoming) result = data?.results?.upcoming;
    return result;
  } catch (error) {
    return [];
  }
};

const parseGfgContests = (data: [any]) => {
  const contests: CONTEST_INTERFACE[] = [];

  data.forEach((element) => {
    const contest_name = element?.name || "Geeks for Geeks contest";
    const url = GFG_BASE_URL + element?.slug;

    const startDate:Date = new Date(element?.start_time);
    const startMs = startDate.getTime();
    const endDate:Date = new Date(element?.end_time);
    const endMs = endDate.getTime();
    const duration:number = Math.abs(endDate.getTime() - startDate.getTime())/(1000*60) || 120; // minutes

    const contest: CONTEST_INTERFACE = {
      site: PLATFORM.GEEKSFORGEEKS,
      title: contest_name,
      startTime: startMs,
      endTime: endMs,
      duration,
      url,
    };

    contests.push(contest);
  });

  return contests;
};

const getGfgContests = async () => {
  const data = await fetchGfgContests();
  const parsedData = parseGfgContests(data);

  console.log("Feteched data from gfg!",parsedData.length);

  return parsedData;
};

export default getGfgContests;