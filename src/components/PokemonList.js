import React from 'react'

class PokemonList extends React.Component {
    render() {
        const { currentPokemons } = this.props
        
        return (
            <ul id="pokemon-list">
                {currentPokemons.map((pok, index) => {
                    return <li key={index}>
                        <img alt={pok.name} src={pok.imageURL} />
                        <p>{pok.id} - {pok.name}</p>
                    </li>
                })}
            </ul>
        )
    }
}

export default PokemonList