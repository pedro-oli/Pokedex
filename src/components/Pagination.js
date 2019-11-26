import React from 'react'

class Pagination extends React.Component {
    render() {
        const { handleClick, pageNumbers } = this.props

        return (
            <ul id="page-numbers">
                {pageNumbers.map(number => {
                    return (
                        <li
                            key={number}
                            id={number}
                            onClick={handleClick}
                        >
                            {number}
                        </li>
                    )
                })}
            </ul>
        )
    }
}

export default Pagination