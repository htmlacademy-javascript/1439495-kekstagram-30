const MINUTES_IN_HOUR = 60;

const isMeetingPossible = (startWork, endWork, startMeeting, duration) => {
  const [startMeetingHour, startMeetingMinutes] = startMeeting.split(':');
  const [endWorkHour, endWorkMinutes] = endWork.split(':');
  const [startWorkHour, startWorkMinutes] = startWork.split(':');

  if (+startWorkHour === +startMeetingHour && +startWorkMinutes > +startMeetingMinutes) {
    return false;
  }
  if (+startMeetingHour < +startWorkHour || +startMeetingHour > +endWorkHour) {
    return false;
  }
  if (((endWorkHour - startMeetingHour) * MINUTES_IN_HOUR + (endWorkMinutes - startMeetingMinutes)) < duration) {
    return false;
  }
  return true;
};

isMeetingPossible('8:30', '17:30', '08:05', 150);
