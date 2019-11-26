import React from 'react'

class TypeFilter extends React.Component {
    render() {
        const { handleType } = this.props

        return (
            <select id="select-field" defaultValue="" onChange={handleType}>
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
    }
}

export default TypeFilter