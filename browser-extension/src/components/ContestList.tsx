import { CONTEST_INTERFACE } from "../types/contest";
import Card from "./Card";
import Loader from "./Loader";

type Props = {
  loading: boolean;
  error: boolean;
  contests: CONTEST_INTERFACE[];
};

const ContestList = ({ loading, error, contests }: Props) => {
  if (loading && contests.length == 0)
    return (
      <div className="h-full flex flex-col justify-center min-h-[40vh]">
        <Loader />
      </div>
    );

  if (error && contests.length == 0)
    return (
      <div className="h-full flex flex-col justify-center min-h-[40vh]">
        <h3 className="font-semibold text-sm text-red-500 dark:text-red-400">
          An unexpected error occured
        </h3>
      </div>
    );

  if (contests.length == 0)
    return (
      <div className="h-full flex flex-col justify-center min-h-[40vh]">
        <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200">
          Oops! Looks like no upcoming contests!
        </h3>
      </div>
    );

  return (
    <div className="flex flex-col justify-center p-4 gap-4">
      {loading && (
        <span className="flex flex-row items-center justify-center font-semibold text-sm text-gray-800 dark:text-gray-200 gap-2 mb-2">
          <p>Refreshing Contests</p> <Loader />
        </span>
      )}
      {error && (
        <span className="flex flex-col items-center justify-center font-semibold text-sm text-red-500 dark:text-red-400 text-center gap-2 mb-2">
          <p>Unable to refresh contests!</p>
          <p>Pls check your internet connection.</p>
        </span>
      )}
      {contests.map((contest) => (
        <Card contest={contest} key={contest.title} />
      ))}
    </div>
  );
};

export default ContestList;
