import React from 'react';
import ReactDOM from 'react-dom';
import TableInfo from './TableInfo';


class TableContainer extends React.Component {
	render(){
		return(
			<table>
				<TableInfo />
			</table>
		);
	}
}

export default TableContainer;

const wrapper = document.getElementById('app');

wrapper ? ReactDOM.render(<TableContainer />, wrapper) : false;