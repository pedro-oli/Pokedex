import React from 'react';
import './App.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            pokemons: [],
            currentPage: 1,
            pokemonsPerPage: 8
        };
        this.getAPIData()
        this.handleClick = this.handleClick.bind(this);
    }

    getAPIData() {
        var pokemons = []
        fetch(
            'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151' , { method: 'GET' }
        ).then(
            results => results.json()
        ).then(
            data => {
                data.results.forEach((pok, index) => {
                    pokemons.push({id: index+1, name: pok.name})
                    this.setState({ pokemons })
                })
            }
        )
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    render() {
        const { pokemons, currentPage, pokemonsPerPage } = this.state;

        const indexOfLastPokemon = currentPage * pokemonsPerPage;
        const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
        const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

        const renderPokemons = currentPokemons.map((pok, index) => {
            return <li key={index}>{pok.id} - {pok.name}</li>;
        });

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(pokemons.length / pokemonsPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                >
                    {number}
                </li>
            );
        });

        return (
            <div>
                <ul>
                    {renderPokemons}
                </ul>
                <ul id="page-numbers">
                    {renderPageNumbers}
                </ul>
            </div>
        );
    }
}

export default App;