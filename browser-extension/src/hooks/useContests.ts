import axios from "axios";
import { useEffect, useState } from "react";
import { CONTEST_INTERFACE, PLATFORM } from "../types/contest";

const FetchInteravlMs = 10 * 60 * 1000;
const PLATFORM_KEY = "platform";

const useContests = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [contests, setContests] = useState<CONTEST_INTERFACE[]>([]);
  const [platforms, setPlatforms] = useState<string[]>(
    JSON.parse(localStorage.getItem(PLATFORM_KEY) as string) || [
      PLATFORM.CODECHEF,
      PLATFORM.CODEFORCES,
      PLATFORM.LEETCODE,
    ]
  );

  useEffect(() => {
    const fetchContests = async () => {
        try {
          const response = await axios.get(
            `/contests/upcoming?platforms=${JSON.stringify(platforms)}`
          );
          const data = response.data;
    
          setContests(data?.upcoming_contests);
          setError(false);
        } catch (error) {
          setContests([]);
          setError(true);
        }
        setLoading(false);
      };

    fetchContests();
    const interval = setInterval(fetchContests, FetchInteravlMs);

    localStorage.setItem(PLATFORM_KEY,JSON.stringify([...platforms]));

    return () => {
      clearInterval(interval);
    };
  }, [platforms]);

  return { loading, error, contests, platforms, setPlatforms };
};

export default useContests;
