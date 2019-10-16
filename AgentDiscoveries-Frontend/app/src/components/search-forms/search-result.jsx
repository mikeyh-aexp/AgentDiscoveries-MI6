import * as React from 'react';
import Result from './result';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {Table} from 'react-bootstrap';

export default class SearchResult extends React.Component {
    constructor(props) {
        super(props);

        this.jsPdfGenerator = this.jsPdfGenerator.bind(this);
    }

    render() {
        return (

            <React.Fragment>
                {this.getResultsHeader(this.props.results)}

                <Table key={this.props.api + '-table'}>
                    {this.renderTableHeader()}
                    {this.renderTableBody()}
                </Table>

            </React.Fragment>

        );
    }

    getHeaders() {
        const resultSet = new Set();
        this.props.results.forEach( (result) => {
            Object.keys(result).forEach(key => resultSet.add(key));
        } );
        return [...resultSet];
    }

    renderTableHeader() {
        const resultArr = this.getHeaders();
        const formattedResultArr = [];

        resultArr.forEach(function(header) {
            const capitialized = header.charAt(0).toUpperCase() + header.slice(1);
            const split = capitialized.split(/(?=[A-Z])/);
            const formattedHeader = split.join(' ');
            formattedResultArr.push(formattedHeader);
        });

        return (
            <thead>
                <tr>
                    {formattedResultArr.map((key) => {
                        return <th key={key}>{key}</th>;
                    })}
                </tr>
            </thead>
        );
    }

    renderTableBody() {
        return (
            <tbody>
                {this.props.results.map(result => {
                    // Assume the first property is the ID, or at least unique enough to use as a key.

                    return <Result key={Object.values(result)[1]} date={Object.values(result)[3]} entity={result} headers={this.getHeaders()} />;
                })}
            </tbody>
        );
    }

    getResultsHeader(results) {
        return results.length > 0
            ? (results.length === 1
                ? <div className="result-heading"><h3>{results.length}<span> result</span></h3><button className='btn' onClick={this.jsPdfGenerator}>Download PDF</button></div>
                : <div className="result-heading"><h3>{results.length}<span> results</span></h3><button className='btn' onClick={this.jsPdfGenerator}>Download PDF</button></div>)
            : '';
    }

    jsPdfGenerator() {
        const doc = new jsPDF();
        const col = Object.keys(this.props.results[0]);
        const rows = [];
        for (let i = 0; i < this.props.results.length; i++ ) {
            rows.push(Object.values(this.props.results[i]));
        }
        doc.autoTable(col, rows, { startY: 10 });
        const date = new Date();
        let result = date.getHours() < 12 ? 'Reports - ' + date.getHours() + '.' + date.getMinutes() + 'am.pdf'
            : 'Reports - ' + date.getHours() + '.' + date.getMinutes() + 'pm.pdf';
        doc.save(result);
    }

}
