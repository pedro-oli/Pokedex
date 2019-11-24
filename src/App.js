import React from 'react';
import './App.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            pokemons: [],
            filteredPokemons: [],
            currentPage: 1,
            pokemonsPerPage: 8,
            typeOptions: []
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleType = this.handleType.bind(this);
    }

    componentDidMount() {
        this.getAPIData()
    }

    getAPIData() {
        var pokemons = []
        fetch(
            'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151', { method: 'GET' }
        ).then(
            results => results.json()
        ).then(
            data => {
                data.results.forEach((pok, index) => {
                    fetch(
                        pok.url, { method: 'GET' }
                    ).then(
                        results => results.json()
                    ).then(
                        data => {
                            var types = data.types.map(type => type.type.name)
                            pokemons.push({
                                id: index+1,
                                name: pok.name,
                                imageURL: data.sprites.front_default,
                                types: types
                            })
                            pokemons.sort((a, b) => a.id > b.id)
                            this.setState({ pokemons, filteredPokemons: pokemons })
                        }
                    )
                })
            }
        )
    }

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    handleSearch(event) {
        // set no type filters
        document.getElementById("select-field").getElementsByTagName('option')[0].selected = 'selected'

        var filteredPokemons = this.state.pokemons;
        filteredPokemons = filteredPokemons.filter(function(pok) {
            return pok.name.search(event.target.value.toLowerCase()) !== -1;
        });
        this.setState({ currentPage: 1, filteredPokemons });
    }

    handleType(event) {
        // set no name search filter
        document.getElementById("search-field").value = ""

        var filteredPokemons = this.state.pokemons;
        if (event.target.value !== "") {
            filteredPokemons = filteredPokemons.filter(function(pok) {
                return pok.types.includes(event.target.value)
            });
        }
        this.setState({ currentPage: 1, filteredPokemons });
    }

    render() {
        const { currentPage, pokemonsPerPage, filteredPokemons } = this.state;

        const indexOfLastPokemon = currentPage * pokemonsPerPage;
        const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
        const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filteredPokemons.length / pokemonsPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPokemons = currentPokemons.map((pok, index) => {
            return <li key={index}>
                <img alt={pok.name} src={pok.imageURL} />
                <p>{pok.id} - {pok.name}</p>
            </li>;
        });
        
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

        const selectTypes = (
            <select id="select-field" defaultValue="" onChange={this.handleType}>
                <option value="">Select Type</option>
                <option value="poison">Poison</option>
                <option value="grass">Grass</option>
                <option value="fire">Fire</option>
                <option value="flying">Flying</option>
                <option value="water">Water</option>
                <option value="bug">Bug</option>
                ​<option value="normal">Normal</option>
                ​<option value="electric">Electric</option>
                <option value="ground">Ground</option>
                <option value="fairy">Fairy</option>
                <option value="fighting">Fighting</option>
                ​<option value="psychic">Psychic</option>
                <option value="rock">Rock</option>
                ​<option value="steel">Steel</option>
                ​<option value="ice">Ice</option>
                ​<option value="ghost">Ghost</option>
                ​<option value="dragon">Dragon</option>
            </select>
        )

        const searchField = (
            <input
                id="search-field"
                type="text"
                placeholder="Search Pokémon"
                onChange={this.handleSearch}
            />
        )

        return (
            <div>
                {searchField}
                {selectTypes}
                <ul id="pokemon-list">
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