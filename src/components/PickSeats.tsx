import { useEffect, useState } from "react";
import "./PickSeats.css";
import type { ShowtimeType } from "../types/types";
import { useRouter } from "@tanstack/react-router";

const PickSeats = ({ showingId }: { showingId: number }) => {
  const [showtime, setShowtime] = useState<ShowtimeType | null>(null);
  const { history } = useRouter();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_DATABASE_ROOT_URL}/showings/${showingId}`)
      .then((response) => response.json())
      .then((data) => {
        setShowtime(data);
        console.log(data); // 'data' is the parsed JSON object
      });
  }, [showingId]);

  return (
    <div>
      <div className='back-button' onClick={() => history.go(-1)}>&lt; Back</div>
      <div className="seats-header">Where would you like to sit?</div>
      <div>{showtime && new Date(showtime.showing_time).toLocaleString()}</div>
      <div className="checkout">Checkout</div>
    </div>
  );
};

export default PickSeats;
