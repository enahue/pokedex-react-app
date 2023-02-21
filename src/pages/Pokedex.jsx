import React from 'react'
import { useSelector } from 'react-redux'
import PokemonCard from '../components/pokedex/PokemonCard'
import usePokedex from '../hooks/usePokedex'

const Pokedex = () => {
  const nameTrainer = useSelector(store => store.nameTrainer)

  const {
    handleSubmit,
    handleChangeSelect,
    types,
    pokemonsInPage,
    handlePreviusPage,
    handleNextPage,
    pagesInBlock,
    setCurrentPage
  } = usePokedex();

  return (
    <main className='Pokedex'>
      <p><span>Welcome {nameTrainer}</span>, here you can find information about of your favorite pokemon</p>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" id="pokemonName" placeholder='search your pokemon' />
          <button>Search</button>
        </div>
        <select onChange={handleChangeSelect}>
          <option value="">All</option>
          {
            types.map(type => <option key={type.url}>{type.name}</option>)
          }
        </select>
      </form>
      <section className='Pokedex__list'>
        {
          pokemonsInPage.map(pokemon => <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url}/>)
        }
      </section>
      <section>
        <ul>
          <li onClick={handlePreviusPage} >{"<<"}</li>
          <li onClick={() => setCurrentPage(1)} >...</li>
          {
            pagesInBlock.map(page => <li onClick={() => setCurrentPage(page)} key={page}>{page}</li>)
          }
          <li onClick={() => setCurrentPage(lastPage)}>...</li>
          <li onClick={handleNextPage} >{">>"}</li>
        </ul>
      </section>
    </main>
  )
}

export default Pokedex