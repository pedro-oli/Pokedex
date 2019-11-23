import React, { Component } from "react"

class List extends Component {
    constructor(props) {
        super(props)
        this.state = { pokemons: [] }
    }

    componentDidMount() {
        var pokemons = []

        for (var i = 1; i <= 151; i++) {
            fetch(
                'https://pokeapi.co/api/v2/pokemon/'+i , { method: 'GET' }
            ).then(
                results => results.json()
            ).then(
                data => {
                    pokemons.push({id: data.id , name: data.name})
                    this.setState({ pokemons })
                }
            )
        }
    }

    render() {
        var { pokemons } = this.state
        return <ul>{
            pokemons.map(pok => <li key={pok.id}>{pok.name}</li>)
        }</ul>
    }
}

export default List