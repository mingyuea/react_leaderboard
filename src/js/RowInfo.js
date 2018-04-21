import React from 'react';

class RowInfo extends React.Component {
	render(){
		return(
			<tr>
				<td>{this.props.userName}</td>
				<td>{this.props.img}</td>
				<td>{this.props.allTime}</td>
				<td>{this.props.recent}</td>
				<td>{this.props.lastUpdate}</td>
			</tr>
		);
	}
}

export default RowInfo;