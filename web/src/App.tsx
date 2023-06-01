import "./styles/main.css";
import logoImg from "./assets/esports-logo.png";
import { GameBanner } from "./components/GameBanner";
import { CreateaddBanner } from "./components/CreateAddBanner";
import React from "react";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = React.useState<Game[]>([]);

  React.useEffect(() => {
    fetch("http://localhost:3333/games")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setGames(data);
      });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center m-20">
      <img src={logoImg} alt="eSports logo" />
      <h1 className="text-6xl text-white font-black m-20">
        Seu{" "}
        <span className="text-transparent bg-gradient bg-clip-text">duo</span>{" "}
        está aqui
      </h1>

      <div className="grid grid-cols-6 gap-6">
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              title={game.title}
              bannerUrl={game.bannerUrl}
              addsCount={game._count.ads}
            />
          );
        })}
      </div>
      <CreateaddBanner />
    </div>
  );
}

export default App;
