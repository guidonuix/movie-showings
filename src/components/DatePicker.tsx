import { useShallow } from "zustand/shallow";
import { useMoviesStore } from "../store/movieStore";

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useMoviesStore(
    useShallow((s) => [s.selectedDate, s.setSelectedDate])
  );
  return (
    <>
      <h1>
        Showings for{" "}
        {selectedDate
          ? selectedDate.toLocaleDateString()
          : new Date().toLocaleDateString()}
      </h1>
      <div className="days-of-week">
        <div
          className="day"
          onClick={() => setSelectedDate(new Date("2025-10-12T10:00:00.000Z"))}
        >
          Sun
        </div>
        <div
          className="day"
          onClick={() => setSelectedDate(new Date("2025-10-13T10:00:00.000Z"))}
        >
          Mon
        </div>
        <div
          className="day"
          onClick={() => setSelectedDate(new Date("2025-10-14T10:00:00.000Z"))}
        >
          Tue
        </div>
        <div
          className="day"
          onClick={() => setSelectedDate(new Date("2025-10-15T10:00:00.000Z"))}
        >
          Wed
        </div>
        <div
          className="day"
          onClick={() => setSelectedDate(new Date("2025-10-16T10:00:00.000Z"))}
        >
          Thu
        </div>
        <div
          className="day"
          onClick={() => setSelectedDate(new Date("2025-10-17T10:00:00.000Z"))}
        >
          Fri
        </div>
        <div
          className="day"
          onClick={() => setSelectedDate(new Date("2025-10-18T10:00:00.000Z"))}
        >
          Sat
        </div>
      </div>
    </>
  );
};
export default DatePicker;
