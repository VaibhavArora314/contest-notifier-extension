import { useState } from "react";
import { CONTEST_INTERFACE } from "../types/contest";
import Card from "./Card";
import Loader from "./Loader";
import FilterMenu from "./FilterMenu";

type Props = {
  loading: boolean;
  error: boolean;
  contests: CONTEST_INTERFACE[];
};

const ContestList = ({ loading, error, contests }: Props) => {
  const [filter, setFilter] = useState("All");

  const filterContests = (contests: CONTEST_INTERFACE[]) => {
    const now = new Date();
    const next24hrs = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const next7days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    switch (filter) {
      case "Ongoing":
        return contests.filter(
          (contest) =>
            new Date(contest.startTime) <= now &&
            new Date(contest.endTime) >= now
        );
      case "In next 24hrs":
        return contests.filter(
          (contest) =>
            new Date(contest.startTime) <= next24hrs &&
            new Date(contest.startTime) >= now
        );
      case "In next 7days":
        return contests.filter(
          (contest) =>
            new Date(contest.startTime) <= next7days &&
            new Date(contest.startTime) >= now
        );
      default:
        return contests;
    }
  };

  const filteredContests = filterContests(contests);

  if (loading && contests.length === 0)
    return (
      <div className="h-full flex flex-col justify-center min-h-[40vh]">
        <Loader />
      </div>
    );

  if (error && contests.length === 0)
    return (
      <div className="h-full flex flex-col justify-center min-h-[40vh]">
        <h3 className="font-semibold text-sm text-red-500 dark:text-red-400">
          An unexpected error occurred
        </h3>
      </div>
    );

  return (
    <div className="flex flex-col p-4 gap-4 w-full">
      <div className="flex flex-col justify-between items-center mb-4 gap-4">
        {loading && (
          <span className="flex flex-row items-center justify-center font-semibold text-sm text-gray-800 dark:text-gray-200 gap-2 mb-2">
            <p>Refreshing Contests</p> <Loader />
          </span>
        )}
        {error && (
          <span className="flex flex-col items-center justify-center font-semibold text-sm text-red-500 dark:text-red-400 text-center gap-2 mb-2">
            <p>Unable to refresh contests!</p>
            <p>Please check your internet connection.</p>
          </span>
        )}
      <FilterMenu curFilter={filter} updateFilter={(option:string) => {
        setFilter(option);
      }} />
      </div>
      {filteredContests.length > 0 ? (
        <>
          <h2 className="font-semibold text-sm text-gray-800 dark:text-gray-200 text-left">
            {filteredContests.length} such contest{filteredContests.length > 1 && "s"}
          </h2>
          {filteredContests.map((contest) => (
            <Card contest={contest} key={contest.url} />
          ))}
        </>
      ) : (
        <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200 text-center">
          Oops! Looks like no contests!
        </h3>
      )}
    </div>
  );
};

export default ContestList;
