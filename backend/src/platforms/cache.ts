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

const updateCodechefContests = async () => {
    codechefContests = await getCodechefContests();
    console.log("Updated codechef contests!");
}

const updateCodeforcesContest = async () => {
    codeforcesContests = await getCodeforcesContests();
    console.log("Updated codeforce contests!");
}

const updateLeetcodeContest = async () => {
    leetcodeContests = await getLeetcodeContests();
    console.log("Updated leetcode contests!");
}

const updateGfgContest = async () => {
    gfgContests = await getGfgContests();
    console.log("Updated gfg contests!");
}

const refreshCache = () => {
    console.log("Refreshing cache");

    updateCodechefContests();
    updateCodeforcesContest();
    updateGfgContest();
    updateLeetcodeContest();
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