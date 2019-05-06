import React, { Component } from 'react'
import TableItem from './TableItem'
import Form from './Form'

class Table extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formStatus: false,
        };
    }

    displayForm = () => {
        this.state.formStatus ? this.setState({ formStatus: false }) : this.setState({ formStatus: true });
    }

    render() {
        return (
            <div>
                {this.props.programmeData.length > 0 ?
                    <table className="s-table" >
                        <thead>
                            <tr>
                                <th className="s-table-id" onClick={this.props.filter}>ID{this.props.filterType === 'ID' ? <i className="s-table-filter fa fa-long-arrow-up" aria-hidden="true"></i> : null}</th>
                                <th className="s-table-name" onClick={this.props.filter}>Name{this.props.filterType === 'Name' ? <i className="s-table-filter fa fa-long-arrow-up" aria-hidden="true"></i> : null}</th>
                                <th className="s-table-description">Description</th>
                                <th className="s-table-status">Status</th>
                                <th className="s-table-edit">Edit</th>
                                <th className="s-table-remove">
                                    {this.state.formStatus ? <i title="Cancel" className="s-table-item-add-cancel fa fa-times-circle fa-2x" aria-hidden="true" onClick={this.displayForm}></i>
                                        : <i title="Add new programme" className="s-table-item-add fa fa-plus-circle fa-2x" aria-hidden="true" onClick={this.displayForm}></i>}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.formStatus ? <Form addProgramme={this.props.addProgramme} displayForm={this.displayForm} /> : null}
                            {
                                this.props.programmeData.map((programme) => {
                                    return <TableItem key={programme.id} programmeData={programme} removeProgramme={this.props.removeProgramme} editProgramme={this.props.editProgramme} />
                                })
                            }

                        </tbody>
                    </table> : <div className="s-table-empty-state">No data to display <i className="s-table-empty-state-icon fa fa-frown-o" aria-hidden="true"></i></div>
                }
            </div>
        )
    }

}

export default Table