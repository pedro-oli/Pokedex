import React from 'react'

class SearchField extends React.Component {
    render() {
        const { handleSearch } = this.props

        return (
            <input
                id="search-field"
                type="text"
                placeholder="Search Pokémon"
                onChange={handleSearch}
            />
        )
    }
}

export default SearchField