import { CONTEST_INTERFACE, PLATFORM } from "../types/contest";

type Props = {
  contest: CONTEST_INTERFACE;
};

enum STATUS {
  ongoing = "Ongoing",
  ended = "Ended",
  yetToStart = "Yet To Start"
}

const Card = ({ contest }: Props) => {
  const startDate = new Date(contest.startTime),
    endDate = new Date(contest.endTime);
  let logoUrl = "";
  if (contest.site == PLATFORM.CODECHEF) logoUrl = "codechef.png";
  else if (contest.site == PLATFORM.LEETCODE) logoUrl = "leetcode.png";
  else if (contest.site == PLATFORM.CODEFORCES) logoUrl = "codeforces.png";

  const curTime = new Date();
  let currentStatus:STATUS = STATUS.yetToStart;
  if (curTime > endDate) currentStatus = STATUS.ended;
  else if (curTime >= startDate && curTime <= endDate) currentStatus = STATUS.ongoing;

  return (
    <a
      href={contest.url}
      target="_blank"
      className="flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow max-w-xl hover:bg-gray-100"
    >
      <img
        className="object-cover w-20 h-20 p-4 m-2"
        src={logoUrl}
        alt={contest.site}
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-1 text-lg font-bold tracking-tight text-gray-900">
          {`${contest.site} - ${contest.title}`}
        </h5>
        {currentStatus == STATUS.ended && <div className="mb-2 flex items-center justify-start gap-1">
          <img className="w-3 h-3" src="red-dot.png" alt="" />
          <p
            className="mb-1 text-sm font-normal 
              onGoing ? text-red-600"
          >
            {STATUS.ended}
          </p>
        </div>}
        {currentStatus == STATUS.ongoing && <div className="mb-2 flex items-center justify-start gap-1">
          <img className="w-3 h-3" src="green-dot.png" alt="" />
          <p
            className="mb-1 text-sm font-normal 
              onGoing ? text-green-400"
          >
            {STATUS.ongoing}
          </p>
        </div>}
        {currentStatus == STATUS.yetToStart && <div className="mb-2 flex items-center justify-start gap-1">
          <img className="w-3 h-3" src="black-dot.png" alt="" />
          <p
            className="mb-1 text-sm font-normal 
              onGoing ? text-gray-600"
          >
            {STATUS.yetToStart}
          </p>
        </div>}
        <p className="mb-1 font-normal text-gray-700">
          {`Starts at ${startDate.toLocaleString()}`}
        </p>
        <p className="mb-2 font-normal text-gray-700">
          {`Ends at ${endDate.toLocaleString()}`}
        </p>
        <p className="mb-2 font-normal text-gray-700">
          {`Duration (in mins): ${contest.duration}`}
        </p>
      </div>
    </a>
  );
};

export default Card;
