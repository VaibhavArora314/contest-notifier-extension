import { CONTEST_INTERFACE } from "../types";
import getCodechefContests from "./codechef";
import getCodeforcesContests from "./codeforces";
import getGfgContests from "./geeksforgeeks";
import getLeetcodeContests from "./leetcode";

const REFRESH_TIMER = 12*60*60*1000;

let codeforcesContests: CONTEST_INTERFACE[] = [],
  leetcodeContests: CONTEST_INTERFACE[] = [],
  codechefContests: CONTEST_INTERFACE[] = [],
  gfgContests: CONTEST_INTERFACE[] = [];

const refreshCache = async () => {
    console.log("Refreshing cache");

    codechefContests = await getCodechefContests();
    codeforcesContests = await getCodeforcesContests();
    leetcodeContests = await getLeetcodeContests();
    gfgContests = await getGfgContests();

    console.log("Refreshed cache");
}

const startReload = () => {
    refreshCache();
    setTimeout(refreshCache,REFRESH_TIMER);
}

startReload();

export {
    codechefContests,
    codeforcesContests,
    leetcodeContests,
    gfgContests
}