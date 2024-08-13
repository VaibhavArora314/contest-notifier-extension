import { useEffect, useState } from "react";
import { CONTEST_INTERFACE, PLATFORM } from "../types/contest";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import AlarmOffIcon from "@mui/icons-material/AlarmOff";
import { toast } from "react-toastify";

type Props = {
  contest: CONTEST_INTERFACE;
};

enum STATUS {
  ongoing = "Ongoing",
  ended = "Ended",
  yetToStart = "Yet To Start",
}

const Card = ({ contest }: Props) => {
  const startDate = new Date(contest.startTime),
    endDate = new Date(contest.endTime);
  let logoUrl = "images/platforms/";
  if (contest.site == PLATFORM.CODECHEF) logoUrl += "codechef.jpeg";
  else if (contest.site == PLATFORM.LEETCODE) logoUrl += "leetcode.png";
  else if (contest.site == PLATFORM.CODEFORCES) logoUrl += "codeforces.png";
  else if (contest.site == PLATFORM.ATCODER) logoUrl += "atcoder.png";
  else if (contest.site == PLATFORM.GEEKSFORGEEKS)
    logoUrl += "geeksforgeeks.png";
  else if (contest.site == PLATFORM.CODINGNINJAS) logoUrl += "codingninja.jpg";

  const [curTime, setCurTime] = useState<Date>(new Date());
  const [alarmSet, setAlarmSet] = useState<boolean>(false);

  let currentStatus: STATUS = STATUS.yetToStart;
  if (curTime > endDate) currentStatus = STATUS.ended;
  else if (curTime >= startDate && curTime <= endDate)
    currentStatus = STATUS.ongoing;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurTime(new Date());
    }, 1000);

    chrome.alarms.get("contest_" + contest.title, (alarm) => {
      if (alarm) setAlarmSet(true);
    });

    return () => {
      clearInterval(interval);
    };
  }, [contest.title]);

  const handleToggleAlarm = () => {
    const alarmTime = new Date(
      new Date(contest.startTime).getTime() - 10 * 60 * 1000
    ); // 10 minutes before local start time

    if (alarmSet) {
      chrome.alarms.clear("contest_" + contest.title, () => {
        toast("Alarm removed for the contest!");
        setAlarmSet(false);
      });
    } else {
      chrome.alarms.create("contest_" + contest.title, {
        when: alarmTime.getTime(),
      });
      toast("Alarm set for 10 minutes before the contest!");
      setAlarmSet(true);
    }
  };

  return (
    <a
      href={contest.url}
      target="_blank"
      className="flex flex-row items-center bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md max-w-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300 ease-in-out"
    >
      <img
        className="object-cover w-16 h-16 p-2 m-2 mx-3"
        src={logoUrl}
        alt={contest.site}
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {`${contest.site} - ${contest.title}`}
        </h5>
        {currentStatus === STATUS.ended && (
          <div className="mb-2 flex items-center justify-start gap-1">
            <FiberManualRecordIcon className="text-red-600 !w-4 !h-4" />
            <p className="mb-1 text-sm font-normal text-red-600 dark:text-red-400">
              {STATUS.ended}
            </p>
          </div>
        )}
        {currentStatus === STATUS.ongoing && (
          <div className="mb-2 flex items-center justify-start gap-1">
            <FiberManualRecordIcon className="text-green-500 !w-4 !h-4" />
            <p className="mb-1 text-sm font-normal text-green-400 dark:text-green-300">
              {STATUS.ongoing}
            </p>
          </div>
        )}
        {currentStatus === STATUS.yetToStart && (
          <div className="mb-2 flex items-center justify-between gap-1">
            <span className="flex gap-1 item-center">
              <FiberManualRecordIcon className="text-gray-950 !w-4 !h-4" />
              <p className="mb-1 text-sm font-normal text-gray-600 dark:text-gray-200">
                {getRemainingTime(contest.startTime, curTime.getTime())}
              </p>
            </span>
            {currentStatus === STATUS.yetToStart && (
              <span
                onClick={(e) => {
                  e.preventDefault();
                  handleToggleAlarm();
                }}
                className="ml-1 px-2"
              >
                {alarmSet ? (
                  <AlarmOffIcon color="info" />
                ) : (
                  <AccessAlarmIcon color="info" />
                )}
              </span>
            )}
          </div>
        )}
        <p className="mb-1 text-md font-normal text-gray-700 dark:text-gray-100">
          {`Starts at ${startDate.toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          })}, ${startDate.toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          })}`}
        </p>
        <p className="mb-2 text-md font-normal text-gray-700 dark:text-gray-100">
          {`Ends at ${endDate.toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          })}, ${endDate.toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          })}`}
        </p>
        <p className="mb-2 font-normal text-gray-700 dark:text-gray-100">
          {`Duration (in mins): ${contest.duration}`}
        </p>
      </div>
    </a>
  );
};

const getRemainingTime = (startTime: number, curTime: number) => {
  const remainingTimeSec = (startTime - curTime) / 1000;
  const days = Math.floor(remainingTimeSec / (60 * 60 * 24));
  const hours = Math.floor((remainingTimeSec / (60 * 60)) % 24);
  const mins = Math.floor((remainingTimeSec / 60) % 60);
  const sec = Math.floor(remainingTimeSec % 60);

  let r: string = "Starts in ";
  if (days >= 1)
    r += `${days} ${days == 1 ? "day" : "days"}, ${hours} ${
      hours == 1 ? "hr" : "hrs"
    }`;
  else if (hours >= 1)
    r += `${hours} ${hours == 1 ? "hr" : "hrs"}, ${mins} ${
      mins == 1 ? "min" : "mins"
    }`;
  else
    r += `${mins} ${mins == 1 ? "min" : "mins"}, ${sec} ${
      sec == 1 ? "sec" : "secs"
    }`;

  return r;
};

export default Card;
