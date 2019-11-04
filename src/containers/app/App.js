import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	getUserInformation,
	getUserRepos,
	searchRepos,
	filterRepos
} from '../../actions/userActions';
import Header from '../../components/Header/Header';
import UserInfo from '../../components/UserInfo/UserInfo';
import Tab from '../../components/Tab/Tab';
import Filters from '../../components/Filters/Filters';
import Repository from '../../components/Repository/Repository';

import './App.css';
import TABS from '../../constants';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userInformation: {
				userInfo: {},
				userRepos: [],
				filterRepos: [],
			},
		};
	}

	componentDidMount() {
		this.props.getUserInformation();
		this.props.getUserRepos();
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			userInformation: nextProps.userInformation,
		};
	}

	searchRepo = value => {
		this.props.searchRepos(value).then(() => {
			let { userInformation } = this.state;
			let newUserInformation = {
				userInfo: userInformation.userInfo,
				userRepos: userInformation.filterRepos,
				filterRepos: userInformation.filterRepos,
			};

			this.setState({
				userInformation: newUserInformation,
			});
		});
	}

	filterRepos = (filterType, filterInfo) => {
		this.props.filterRepos(filterType, filterInfo);
	}

	render() {

		const { userInfo } = this.state.userInformation;

		return (
			<div>
				<Header />
				<div className="container">
					<UserInfo userInfo={userInfo} />
					<div className="repositories-section">
						<div className="tab">
							{TABS.map((tab, index) => <Tab key={index} userInfo={userInfo} tabContent={tab} />)}
						</div>
						<Filters searchRepo={this.searchRepo} filterRepos={this.filterRepos} />
						<ul className="user-repositories">
							{this.state.userInformation.filterRepos.map((repo, index) => <Repository key={index} repository={repo} />)}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userInformation: state.userInformation,
	};
};

export default connect(
	mapStateToProps,
	{ getUserInformation, getUserRepos, searchRepos, filterRepos }
)(App);