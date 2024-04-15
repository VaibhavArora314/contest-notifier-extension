import { Request, Response } from "express";
import getCodeforcesContests from "../../platforms/codeforces";
import getLeetcodeContests from "../../platforms/leetcode";
import getCodechefContests from "../../platforms/codechef";
import { CONTEST_INTERFACE, PLATFORM } from "../../types";

export const UpcomingContestsController = async (
  req: Request,
  res: Response
) => {
  let codeforcesContests: CONTEST_INTERFACE[] = [],
    leetcodeContests: CONTEST_INTERFACE[] = [],
    codechefContests: CONTEST_INTERFACE[] = [],
    platforms: string[];
  try {
    platforms = JSON.parse(req.query.platforms as string);
    if (!platforms || !Array.isArray(platforms))
      platforms = [PLATFORM.CODECHEF, PLATFORM.CODEFORCES, PLATFORM.LEETCODE];

    if (platforms.includes(PLATFORM.CODECHEF))
      codechefContests = await getCodechefContests();
    if (platforms.includes(PLATFORM.LEETCODE))
      leetcodeContests = await getLeetcodeContests();
    if (platforms.includes(PLATFORM.CODEFORCES))
      codeforcesContests = await getCodeforcesContests();
  } catch (error) {
    platforms = [PLATFORM.CODECHEF, PLATFORM.CODEFORCES, PLATFORM.LEETCODE];

    codechefContests = await getCodechefContests();
    leetcodeContests = await getLeetcodeContests();
    codeforcesContests = await getCodeforcesContests();
  }

  const contests = [
    ...codechefContests,
    ...leetcodeContests,
    ...codeforcesContests,
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
