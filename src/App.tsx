import "./App.css";
// import MovieDetail from "./components/MovieDetail";
import MoviesHome from "./components/MoviesHome";
import PickSeats from "./components/PickSeats";

function App() {
  return (
    <>
      <header>
        <nav></nav>
      </header>
      <main>
        {/* <MovieDetail
          title="Inception"
          duration={148}
          summary="A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO."
          description="A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO. Description.A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO. Description. Description."
          posterUrl="https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg"
          filmId={1}
          showTimes={["1:00 PM", "4:00 PM", "7:00 PM"]}
        /> */}
        {/* <MoviesHome  /> */}
        <PickSeats />
      </main>
      <footer>Copyright ©2025</footer>
    </>
  );
}

export default App;
