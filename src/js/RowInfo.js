import React from 'react';
import Styles from '../css/RowInfo.css';

class RowInfo extends React.Component {
	render(){
		return(
			<tr className={Styles.myRow}>
				<td>{this.props.userName}</td>
				<td><img src={this.props.img} className={"img-thumbnail " + Styles.myImg} /></td>
				<td>{this.props.allTime}</td>
				<td>{this.props.recent}</td>
				<td>{this.props.lastUpdate}</td>
			</tr>
		);
	}
}

export default RowInfo;