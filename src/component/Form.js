import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: '',
            name: '',
            shortDescription: '',
            active: true,
            idValidation: '',
            nameValidation: '',
            descriptionValidation: ''
        };

        this.state = this.initialState;
    }

    handleChange = event => {
        // Detects changes to input and updating state based on changes
        let { name, value } = event.target;
        if (value === 'false') {
            value = false;
        }
        if (value === 'true') {
            value = true;
        }
        this.setState({
            [name]: value
        });
    }

    validation() {
        let result = true;
        const programmes = JSON.parse(localStorage.getItem('programmes'));

        // Checking all the different validation for id input
        programmes.forEach(element => {
            if (element.id.toString() === this.state.id) {
                this.setState({ idValidation: '*Duplicate Id' });
                result = false;
            }
        });

        if (!this.state.id) {
            this.setState({ idValidation: '*Invalid Id' });
            result = false;
        } else if (this.state.id.length > 4) {
            this.setState({ idValidation: '*Invalid Id Length' });
            result = false;
        } else if (isNaN(this.state.id)) {
            this.setState({ idValidation: '*Id is not number' });
            result = false;
        }

        // Checking validation for name input
        if (!this.state.name) {
            this.setState({ nameValidation: '*Invalid Name' });
            result = false;
        }

         // Checking validation for description input
        if (!this.state.shortDescription) {
            this.setState({ descriptionValidation: '*Invalid Description' });
            result = false;
        }
        return result;
    }

    onFormSubmit = (event) => {
        // Before adding new row check if data is valid
        if (this.validation()) {
            this.props.addProgramme(this.state);
            this.props.displayForm();
            this.setState(this.initialState);
        }
    }

    render() {
        const { id, name, shortDescription, active } = this.state;

        return (
            <tr className="s-table-add-row">
                <td className="s-table-id">
                    <input
                        className={this.state.idValidation ? "s-table-item-add-id s-table-item-add-error" : null}
                        type="text"
                        placeholder="Insert Id..."
                        name="id"
                        value={id}
                        onChange={this.handleChange} />

                    <div className="s-table-item-add-validation-message">{this.state.idValidation}</div>
                </td>
                <td className="s-table-name">
                    <input
                        className={this.state.nameValidation ? "s-table-item-add-item s-table-item-add-error" : null}
                        type="text"
                        placeholder="Insert Name..."
                        name="name"
                        value={name}
                        onChange={this.handleChange} />

                    <div className="s-table-item-add-validation-message">{this.state.nameValidation}</div>
                </td>
                <td className="s-table-description">
                    <input
                        className={this.state.descriptionValidation ? "s-table-item-add-item s-table-item-add-error" : null}
                        type="text"
                        placeholder="Insert Short Description..."
                        name="shortDescription"
                        value={shortDescription}
                        onChange={this.handleChange} />

                    <div className="s-table-item-add-validation-message">{this.state.descriptionValidation}</div>
                </td>
                <td className="s-table-status">
                    <select className="s-table-item-add-status" placeholder="Programme Status..." name="active" value={active} onChange={this.handleChange} >
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
                    </select>
                </td>
                <td className="s-table-edit">
                </td>
                <td className="s-table-submit-item">

                    <button type="submit" onClick={this.onFormSubmit}>
                        Submit
                    </button>
                </td>
            </tr>
        );
    }
}

export default Form;