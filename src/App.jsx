import React, { useState, useEffect } from "react";
import useSWR from "swr";
import "./App.css";

const fetcher = (...args) => fetch(...args).then((response) => response.json());

const App = () => {
  const [gameTitle, setGameTitle] = useState("");
  const [searchedGames, setSearchedGames] = useState([]);
  // const [gameDeals, setGameDeals] = useState([]);

  const searchGame = () => {
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=5`)
      .then((res) => res.json())
      .then((data) => {
        setSearchedGames(data);
        // console.log(data);
      });
  };

  const { data, error } = useSWR(
    "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20&pageSize=5",
    fetcher
  );

  // useEffect(() => {
  //   fetch(
  //     `https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20&pazeSize=5`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setGameDeals(data);
  //       console.log(data);
  //     });
  // }, []);

  return (
    <div className="App">
      <div className="searchSection">
        <h1>Search for a Game</h1>
        <input
          type="text"
          placeholder="Mario..."
          onChange={(event) => {
            setGameTitle(event.target.value);
          }}
        />
        <button onClick={searchGame}>Search Game</button>
        <div className="games">
          {searchedGames.map((game, index) => {
            return (
              <div key={index} className="game">
                <h4>{game.external}</h4>
                <img src={game.thumb} alt="pic" />
                <p>${game.cheapest}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="dealsSection">
        <h1>Latest Deals</h1>
        <div className="deal">
          {data &&
            data.map((deal, index) => {
              return (
                <div key={index} className="game" id="deals">
                  <h3>{deal.title}</h3>
                  <img src={deal.thumb} alt="pic" />
                  <p>Normal Price: ${deal.normalPrice}</p>
                  <p>Deal Price: ${deal.salePrice}</p>
                  <h4>You Save: {deal.savings.substr(0, 2)}%</h4>
                  {/* <h5>Total Savings: {Math.floor(deal.savings)}%</h5> */}
                  {/* <h5>Total Savings: {(deal.savings.slice(0,2))}%</h5> */}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default App;
