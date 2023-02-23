import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./styles/Pokemon.css"

const Pokemon = () => {

  const [pokemon, setPokemon] = useState()

  const { id } = useParams()


  const getPercentBar = (stat) => {
    const percent = (stat * 100) / 255
    return `${percent}%`
  }

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`
    axios.get(URL)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <main>
      {/* parte superior */}
      <section className='art'>
        <section className='pokemon__art'>
          <div className='pokemon__img'>
            <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
          </div>
        </section>
      </section>

      <section className='all__Charac'>
        <h2 className='number'>#{pokemon?.id}</h2>
        <h2 className='namePok'>{pokemon?.name.charAt(0).toUpperCase() + pokemon?.name.slice(1)}</h2>
        <div className='characters'>
          <div>
            <h5 className='weight'>Weight</h5>
            <h4 className='weight__data'>{pokemon?.weight}</h4>
          </div>

          <div>
            <h5 className='height'>Height</h5>
            <h4 className='height__data'>{pokemon?.height}</h4>
          </div>
        </div>

        <div className='typesOf'>
          <div className=''>
            <h3 className='type__text'>Type</h3>
            <div className='typesOf__type'>
              {
                pokemon?.types.map(type =>
                  <div key={type.type.name} >
                    <span className='type__style'>{type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</span>
                  </div>)
              }
            </div>
          </div>

          <div>
            <h3 className='habilities__text'>Habilities</h3>
            <div className='typesOf__habilities'>
              {
                pokemon?.abilities.map(ability =>
                  <div key={ability.ability.name}>
                    <span className='habilities__style'>{ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}</span>
                  </div>)
              }
            </div>
          </div>
        </div>

        <section className='pokemon__stats'>
          <h2 className='pokemon__stats-title'>Stats</h2>
          <section className='pokemon__stats-info'>
            {
              pokemon?.stats.map((stat) => (
                <article className='pokemon__stat' key={stat.stat.name} >
                  <div className='pokemon__stat-header'>
                    <h4 className='pokemon__stat-name'>{stat.stat.name[0].charAt(0).toUpperCase() + (stat.stat.name).slice(1)}:</h4>
                    <h5 className='pokemon__stat-value'>{stat.base_stat}/255</h5>
                  </div>
                  <div className='pokemon__stat-bar'>
                    <div className='pokemon__stat-barGray'>
                      <div className='pokemon__stat-barProgress' style={{ width: getPercentBar(stat.base_stat) }} ></div>
                    </div>
                  </div>
                </article>
              ))
            }

          </section>
        </section>

      </section>
    </main>
  )
}

export default Pokemon