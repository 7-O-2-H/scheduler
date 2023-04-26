import {useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {

  const [state, setState] = useState({
    day:"Monday", 
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState({ ...state, day});
  const setDays = days => setState({ ...state, days});

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

  const calculateSpots = (appointments) => {
    let spots = 0;
    let newDay = {id: null, name: null, appointments: [], interviewers: [], spots: null}
    
    for (let currentDay of state.days) {
      if (currentDay.name === state.day) {
        currentDay.appointments.map((appointmentID) => {
          
          if (!appointments[appointmentID].interview) {
            return spots++;
          }

        });

        newDay = {...currentDay, spots};

      }
    }

    const newDays = state.days.map(d => d.name === state.day? newDay : d);
    return newDays;
  };

  function bookInterview(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.put(`/api/appointments/${id}`, {...appointment})
    .then(() => {
      setState((prev) =>({
        ...prev, 
        appointments
      }));
      setDays(calculateSpots(appointments));
    })
    .catch((e) => console.log(`Error: `, e))
  };

  const cancelInterview = (id) => {
  
    const appointment = {
      ...state.appointments[id], 
      interview: null
    };

    const appointments = {
      ...state.appointments, 
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      setState((prev) => ({
        ...prev, 
        appointments 
      }));
      //setDays(calculateSpots(appointments));
    })
    .catch((e) => console.log(`Error: `, e))

  
  };

  return { state, setDay, bookInterview, cancelInterview };
};
