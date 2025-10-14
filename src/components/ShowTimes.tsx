import "./ShowTimes.css";

type ShowTimesProps = {
  selectedDate: Date;
  filmId: number;
};

export default function ShowTimes({ selectedDate, filmId }: ShowTimesProps) {
  //    Placeholder
  console.log(selectedDate, filmId);
  const times = ["1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM", "1:00 AM", "4:00 AM","1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM", "1:00 AM", "4:00 AM"];
  return (
    <div className="showtimes">
      {times.map((time, index) => (
        <div className="time" key={index}>
          {time}
        </div>
      ))}
    </div>
  );
}
