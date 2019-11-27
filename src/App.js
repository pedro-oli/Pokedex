import React from 'react'
import Pagination from './components/Pagination'
import PokemonList from './components/PokemonList'
import SearchField from './components/SearchField'
import TypeFilter from './components/TypeFilter'
import './App.css'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            pokemons: [],
            filteredPokemons: [],
            currentPage: 1,
            pokemonsPerPage: 8,
            typeOptions: []
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleType = this.handleType.bind(this)
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
        const { currentPage } = this.state;
        const id = event.target.id;

        if (id === "previous") {
            this.setState({
                currentPage: currentPage - 1
            })
        } else if (id === "next") {
            this.setState({
                currentPage: currentPage + 1
            })
        } else {
            this.setState({
                currentPage: Number(id)
            })
        }
    }

    handleSearch(event) {
        // clear type filters
        document.getElementById("select-field").getElementsByTagName('option')[0].selected = 'selected'

        var filteredPokemons = this.state.pokemons
        filteredPokemons = filteredPokemons.filter(function(pok) {
            return pok.name.search(event.target.value.toLowerCase()) !== -1
        })
        this.setState({ currentPage: 1, filteredPokemons })
    }

    handleType(event) {
        // clear name search filter
        document.getElementById("search-field").value = ""

        var filteredPokemons = this.state.pokemons
        if (event.target.value !== "") {
            filteredPokemons = filteredPokemons.filter(function(pok) {
                return pok.types.includes(event.target.value)
            })
        }
        this.setState({ currentPage: 1, filteredPokemons })
    }

    render() {
        const { currentPage, pokemonsPerPage, filteredPokemons } = this.state

        const indexOfLastPokemon = currentPage * pokemonsPerPage
        const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage
        const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(filteredPokemons.length / pokemonsPerPage); i++) {
            pageNumbers.push(i)
        }

        return (
            <div>
                <nav>
                    <SearchField handleSearch={this.handleSearch} />
                    <TypeFilter handleType={this.handleType} />
                </nav>
                <PokemonList currentPokemons={currentPokemons} />
                <Pagination currentPage={currentPage} handleClick={this.handleClick} pageNumbers={pageNumbers} />
            </div>
        )
    }
}

export default App