import React from "react";
import { useSelector } from "react-redux";
import PokemonCard from "../components/pokedex/PokemonCard";
import usePokedex from "../hooks/usePokedex";

const Pokedex = () => {
  const nameTrainer = useSelector((store) => store.nameTrainer);

  const {
    handleSubmit,
    handleChangeSelect,
    types,
    pokemonsInPage,
    handlePreviusPage,
    handleNextPage,
    pagesInBlock,
    setCurrentPage,
  } = usePokedex();

  return (
    <main className="Pokedex">
      <div className="pokedex-welcome">
        <p>
          Welcome <span className="pokedex-name-trainer">{nameTrainer}</span>!,
          here you can find information about of your favorite pokemon.
        </p>
      </div>
      <div className="pokedex-search-box">
        <div className="containter-sbox">
        <form onSubmit={handleSubmit}>
          <div className="pokedex-search-box-child">
            <input
              type="text"
              id="pokemonName"
              placeholder="search your pokemon"
            />
            <button>
              <i class="bx bx-search"></i>
            </button>
            
          </div>
        </form>
        </div>
        <div className="container-category">
        <select onChange={handleChangeSelect}  className="pokedex-options">
          <option value="">All</option>
          {types.map((type) => (
            <option key={type.url}>{type.name}</option>
          ))}
        </select>
        </div>
      </div>
      <section className="Pokedex__list">
        {pokemonsInPage.map((pokemon) => (
          <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />
        ))}
      </section>
      <section>
        <ul>
          <li onClick={handlePreviusPage}>{"<<"}</li>
          <li onClick={() => setCurrentPage(1)}>...</li>
          {pagesInBlock.map((page) => (
            <li onClick={() => setCurrentPage(page)} key={page}>
              {page}
            </li>
          ))}
          <li onClick={() => setCurrentPage(lastPage)}>...</li>
          <li onClick={handleNextPage}>{">>"}</li>
        </ul>
      </section>
    </main>
  );
};

export default Pokedex;
