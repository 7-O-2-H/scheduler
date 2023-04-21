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