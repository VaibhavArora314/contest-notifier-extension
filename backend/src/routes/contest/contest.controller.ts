import { Request, Response } from "express";
import { CONTEST_INTERFACE, PLATFORM } from "../../types";
import { atcoderContests, codechefContests, codeforcesContests, codingninjaContests, gfgContests, leetcodeContests, refreshCache } from "../../platforms/cache";

const defaultArray = [PLATFORM.CODECHEF, PLATFORM.CODEFORCES, PLATFORM.LEETCODE];
const DURATION_LIMIT = 15*24*60;

export const UpcomingContestsController = async (
  req: Request,
  res: Response
) => {
  let platforms: string[];
  const includedPlatorms: string[] = [];
  try {
    platforms = JSON.parse(req.query.platforms as string);
    if (!platforms || !Array.isArray(platforms))
      throw new Error();
  } catch (error) {
    platforms = defaultArray;
  }

  let contests:CONTEST_INTERFACE[] = [];

  await refreshCache();

  if (platforms.includes(PLATFORM.CODECHEF)){
    contests = [...contests,...codechefContests];
    includedPlatorms.push(PLATFORM.CODECHEF);
  }
  if (platforms.includes(PLATFORM.LEETCODE)){
    contests = [...contests,...leetcodeContests];
    includedPlatorms.push(PLATFORM.LEETCODE);
  }
  if (platforms.includes(PLATFORM.CODEFORCES)){
    contests = [...contests,...codeforcesContests];
    includedPlatorms.push(PLATFORM.CODEFORCES);
  }
  if (platforms.includes(PLATFORM.GEEKSFORGEEKS)){
    contests = [...contests,...gfgContests];
    includedPlatorms.push(PLATFORM.GEEKSFORGEEKS);
  }
  if (platforms.includes(PLATFORM.ATCODER)){
    contests = [...contests,...atcoderContests];
    includedPlatorms.push(PLATFORM.ATCODER);
  }
  if (platforms.includes(PLATFORM.CODINGNINJAS)){
    contests = [...contests,...codingninjaContests];
    includedPlatorms.push(PLATFORM.CODINGNINJAS);
  }

  contests = contests.filter((contest) => (contest.duration <= DURATION_LIMIT));

  contests.sort(
    (contest1, contest2) =>
      (contest1.startTime as number) - (contest2.startTime as number)
  );

  res.status(200).json({
    platforms: includedPlatorms,
    upcoming_contests: contests,
  });
};
