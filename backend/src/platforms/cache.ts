import { CONTEST_INTERFACE } from "../types";
import getCodechefContests from "./codechef";
import getCodeforcesContests from "./codeforces";
import getGfgContests from "./geeksforgeeks";
import getLeetcodeContests from "./leetcode";

const REFRESH_TIMER = 6*60*60*1000;

let lastRefreshTime = new Date(1970, 0, 1).getTime();

let codeforcesContests: CONTEST_INTERFACE[] = [],
  leetcodeContests: CONTEST_INTERFACE[] = [],
  codechefContests: CONTEST_INTERFACE[] = [],
  gfgContests: CONTEST_INTERFACE[] = [];

const refreshCache = async () => {
    const currentTime = new Date().getTime();
    if (currentTime - lastRefreshTime <= REFRESH_TIMER) return;

    lastRefreshTime = currentTime;
    console.log("Refreshing cache");

    codechefContests = await getCodechefContests();
    codeforcesContests = await getCodeforcesContests();
    leetcodeContests = await getLeetcodeContests();
    gfgContests = await getGfgContests();

    console.log("Refreshed cache");
}

export {
    codechefContests,
    codeforcesContests,
    leetcodeContests,
    gfgContests,
    refreshCache
}