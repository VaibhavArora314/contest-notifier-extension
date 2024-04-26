import axios from "axios";
import { CONTEST_INTERFACE, PLATFORM } from "../types";

const CODING_NINJA_BASE_URL = "https://www.naukri.com/code360/contests/"; // used for generating contest links
const CODING_NINJA_API =
  "https://api.codingninjas.com/api/v4/public_section/contest_list";

const fetchCodingNinjaContests = async () => {
  try {
    const {data} = await axios.get(CODING_NINJA_API);

    if (data?.data?.events) return data.data.events;
    return [];
  } catch (error) {
    console.log("Error", error);
    return [];
  }
};

const parseCodingNinjaContests = (data: [any]) => {
  const contests: CONTEST_INTERFACE[] = [];

  data.forEach((element) => {
    const contest_name = element?.name || "Coding Ninjas contest";
    const url = CODING_NINJA_BASE_URL + element?.slug;

    const startMs = new Date(element?.event_start_time*1000).getTime();
    const endMs = new Date(element?.event_end_time*1000).getTime();
    const duration = (endMs - startMs)/(1000*60) || 120; // minutes

    const contest: CONTEST_INTERFACE = {
      site: PLATFORM.CODINGNINJAS,
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

const getCodingNinjaContests = async () => {
  const data = await fetchCodingNinjaContests();
  const parsedData = parseCodingNinjaContests(data);

  console.log("Fetched data from CodingNinja!", parsedData.length);
  return parsedData;
};

getCodingNinjaContests();

export default getCodingNinjaContests;
