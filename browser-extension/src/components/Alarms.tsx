import { useEffect, useState } from "react";

const AlarmList = () => {
  const [alarms, setAlarms] = useState<chrome.alarms.Alarm[]>([]);

  useEffect(() => {
    fetchAlarms();
  }, []);

  const fetchAlarms = () => {
    chrome.alarms.getAll((a) => {
      setAlarms(a);
    });
  };

  const removeAlarm = (alarmName: string) => {
    chrome.alarms.clear(alarmName, () => {
      fetchAlarms();
    });
  };

  const removeAllAlarms = () => {
    chrome.alarms.clearAll(() => {
      fetchAlarms();
    });
  };

  return (
    <div className="p-4">
      <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
        Alarms
      </h2>
      {alarms.length > 0 ? (
        <>
          <ul className="mt-4 space-y-2">
            {alarms.map((alarm) => {
              const contestName = alarm.name.replace("contest_", "");

              return (
                <li
                  key={alarm.name}
                  className="p-2 border rounded-md bg-gray-100 dark:bg-gray-800 flex justify-between items-center"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-sm text-gray-700 dark:text-gray-300">
                      Contest: {contestName}
                    </span>
                  </div>
                  <button
                    onClick={() => removeAlarm(alarm.name)}
                    className="text-red-500 text-sm font-medium hover:underline"
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
          <button
            onClick={removeAllAlarms}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600"
          >
            Remove All
          </button>
        </>
      ) : (
        <p className="mt-4 text-gray-800 dark:text-gray-200 font-medium text-sm">
          No alarms set. To set an alarm, click on the alarm icon next to the contest name.
        </p>
      )}
    </div>
  );
};

export default AlarmList;
