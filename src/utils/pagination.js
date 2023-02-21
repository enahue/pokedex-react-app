export const paginationLogic = (pokemonsFilter, currentPage) => {
  //Cantidad de pokemons por pagina
  const pokemonPerPage = 12

  //Pokemons que se van a mostrar en la pagina actual
  const sliceStart = (currentPage -1 )* pokemonPerPage
  const sliceEnd = sliceStart + pokemonPerPage
  const pokemonsInPage = pokemonsFilter.slice(sliceStart, sliceEnd)

  //Ultima pagina
  const lastPage = Math.ceil(pokemonsFilter.length / pokemonPerPage) || 1

  //Bloque actual
  const pagesPerBlock = 5
  const actualBlock = Math.ceil(currentPage / pagesPerBlock)

  //Pagina sque se van a mostar en el bloque actual
  const pagesInBlock = []
  const minPage = (actualBlock * pagesPerBlock - pagesPerBlock) +1
  const maxPage = actualBlock * pagesPerBlock
  for(let i = minPage; i <= maxPage; i++){
    if(i <= lastPage){
      pagesInBlock.push(i)
    }
  }

  return {pagesInBlock, lastPage, pokemonsInPage}
}