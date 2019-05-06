import React, { Component } from 'react'

class TableBody extends Component {

    constructor(props) {
        super(props);
        this.initialState = {
            id: '',
            name: '',
            shortDescription: '',
            active: '',
            editNameValidation: null,
            editDescriptionValidation: null,
        };

        this.state = this.props.programmeData;
    }

    handleChange = event => {
         // Detects changes to input and updating state based on changes
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    editProgramme = (row) => {
        // Check for inputs
        const rows = document.querySelectorAll('tr');

        rows.forEach((tr) => {

            // Updates all inputs and icons back to the original form
            if (tr.querySelectorAll('td')) {
                tr.querySelectorAll('td').forEach((td) => {
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
            }

            // Updates the specifc row to show the input fields and icons
            if (tr.id === row.id.toString()) {
                tr.childNodes.forEach((td) => {
                    if (td.className.includes('s-table-item-info')) {
                        td.querySelector('.s-table-item-info--input').classList.add('active');
                        td.querySelector('.s-table-item-info--text').classList.add('hidden');
                    }
                    if (td.className === 's-table-description s-table-item-info') {
                        td.querySelector('.s-table-item-info--input,.active').classList.add('active');
                        td.querySelector('.s-table-item-info--text,.hidden').classList.add('hidden');
                    }
                    if (td.className === 's-table-edit s-table-item-buttons-edit') {
                        td.querySelector('.s-table-item-update').classList.add('active');
                        td.querySelector('.s-table-item-edit').classList.add('hidden');
                    }
                    if (td.className === 's-table-remove s-table-item-buttons-delete') {
                        td.querySelector('.s-table-item-cancel').classList.add('active');
                        td.querySelector('.s-table-item-delete').classList.add('hidden');
                    }
                });
            }

        });

    };

    cancelEdit = (id) => {

        // Reverts state to original form
        this.setState(this.props.programmeData);
        this.setState({ editDescriptionValidation: null, editNameValidation: null });

        // Updates all inputs and icons back to the original form
        const tableRow = document.getElementById(id);
        tableRow.childNodes.forEach((td) => {
            if (td.className.includes('s-table-item-info')) {
                td.querySelector('.s-table-item-info--input').classList.remove('active');
                td.querySelector('.s-table-item-info--text').classList.remove('hidden');
            }
            if (td.className === 's-table-edit s-table-item-buttons-edit') {
                td.querySelector('.s-table-item-update').classList.remove('active');
                td.querySelector('.s-table-item-edit').classList.remove('hidden');
            }
            if (td.className === 's-table-remove s-table-item-buttons-delete') {
                td.querySelector('.s-table-item-cancel').classList.remove('active');
                td.querySelector('.s-table-item-delete').classList.remove('hidden');
            }
        });
    }

    validation() {
        let result = true;

        // Checking validation for name input
        if (!this.state.name) {
            this.setState({ editNameValidation: '*Invalid Name' });
            result = false;
        }

        // Checking validation for description input
        if (!this.state.shortDescription) {
            this.setState({ editDescriptionValidation: '*Invalid Description' });
            result = false;
        }
        return result;
    }

    render() {
        const { id, name, shortDescription, active } = this.state;

        return (
            <tr id={id} key={id} className={!active ? 's-inactive' : ''}>
                <td className="s-table-id">{id}</td>
                <td className="s-table-name s-table-item-info">
                    <div className="s-table-item-info--text">{name}</div>
                    <input
                        className={this.state.editNameValidation ? "s-table-item-info--input active s-table-item-add-error" : "s-table-item-info--input"}
                        type="text"
                        name="name"
                        value={name}
                        onChange={this.handleChange} />
                </td>
                <td className="s-table-description s-table-item-info">
                    <div className="s-table-item-info--text">{shortDescription}</div>
                    <input
                        className={this.state.editDescriptionValidation ? "s-table-item-info--input active s-table-item-add-error" : "s-table-item-info--input"}
                        type="text"
                        name="shortDescription"
                        value={shortDescription}
                        onChange={this.handleChange} />
                </td>
                <td className="s-table-status">
                    {active ? <i className="s-table-item-active fa fa-circle" aria-hidden="true"></i> : <i className="s-table-item-inactive fa fa-circle" aria-hidden="true"></i>}
                </td>
                <td className="s-table-edit s-table-item-buttons-edit">
                    <i className="s-table-item-edit fa fa-pencil fa-2x" onClick={() => this.editProgramme(this.props.programmeData)}></i>
                    <i className="s-table-item-update fa fa-check fa-2x" onClick={() => {
                        if (this.validation()) {
                            this.props.editProgramme(this.state)
                            this.setState({ editDescriptionValidation: null, editNameValidation: null });
                        }
                    }
                    } ></i>
                </td>
                <td className="s-table-remove s-table-item-buttons-delete">
                    <i className="s-table-item-delete fa fa-trash fa-2x" aria-hidden="true" onClick={() => this.props.removeProgramme(id)}></i>
                    <i className="s-table-item-cancel fa fa-times fa-2x" aria-hidden="true" onClick={() => this.cancelEdit(id)}></i>
                </td>
            </tr>
        )
    }
}

export default TableBody