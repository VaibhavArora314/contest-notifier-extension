import { Request, Response } from "express";
import {
  codechefContests,
  codeforcesContests,
  leetcodeContests,
} from "../../store";

export const UpcomingContestsController = async (
  req: Request,
  res: Response
) => {
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
    upcoming_contests: contests,
  });
};
