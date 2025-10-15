import { useNavigate } from "@tanstack/react-router";
import { useMoviesStore } from "../store/movieStore";
import type { ShowtimeType } from "../types/types";
import "./ShowTimes.css";
import { useQuery } from "@tanstack/react-query";

export default function ShowTimes({ filmId }: { filmId: number }) {
  //const [times, setTimes] = useState<ShowtimeType[]>([]);
  const selectedDate = useMoviesStore((s) => s.selectedDate);
  const navigate = useNavigate();

  const { isPending, error, data } = useQuery<ShowtimeType[]>({
    queryKey: ["showtimes", filmId, selectedDate],
    queryFn: () =>
      fetch(
        `${
          import.meta.env.VITE_DATABASE_ROOT_URL
        }/showings/${filmId}/${selectedDate}`
      ).then((res) => res.json()),
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error loading movies</div>;

  const times = data;
  // useEffect(() => {
  //   fetch(
  //     `${
  //       import.meta.env.VITE_DATABASE_ROOT_URL
  //     }/showings/${filmId}/${selectedDate}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setTimes(data.map((item: ShowtimeType) => item));
  //       console.log(data.map((item: ShowtimeType) => item.showing_time)); // 'data' is the parsed JSON object
  //     });
  // }, [selectedDate, filmId]);

  if(isPending) return <div className="loading">Loading...</div>;
  if(error) return <div>Error loading showtimes</div>;

  return (
    <div className="showtimes">
      {times.map((time, index) => (
        <div
          className="time"
          key={index}
          onClick={() => navigate({ to: `/pick-seats/${time.id}` })}
        >
          {new Date(time.showing_time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      ))}
    </div>
  );
}
