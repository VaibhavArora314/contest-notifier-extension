import axios from "axios";
import { CONTEST_INTERFACE, PLATFORM } from "../types";

const CODECHEF_BASE_URL = "https://www.codechef.com/"; // used for generating contest links
const CODECHEF_API =
  "https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all";

const fetchCodechefContests = async () => {
  try {
    const response = await axios.get(CODECHEF_API);
    const data = response.data;

    if (data?.future_contests) return data.future_contests;
    else return [];
  } catch (error) {
    return [];
  }
};

const parseCodechefContests = (data: [any]) => {
  const contests: CONTEST_INTERFACE[] = [];

  data.forEach((element) => {
    const contest_name = element?.contest_name || "Codechef contest";
    const url = CODECHEF_BASE_URL + element?.contest_code;

    const startMs = new Date(element?.contest_start_date_iso).getTime();
    const endMs = new Date(element?.contest_end_date_iso).getTime();
    const duration = element?.duration || 120; // minutes

    const contest: CONTEST_INTERFACE = {
      site: PLATFORM.CODECHEF,
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

const getCodechefContests = async () => {
  const data = await fetchCodechefContests();
  const parsedData = parseCodechefContests(data);

  console.log("Feteched data from codechef!",parsedData.length);

  return parsedData;
};

export default getCodechefContests;