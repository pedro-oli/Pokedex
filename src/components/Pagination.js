import React from 'react'

class Pagination extends React.Component {
    render() {
        const { currentPage, handleClick, pageNumbers } = this.props
        console.log("currentPage: ", currentPage)

        return (
            <ul id="page-numbers">
                <li>
                    <button id="previous" onClick={handleClick} disabled={!(currentPage > 1)}>
                        ◄
                    </button>
                </li>
                {pageNumbers.map(number => {
                    return (
                        <li
                            key={number}
                        >
                            <button
                                id={number}
                                onClick={handleClick}
                                class={currentPage === number ? "current" : ""}
                                disabled={currentPage === number}
                            >
                                {number}
                            </button>
                        </li>
                    )
                })}
                <li>
                    <button id="next" onClick={handleClick} disabled={currentPage === pageNumbers.length}>
                        ►
                    </button>
                </li>
            </ul>
        )
    }
}

export default Pagination