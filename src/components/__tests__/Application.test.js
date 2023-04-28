import React from "react";
import axios from "axios";

import { render, cleanup, waitForElement, fireEvent, getAllByTestId, getByText, getByAltText, getByPlaceholderText, queryByText, prettyDOM, queryByAltText  } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1",  async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");

    const appointment = appointments[0]

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, (/Saving/i))).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    console.log(prettyDOM(day));
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));
    expect(getByText(appointment, (/Are you sure you want to delete?/i))).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, /Deleting/i)).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
    debug();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {

    //  1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Find an appointment
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    // 4. Click edit
    fireEvent.click(queryByAltText(appointment, "Edit"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    // 5. Change and save the name
    fireEvent.click(getByText(appointment, "Save"));
    // 6. Confirm that we save the name
    expect(getByText(appointment, /Saving/i)).toBeInTheDocument();
    // wait for load
    await waitForElement(() => getByText(container, "Sylvia Palmer"))

    // 7. Confirm we have the new value
    expect(getByText(container, "Sylvia Palmer")).toBeInTheDocument();

    // 8. Confirm the number of spots remaining for the day is the same
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining"))

  });

  /* test number five */
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce({});
    //  1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Find an appointment
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    // 4. Click edit
    fireEvent.click(queryByAltText(appointment, "Edit"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    // 5. Change and save the name
    fireEvent.click(getByText(appointment, "Save"));

    // 6. Check if we receive an error
    await waitForElement(() => getByText(appointment, "Saving Error"));
    expect(getByText(appointment, "Saving Error")).toBeInTheDocument();
    debug();

  })

  it("shows the delete error when failing to delete an existing appointment", async () => {
    // make sure to call the right axios. here
    axios.delete.mockRejectedValueOnce();

    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));
    expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument();
    // 4. Click the confirm , mode CONFIRM
    fireEvent.click(queryByText(appointment, "Confirm"))

    // 5. Check for the deleting transition
    expect(getByText(appointment, /Deleting/i)).toBeInTheDocument();
    // 6. wait for the error mesage 
    await waitForElement(() => getByText(appointment, "Delete Error"));
    // 7. check for the error message
    expect(getByText(appointment, "Delete Error")).toBeInTheDocument();

  });

});

