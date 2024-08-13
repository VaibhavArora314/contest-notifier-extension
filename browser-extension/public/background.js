/* eslint-disable no-undef */
const showNotification = (title, message) => {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "logo/icons96.png",
    title: title,
    message: message,
    priority: 1,
  });
};

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name.startsWith("contest_")) {
    const contestName = alarm.name.replace("contest_", "");
    showNotification(
      "Upcoming Contest",
      `Contest ${contestName} starts in 10 minutes!`
    );
  }
});