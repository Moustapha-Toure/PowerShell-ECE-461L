import React from 'react'

const Results = () => {
    return (
        <>
            {this.props.names.map((row) => {
                <div key={row.id}>
                    {row.name}
                </div>
            })
            }
        </>
    )
}

export default Results