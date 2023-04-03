import React from 'react'

const NewName = () => {
    return (
        <div>
            <form onSubmit={this.props.handleSubmit}>
                <input
                    type="text"
                    name="newName"
                    value={this.props.value}
                    onChange={this.props.handleChange}
                    placeholder="New Name"
                    autoFocus
                    autoComplete='off'
                />
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default NewName