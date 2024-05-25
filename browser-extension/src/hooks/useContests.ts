import axios from "axios";
import { useEffect, useState } from "react";
import { CONTEST_INTERFACE, PLATFORM } from "../types/contest";

const FetchInteravlMs = 60 * 60 * 1000; // 1 hour
const PLATFORM_KEY = "platform";
const CONTESTS_KEY = "contests";

export const DEFAULT_PLATFORMS = [
  PLATFORM.CODECHEF,
  PLATFORM.CODEFORCES,
  PLATFORM.LEETCODE,
  PLATFORM.ATCODER,
  PLATFORM.GEEKSFORGEEKS,
  PLATFORM.CODINGNINJAS,
];

const useContests = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [contests, setContests] = useState<CONTEST_INTERFACE[]>(
    JSON.parse(localStorage.getItem(CONTESTS_KEY) as string) || []
  );
  const [platforms, setPlatforms] = useState<string[]>(
    JSON.parse(localStorage.getItem(PLATFORM_KEY) as string) ||
      DEFAULT_PLATFORMS
  );

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get(
          `/contests/upcoming?platforms=${JSON.stringify(platforms)}`
        );
        const data = response.data;

        setContests(data?.upcoming_contests);
        localStorage.setItem(CONTESTS_KEY, JSON.stringify(data?.upcoming_contests));
        setError(false);
      } catch (error) {
        // setContests([]);
        setError(true);
      }
      setLoading(false);
    };

    fetchContests();
    const interval = setInterval(fetchContests, FetchInteravlMs);

    localStorage.setItem(PLATFORM_KEY, JSON.stringify([...platforms]));

    return () => {
      clearInterval(interval);
    };
  }, [platforms]);

  console.log(error,contests);

  return { loading, error, contests, platforms, setPlatforms };
};

export default useContests;
