import axios from "axios";
import { useEffect, useState } from "react";
import { CONTEST_INTERFACE } from "../types/contest";

const FetchInteravlMs = 10*60*1000;

const useContests = () => {
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [contests,setContests] = useState<CONTEST_INTERFACE[]>([]);

    const fetchContests = async () => {
        try {
            const response = await axios.get('/contests/upcoming');
            const data = response.data;

            setContests(data?.upcoming_contests);
            setError(false);
        } catch (error) {
            setContests([]);
            setError(true);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchContests();
        const interval = setInterval(fetchContests,FetchInteravlMs);

        return () => {
            clearInterval(interval);
        }
    },[])

    return {loading,error,contests};
}

export default useContests;