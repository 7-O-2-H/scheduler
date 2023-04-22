export function getAppointmentsForDay(state, day) {
  const appointmentsForDay = [];
  for (let thisDay of state.days) {
    if (thisDay.name === day) {
      thisDay.appointments.map((appID) => {
        return appointmentsForDay.push(state.appointments[appID]);
      }) 
    }
  };
  return appointmentsForDay;
}

export function getInterview(state, interview) {
  const interviewSummary ={};
  if(interview) {
    interviewSummary.student = interview.student;
    interviewSummary.interviewer = state.interviewers[interview.interviewer];
    return interviewSummary;
  }
  return null;
};