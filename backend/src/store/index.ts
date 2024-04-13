import getCodechefContests from "../platforms/codechef";
import getLeetcodeContests from "../platforms/leetcode";
import getCodeforcesContests from "../platforms/codeforces";
import { CONTEST_INTERFACE } from "../types";

export let codechefContests: CONTEST_INTERFACE[] = [];
export let leetcodeContests: CONTEST_INTERFACE[] = [];
export let codeforcesContests: CONTEST_INTERFACE[] = [];

export const UpdateContests = async () => {
    console.log("Refreshing data!");

  codechefContests = await getCodechefContests();
  leetcodeContests = await getLeetcodeContests();
  codeforcesContests = await getCodeforcesContests();
}
