import "./App.css";
// import MovieDetail from "./components/MovieDetail";
import MoviesHome from "./components/MoviesHome";

function App() {
  return (
    <>
      <header>
        <nav className="nav">
          <div>Dinner and a movie</div>
          <div className="login">
            <div>Login</div>
            <div>Register</div>
          </div>
        </nav>
      </header>
      <main>
        <MoviesHome />
      </main>
      <footer className="bg-gray-800 text-white text-center py-4 mt-8">
        Copyright ©2025
      </footer>
    </>
  );
}

export default App;
