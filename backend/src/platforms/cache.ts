import { CONTEST_INTERFACE } from "../types";
import { getAtcoderContests } from "./atcoder";
import getCodechefContests from "./codechef";
import getCodeforcesContests from "./codeforces";
import getCodingNinjaContests from "./codingninja";
import getGfgContests from "./geeksforgeeks";
import getLeetcodeContests from "./leetcode";

const REFRESH_TIMER = 6 * 60 * 60 * 1000;
// const REFRESH_TIMER = 0;

let lastRefreshTime = new Date(1970, 0, 1).getTime();

let codeforcesContests: CONTEST_INTERFACE[] = [],
  leetcodeContests: CONTEST_INTERFACE[] = [],
  codechefContests: CONTEST_INTERFACE[] = [],
  gfgContests: CONTEST_INTERFACE[] = [],
  atcoderContests: CONTEST_INTERFACE[] = [],
  codingninjaContests: CONTEST_INTERFACE[] = [];

const refreshCache = async () => {
  const currentTime = new Date().getTime();
  if (currentTime - lastRefreshTime <= REFRESH_TIMER) return;

  lastRefreshTime = currentTime;
  console.log("Refreshing cache");

  try {
    [
      codechefContests,
      codeforcesContests,
      leetcodeContests,
      gfgContests,
      atcoderContests,
      codingninjaContests,
    ] = await Promise.all([
      getCodechefContests(),
      getCodeforcesContests(),
      getLeetcodeContests(),
      getGfgContests(),
      getAtcoderContests(),
      getCodingNinjaContests(),
    ]);

    console.log("Refreshed cache");
  } catch (error) {
    console.error("Error refreshing cache:", error);
  }
};

export {
  codechefContests,
  codeforcesContests,
  leetcodeContests,
  gfgContests,
  atcoderContests,
  codingninjaContests,
  refreshCache,
};
