import { useEffect, useState } from "react";
import "./PickSeats.css";
import type { ShowtimeType } from "../types/types";
import { Link } from "@tanstack/react-router";
import { fetchCall } from "../utilites/fetchShowingTimes";

const PickSeats = ({ showingId }: { showingId: number }) => {
  const [showtime, setShowtime] = useState<ShowtimeType | null>(null);
  const [movieTitle, setMovieTitle] = useState<string>("");
  const [theaterName, setTheaterName] = useState<string>("");

  useEffect(() => {
    fetchCall(`showings/${showingId}`)
      .then((data) => {
        setShowtime(data);

        return Promise.all([
          fetchCall(`films`),
          fetchCall(`theaters/${data.theater_id}`),
          Promise.resolve(data),
        ]);
      })
      .then(([films, theaterData, showTimeData]) => {
        const movie = films.filter(function (item: any) {
          return item.id === showTimeData?.film_id;
        });

        //console.log(movie[0]?.title); // 'data' is the parsed JSON object
        setMovieTitle(movie[0]?.title || "");
        setTheaterName(theaterData.name);
      });
  }, [showingId]);

  return (
    <div>
      <Link className="back-button" to="/">
        &lt; Back
      </Link>

      {/* <div className='back-button' onClick={() => history.go(-1)}>&lt; Back</div> */}
      <div className="seats-header">Where would you like to sit?</div>
      <div>{movieTitle}</div>
      <div>{theaterName}</div>
      <div>{showtime && new Date(showtime.showing_time).toLocaleString()}</div>
      <div className="checkout">Checkout</div>
    </div>
  );
};

export default PickSeats;
