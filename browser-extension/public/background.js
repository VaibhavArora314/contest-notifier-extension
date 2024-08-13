/* eslint-disable no-undef */
const showNotification = (title, message, alarmName) => {
  chrome.notifications.create(alarmName, {
    type: "basic",
    iconUrl: "logo/icons96.png",
    title: title,
    message: message,
    priority: 1,
  });
};

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name.startsWith("contest_")) {
    const contestName = alarm.name.replace("contest_", "") //.split("&url=")[0];

    showNotification(
      "Upcoming Contest",
      `Contest ${contestName} starts in 10 minutes!`,
      alarm.name
    );
  }
});

// chrome.notifications.onClicked.addListener((notificationId) => {
//   const contestURL = notificationId.split("&url=")[1];
//   if (contestURL) chrome.tabs.create({ url: contestURL });
// });
