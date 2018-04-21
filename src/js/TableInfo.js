import React from 'react';
import RowInfo from './RowInfo';

export default class TableInfo extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			recentInfo: [],
			allTimeInfo: [],
			showRecent: true
		};

		this.toggleRecent = this.toggleRecent.bind(this);
		this.toggleAlltime = this.toggleAlltime.bind(this);
	}

	toggleRecent(){
		this.setState({showRecent: true});
	}

	toggleAlltime(){
		this.setState({showRecent: false});
	}



	componentDidMount(){
		Promise.all([
			fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent'),
      		fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
		])
		.then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
		.then(([data1, data2]) => this.setState({
			recentInfo: data1, 
			alltimeInfo: data2
		}));
	}

	render(){
		let rRend = "default";
		if(this.state.recentInfo.length > 1) {
			if(this.state.showRecent == true){
			rRend = this.state.recentInfo.map((v, ind) => <RowInfo key={ind} userName={v.username} img={v.img} allTime={v.alltime} recent={v.recent} lastUpdate={v.lastUpdate} />);
			}
			else{
			rRend = this.state.alltimeInfo.map((x, ind) => <RowInfo key={ind} userName={x.username} img={x.img} allTime={x.alltime} recent={x.recent} lastUpdate={x.lastUpdate} />);
			}
		}

		return(
				<tbody>
					<tr>
						<td><button onClick={this.toggleRecent}>Sort by Recent Top Points</button></td>
						<td><button onClick={this.toggleAlltime}>Sort by All Time Top Points</button></td>
					</tr>
					{rRend}
				</tbody>
		);
	}
}