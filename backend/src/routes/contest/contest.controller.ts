import { Request, Response } from "express";
import getCodeforcesContests from "../../platforms/codeforces";
import getLeetcodeContests from "../../platforms/leetcode";
import getCodechefContests from "../../platforms/codechef";
import { CONTEST_INTERFACE, PLATFORM } from "../../types";
import getGfgContests from "../../platforms/geeksforgeeks";

const defaultArray = [PLATFORM.CODECHEF, PLATFORM.CODEFORCES, PLATFORM.LEETCODE];

export const UpcomingContestsController = async (
  req: Request,
  res: Response
) => {
  let codeforcesContests: CONTEST_INTERFACE[] = [],
    leetcodeContests: CONTEST_INTERFACE[] = [],
    codechefContests: CONTEST_INTERFACE[] = [],
    gfgContests: CONTEST_INTERFACE[] = [],
    platforms: string[];
  try {
    platforms = JSON.parse(req.query.platforms as string);
    if (!platforms || !Array.isArray(platforms))
      throw new Error();

    if (platforms.includes(PLATFORM.CODECHEF))
      codechefContests = await getCodechefContests();
    if (platforms.includes(PLATFORM.LEETCODE))
      leetcodeContests = await getLeetcodeContests();
    if (platforms.includes(PLATFORM.CODEFORCES))
      codeforcesContests = await getCodeforcesContests();
    if (platforms.includes(PLATFORM.GEEKSFORGEEKS))
      gfgContests = await getGfgContests();
  } catch (error) {
    platforms = defaultArray;

    codechefContests = await getCodechefContests();
    leetcodeContests = await getLeetcodeContests();
    codeforcesContests = await getCodeforcesContests();
  }

  const contests = [
    ...codechefContests,
    ...leetcodeContests,
    ...codeforcesContests,
    ...gfgContests
  ];
  contests.sort(
    (contest1, contest2) =>
      (contest1.startTime as number) - (contest2.startTime as number)
  );

  res.status(200).json({
    platforms,
    upcoming_contests: contests,
  });
};
