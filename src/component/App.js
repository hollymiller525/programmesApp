import React, { Component } from 'react'
import shows from '../Shows.json';
import Header from './Header'
import Table from './Table'

class App extends Component {

    state = { programmes: [], filterType: '' }

    componentDidMount() {
        this.onSearchSubmit('');
    }

    onSearchSubmit = term => {
        
        // Checks if item is in local storage
        localStorage.getItem('programmes') ?

        // Sets state to local storage value
            this.setState({ programmes: JSON.parse(localStorage.getItem('programmes')).filter(show => show.name.toUpperCase().includes(term.toUpperCase())) }) :

        // Adds json files contents to local storage and sets state
            localStorage.setItem('programmes', JSON.stringify(shows.results))
        this.setState({ programmes: JSON.parse(localStorage.getItem('programmes')).filter(show => show.name.toUpperCase().includes(term.toUpperCase())) })
    }

    removeProgramme = id => {

        // Removing item from state
        this.setState({
            programmes: this.state.programmes.filter((programme, i) => {
                return programme.id !== id;
            })
        })

        // Removing item from local storage
        localStorage.setItem('programmes', JSON.stringify(JSON.parse(localStorage.getItem('programmes')).filter((programme, i) => {
            return programme.id !== id;
        })));
    }

    filter = e => {
        const filterType = e.target.innerHTML;

        // Filtering state based on ID and Name
        if (filterType === 'ID') {
            this.setState({ programmes: this.state.programmes.sort((a, b) => a.id - b.id), filterType: filterType });
        } else if (filterType === 'Name') {
            this.setState({ programmes: this.state.programmes.sort((a, b) => a.name.toString().localeCompare(b.name)), filterType: filterType });
        }
        // Updating local storage
        localStorage.setItem('programmes', JSON.stringify(this.state.programmes))
    }

    editProgramme = programme => {

        // Resets edits inputs and icons
        const tableRow = document.getElementById(programme.id);
        tableRow.childNodes.forEach((td) => {
            if (td.className.includes('s-table-item-info')) {
                td.querySelector('.s-table-item-info--input,.active').classList.remove('active');
                td.querySelector('.s-table-item-info--text,.hidden').classList.remove('hidden');
            }
            if (td.className === 's-table-edit s-table-item-buttons-edit') {
                td.querySelector('.s-table-item-update,.active').classList.remove('active');
                td.querySelector('.s-table-item-edit,.hidden').classList.remove('hidden');
            }
            if (td.className === 's-table-remove s-table-item-buttons-delete') {
                td.querySelector('.s-table-item-cancel,.active').classList.remove('active');
                td.querySelector('.s-table-item-delete,.hidden').classList.remove('hidden');
            }
        });

        // Updating state after editing programme
        const modifiedProgrammesLocalStorage = JSON.parse(localStorage.getItem('programmes'));
        modifiedProgrammesLocalStorage.forEach((element, index) => {
            if (element.id === programme.id) {
                modifiedProgrammesLocalStorage[index] = programme;
            }
        });

        // Updating local storage after editing programme
        localStorage.setItem('programmes', JSON.stringify(modifiedProgrammesLocalStorage));
        const modifiedProgrammes = this.state.programmes;
        modifiedProgrammes.forEach((element, index) => {
            if (element.id === programme.id) {
                modifiedProgrammes[index] = programme;
            }
        });
        this.setState({ programmes: modifiedProgrammes });
    }

    addProgramme = programme => {

        // Adding new programme to the end of state and updating local storage
        const response = [...this.state.programmes, programme]
        localStorage.setItem('programmes', JSON.stringify(response));
        this.setState({ programmes: response });
    }

    render() {
        return (
            <div>
                <Header onSubmit={this.onSearchSubmit} />
                <div className="s-web-content">
                    <div className="container">
                        <Table programmeData={this.state.programmes} removeProgramme={this.removeProgramme} editProgramme={this.editProgramme} filter={this.filter} addProgramme={this.addProgramme} filterType={this.state.filterType} />
                    </div>
                </div>
            </div>
        )
    }
}

export default App