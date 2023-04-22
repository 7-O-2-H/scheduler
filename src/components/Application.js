import React, { useState, useEffect } from "react";

import DayList from "./DayList";
import "components/Application.scss";
import "components/Appointment";
import Appointment from "components/Appointment";
import axios from "axios";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";


export default function Application(props) {
  
  
  const [state, setState] = useState({
    day:"Monday", 
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState({ ...state, day});
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  const schedule = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      //interview={interview}
      />
      )
    });
    
    useEffect(() => {
      
      const getDays = axios.get('/api/days');
      const getAppointments = axios.get('/api/appointments');
      const getInterviewers = axios.get('/api/interviewers');
      
      Promise.all([
        getDays,
        getAppointments,
        getInterviewers,
      ])
      .then((all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
      })
      
    }, []);

    console.log(state.interviewers);
    
  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
        />  
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
