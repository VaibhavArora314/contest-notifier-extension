import getCodechefContests from "../platforms/codechef";
import getLeetcodeContests from "../platforms/leetcode";
import getCodeforcesContests from "../platforms/codeforces";
import { CONTEST_INTERFACE } from "../types";

const RefreshIntervalMs = 12 * 60 * 60 * 1000; // refresh data every 12 hours

export let codechefContests: CONTEST_INTERFACE[] = [];
export let leetcodeContests: CONTEST_INTERFACE[] = [];
export let codeforcesContests: CONTEST_INTERFACE[] = [];

const UpdateContests = async () => {
    console.log("Refreshing data!");

  codechefContests = await getCodechefContests();
  leetcodeContests = await getLeetcodeContests();
  codeforcesContests = await getCodeforcesContests();
}

UpdateContests();
setTimeout(UpdateContests,RefreshIntervalMs);