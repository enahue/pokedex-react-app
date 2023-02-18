import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PokemonCard from "../components/pokedex/PokemonCard";

const Pokedex = () => {
  //!Todo Corregir errores
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsFilter, setPokemonsFilter] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectType, setSelectType] = useState("");
  const [pokemonName, setPokemonName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const nameTrainer = useSelector((store) => store.nameTrainer);

  const handleChangeSelect = (e) => {
    setSelectType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.pokemonName.value);
  };

  const paginationLogin = () => {
    //Cantidad de pokemons por pagina
    const pokemonsPerPage = 12;
    //Pokemons que se van a mostrar en la pagina actual
    const sliceStart = (currentPage - 1) * pokemonsPerPage;
    const sliceEnd = sliceStart + pokemonsPerPage;
    const pokemonsInPage = pokemonsFilter.slice(sliceStart, sliceEnd);

    //Ultima página
    const lastPage = Math.ceil(pokemonsFilter.length / pokemonsPerPage) || 1;
    //Bloque actual
    const pagesPerBlock = 5;
    const actualBlock = Math.ceil(currentPage / pagesPerBlock);

    //paginas que se van a mostrar en bloque actual
    const pagesInBlock = [];
    const minPage = actualBlock * pagesPerBlock - pagesPerBlock + 1;
    const maxPage = actualBlock * pagesPerBlock;
    for (let i = minPage; i <= maxPage; i++) {
      if (i <= lastPage) {
        pagesInBlock.push(i);
      }
    }
    return pagesInBlock, lastPage, pokemonsInPage;
  };

  const { pagesInBlock, lastPage, pokemonsInPage } = paginationLogin();

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/${
      selectType ? `type/${selectType}/` : "pokemon/?limit=20"
    }`;
    console.log(URL);
    axios
      .get(URL)
      .then((res) => {
        if (selectType) {
          const pokemonByType = res.data.pokemon.map((pokemon) => {
            return {
              name: pokemon.pokemon.name,
              url: pokemon.pokemon.url,
            };
          });
          setPokemons(pokemonByType);
        } else {
          setPokemons(res.data.results);
        }
      })
      .catch((err) => console.log(err));
  }, [selectType]);

  useEffect(() => {
    const pokemonByName = pokemons.filter((pokemon) =>
      pokemon.name.includes(pokemonName.toLowerCase())
    );
    setPokemonsFilter(pokemonByName);
  }, [pokemonName, pokemons]);

  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type/";
    axios
      .get(URL)
      .then((res) => setTypes(res.data.results))
      .catch((err) => console.log(err));
  }, []);

  return (
    <main>
      <p>
        <span>Welcome {nameTrainer}</span>, here you can find information about
        of your favorite pokemon
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="pokemonName"
            placeholder="search your pokemon"
          />
          <button>Search</button>
        </div>
        <select onChange={handleChangeSelect}>
          <option value="">All</option>
          {types.map((type) => (
            <option key={type.url}>{type.name}</option>
          ))}
        </select>
      </form>
      <section>
        {
          pokemonsInPage.map(pokemon => (
            <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />
          ))
        }
      </section>
      <section>
        <ul>
          <li onClick={()=> setCurrentPage(1)}>...</li>
          {pagesInBlock.map(page => (
            <li onClick={setCurrentPage(page)} key={page}>
              {page}
            </li>
          ))}
          <li onClick={()=>setCurrentPage(lastPage)}>...</li>
        </ul>
      </section>
    </main>
  );
};

export default Pokedex;
