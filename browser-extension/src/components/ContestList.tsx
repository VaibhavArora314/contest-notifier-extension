import useContests from "../hooks/useContests";
import Card from "./Card";
import Loader from "./Loader";

const ContestList = () => {
  const { loading, error, contests } = useContests();

  if (loading)
    return (
      <div className="h-full flex flex-col justify-center">
        <Loader />
      </div>
    );

  if (error)
    return (
      <div className="h-full flex flex-col justify-center">
        <h3 className="font-semibold text-sm">An unexpected error occured</h3>
      </div>
    );

  return (
    <div className="flex flex-col justify-center p-4 gap-4">
      {contests.map((contest) => (
        <Card contest={contest} key={contest.title}/>
      ))}
    </div>
  );
};

export default ContestList;
