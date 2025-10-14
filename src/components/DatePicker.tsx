interface DatePickerProps {
  selectedDate?: string;
  handleDateChange: (date: string) => void;
}

const DatePicker = ({ selectedDate, handleDateChange }: DatePickerProps) => {
  return (
    <>
      <h1>
        Showings for{" "}
        {selectedDate
          ? new Date(selectedDate).toLocaleDateString()
          : new Date().toISOString()}
      </h1>
      <div className="days-of-week">
        <div
          className="day"
          onClick={() => handleDateChange(new Date("2025-10-12").toISOString())}
        >
          Sun
        </div>
        <div
          className="day"
          onClick={() => handleDateChange(new Date("2025-10-13").toISOString())}
        >
          Mon
        </div>
        <div
          className="day"
          onClick={() => handleDateChange(new Date("2025-10-14").toISOString())}
        >
          Tue
        </div>
        <div
          className="day"
          onClick={() => handleDateChange(new Date("2025-10-15").toISOString())}
        >
          Wed
        </div>
        <div
          className="day"
          onClick={() => handleDateChange(new Date("2025-10-16").toISOString())}
        >
          Thu
        </div>
        <div
          className="day"
          onClick={() => handleDateChange(new Date("2025-10-17").toISOString())}
        >
          Fri
        </div>
        <div
          className="day"
          onClick={() => handleDateChange(new Date("2025-10-18").toISOString())}
        >
          Sat
        </div>
      </div>
    </>
  );
};
export default DatePicker;
