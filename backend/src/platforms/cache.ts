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

    try {
        [codechefContests, codeforcesContests, leetcodeContests, gfgContests] = await Promise.all([
            getCodechefContests(),
            getCodeforcesContests(),
            getLeetcodeContests(),
            getGfgContests()
        ]);

        console.log("Refreshed cache");
    } catch (error) {
        console.error("Error refreshing cache:", error);
    }
}

export {
    codechefContests,
    codeforcesContests,
    leetcodeContests,
    gfgContests,
    refreshCache
}