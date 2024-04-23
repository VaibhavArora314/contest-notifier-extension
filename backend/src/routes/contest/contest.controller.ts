import { Request, Response } from "express";
import { CONTEST_INTERFACE, PLATFORM } from "../../types";
import { codechefContests, codeforcesContests, gfgContests, leetcodeContests } from "../../platforms/cache";

const defaultArray = [PLATFORM.CODECHEF, PLATFORM.CODEFORCES, PLATFORM.LEETCODE];

export const UpcomingContestsController = async (
  req: Request,
  res: Response
) => {
  let platforms: string[];
  try {
    platforms = JSON.parse(req.query.platforms as string);
    if (!platforms || !Array.isArray(platforms))
      throw new Error();
  } catch (error) {
    platforms = defaultArray;
  }

  let contests:CONTEST_INTERFACE[] = [];

  if (platforms.includes(PLATFORM.CODECHEF))
    contests = [...contests,...codechefContests];
  if (platforms.includes(PLATFORM.LEETCODE))
    contests = [...contests,...leetcodeContests];
  if (platforms.includes(PLATFORM.CODEFORCES))
    contests = [...contests,...codeforcesContests];
  if (platforms.includes(PLATFORM.GEEKSFORGEEKS))
    contests = [...contests,...gfgContests];

  contests.sort(
    (contest1, contest2) =>
      (contest1.startTime as number) - (contest2.startTime as number)
  );

  res.status(200).json({
    platforms,
    upcoming_contests: contests,
  });
};
