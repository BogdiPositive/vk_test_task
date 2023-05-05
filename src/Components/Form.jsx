import React, { useState } from "react";
import "./form.css";
function ReservationForm() {
  const [tower, setTower] = useState("A");
  const [floor, setFloor] = useState(3);
  const [room, setRoom] = useState(1);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [comment, setComment] = useState("");
  const [isValid, setIsValid] = useState(true);

  

  function handleTowerChange(event) {
    setTower(event.target.value);
  }

  function handleFloorChange(event) {
    setFloor(parseInt(event.target.value));
  }

  function handleRoomChange(event) {
    setRoom(parseInt(event.target.value));
  }

  function handleDateChange(event) {
    let currentData = new Date();
    let selectedDate = new Date(event.target.value);
    if (selectedDate < currentData) {
      selectedDate = currentData;
    }
    setDate(selectedDate);
  }

  function handleTimeChange(event) {
    setTime(event.target.value);
  }

  function handleCommentChange(event) {
    setComment(event.target.value);
  }

  function isValidDate() {
    const dateNow = new Date();
    const [hours, minutes] = time.split(":");
    const selectedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes
    );
    return selectedDate > dateNow;
  }

  
  function handleSubmit(event) {
    event.preventDefault();
    if (isValidDate()) {
      const data = {
        tower,
        floor,
        room,
        date,
        time,
        comment,
      };
      console.log(JSON.stringify(data));
      handleReset();
    } else {
      setIsValid(false);
    }
  }

  function handleReset() {
    setTower("A");
    setFloor(3);
    setRoom(1);
    setDate(new Date());
    setTime("10:00 AM");
    setComment("");
    setIsValid(true);
  }

  return (
    <div className="form-control">
      {isValid ? (
        <form className="form" onSubmit={handleSubmit} onReset={handleReset}>
          <label className="form-label">
            Choose a tower:
            <select
              className="form-select"
              value={tower}
              onChange={handleTowerChange}
            >
              <option value="A">Tower A</option>
              <option value="B">Tower B</option>
            </select>
          </label>

          <label className="form-label">
            Choose a floor:
            <select
              className="form-select"
              value={floor}
              onChange={handleFloorChange}
            >
              {Array.from({ length: 25 }, (_, i) => i + 3).map((f) => (
                <option key={f} value={f}>
                  Floor {f}
                </option>
              ))}
            </select>
          </label>

          <label className="form-label">
            Choose a room:
            <select
              className="form-select"
              value={room}
              onChange={handleRoomChange}
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((r) => (
                <option key={r} value={r}>
                  Room {r}
                </option>
              ))}
            </select>
          </label>
          <label className="form-label">
            Choose a date:
            <input
              className="form-select"
              type="date"
              value={date.toISOString().substr(0, 10)}
              onChange={handleDateChange}
            />
          </label>

          <label className="form-label">
            Choose a time:
            <input
              className="form-select"
              type="time"
              value={time}
              onChange={handleTimeChange}
            />
          </label>

          <label className="form-label">
            Comment:
            <textarea
              className="form-textarea"
              value={comment}
              onChange={handleCommentChange}
            />
          </label>

          <button className="form-button" type="submit">
            Submit
          </button>
          <button className="form-button" type="reset">
            Reset
          </button>
        </form>
      ) : (
        <div className="form-error">
          <p>Введите корректную дату и время</p>
          <button className="form-button" onClick={handleReset}>Понятно</button>
        </div>
      )}
    </div>
  );
}

export default ReservationForm;
