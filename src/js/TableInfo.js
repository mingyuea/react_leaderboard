import React from 'react';
import ReactDOM from 'react-dom';
import RowInfo from './RowInfo';

class TableInfo extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			recentInfo: [],
			allTimeInfo: [],
			showRecent: true,
			buttonRecent: "btn-primary myButton",
			buttonAlltime: "btn-default myButton"
		};

		this.toggleRecent = this.toggleRecent.bind(this);
		this.toggleAlltime = this.toggleAlltime.bind(this);
	}

	toggleRecent(){
		this.setState({
			showRecent: true,
			buttonRecent: "btn-primary myButton",
			buttonAlltime: "btn-default myButton"
		});
	}

	toggleAlltime(){
		this.setState({
			showRecent: false,
			buttonRecent: "btn-default myButton",
			buttonAlltime: "btn-primary myButton"
		});
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
		let rRend = "Loading...";
		if(this.state.recentInfo.length > 1) {
			if(this.state.showRecent == true){
			rRend = this.state.recentInfo.map((v, ind) => <RowInfo key={ind} userName={v.username} img={v.img} allTime={v.alltime} recent={v.recent} lastUpdate={v.lastUpdate} />);
			}
			else{
			rRend = this.state.alltimeInfo.map((x, ind) => <RowInfo key={ind} userName={x.username} img={x.img} allTime={x.alltime} recent={x.recent} lastUpdate={x.lastUpdate} />);
			}
		}

		return(
			<div className="container">
				<h1>Free Code Camp Leaderboard</h1>
				<br />
				<div className="container">
					<button className={this.state.buttonRecent} onClick={this.toggleRecent}>Sort by Recent Top Points</button>
					<button className={this.state.buttonAlltime} onClick={this.toggleAlltime}>Sort by All Time Top Points</button>
				</div>
				<table className="table table-striped">
					<thead>
						<tr>
							<th>User</th>
							<th></th>
							<th>All Time Points</th>
							<th>Recent Points</th>
							<th>Date Last Login</th>
						</tr>
					</thead>
					<tbody>
						{rRend}
					</tbody>
				</table>
			</div>
		);
	}
}

export default TableInfo;

const wrapper = document.getElementById('app');

wrapper ? ReactDOM.render(<TableInfo />, wrapper) : false;