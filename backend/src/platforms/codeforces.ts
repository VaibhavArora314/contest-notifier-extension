import axios from "axios";
import { CONTEST_INTERFACE, PLATFORM } from "../types";

const CODEFORCES_BASE_URL = "https://codeforces.com/contest/"; // used for generating contest links
const CODEFORCES_API = "https://codeforces.com/api/contest.list";

const fetchCodeforcesContests = async () => {
  try {
    const response = await axios.get(CODEFORCES_API);
    const data = response.data;

    return data.result || [];
  } catch (error) {
    return [];
  }
};

const parseCodeforcesContests = (data: [any]) => {
  const contests: CONTEST_INTERFACE[] = [];

  data.forEach((element) => {
    if (element.phase != "BEFORE") return;

    const contest_name = element?.name || "Codeforces contest";
    const url = CODEFORCES_BASE_URL + element?.id;

    const startMs = element?.startTimeSeconds*1000;
    const duration = element?.durationSeconds/60 || 120; // minutes
    const endMs = startMs + duration*60*1000;

    const contest: CONTEST_INTERFACE = {
      site: PLATFORM.CODEFORCES,
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

const getCodeforcesContests = async () => {
  const data = await fetchCodeforcesContests();
  const parsedData = parseCodeforcesContests(data);
  return parsedData;
};


export default getCodeforcesContests;
