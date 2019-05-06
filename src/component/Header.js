import React, { Component } from 'react'

class Header extends Component {

    state = { term: '' };

    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.term);
    }

    render() {
        return (
            <div className="s-header">
                <h3 className="s-header-title"> Programme App</h3>
                <form onSubmit={this.onFormSubmit}>
                    <div className="s-header-search-container">
                        <input
                            className="s-header-search-bar"
                            type="text"
                            placeholder="Search by name..."
                            value={this.state.term}
                            onChange={(e) => this.setState({ term: e.target.value })} />
                    </div>
                </form>
            </div>
        );
    }
}

export default Header