import type { ShowTimeType } from "../types/types";
import "./ShowTimes.css";
import { useEffect, useState } from "react";

type ShowTimesProps = {
  selectedDate: string;
  filmId: number;
};

export default function ShowTimes({ selectedDate, filmId }: ShowTimesProps) {
  const [times, setTimes] = useState<string[]>([]);

  useEffect(() => {
     fetch(`http://localhost:3008/showings/${filmId}/${selectedDate}`)
      .then((response) => response.json())
      .then((data) => {
        setTimes(data.map((item: ShowTimeType) => item.showing_time));
        console.log(data.map((item: ShowTimeType) => item.showing_time)); // 'data' is the parsed JSON object
      });
  }, [selectedDate, filmId]);

  return (
    <div className="showtimes">
      {times.map((time, index) => (
        <div className="time" key={index}>
          {new Date(time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      ))}
    </div>
  );
}
