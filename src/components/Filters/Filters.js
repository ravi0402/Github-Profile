import React, { Component } from 'react';
import Popup from '../Popup/Popup';
import './Filters.css';
import { filterType, filterLanguage } from '../Popup/store';

export default class Filters extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterTypeOpen: false,
            filterLangOpen: false,
            filterBy: {}
        }
    }

    openTypeFilter = () => {
        this.setState({
            filterTypeOpen: !this.state.filterTypeOpen,
            filterLangOpen: false,
        });
    }

    openLangFilter = () => {
        this.setState({
            filterLangOpen: !this.state.filterLangOpen,
            filterTypeOpen: false,
        });
    }

    filterSet = (filterType, filterInfo) => {

        this.props.filterRepos(filterType, filterInfo);
        this.setState({
            filterLangOpen: false,
            filterTypeOpen: false,
            filterBy: {
                [filterType]: filterInfo.title
            }
        });
    }

    searchRepo = (evt) => {
        this.props.searchRepo(evt.target.value);
    }

    render() {

        const {
            filterTypeOpen,
            filterLangOpen,
            filterBy
        } = this.state;

        return (
            <div>
                <div className="filters">
                    <input onChange={this.searchRepo} placeholder="Find a repository..." />
                    <div className="filter-item">
                        <button onClick={this.openTypeFilter} className="button">
                            <span>Type: </span>
                            <span>{filterBy['REPO_TYPE'] || 'All'}</span>
                            <span className="dropdown-caret"></span>
                        </button>
                        <Popup
                            filterItem={filterType}
                            filterToggle={filterTypeOpen}
                            handleClick={(filterInfo) => { this.filterSet('REPO_TYPE', filterInfo); }}
                        />
                    </div>
                    <div className="filter-item">
                        <button onClick={() => { this.openLangFilter(); }} className="button">
                            <span>Language: </span>
                            <span>{filterBy['LANGUAGE_TYPE'] || 'All'}</span>
                            <span className="dropdown-caret"></span>
                        </button>
                        <Popup
                            filterItem={filterLanguage}
                            filterToggle={filterLangOpen}
                            handleClick={(filterInfo) => { this.filterSet('LANGUAGE_TYPE', filterInfo); }}
                        />
                    </div>
                    <div className="button-new">
                        <svg
                            className="octicon octicon-repo"
                            viewBox="0 0 12 16"
                            version="1.1" width="12"
                            height="16" aria-hidden="true"
                        >
                            <path fillRule="evenodd" d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z">
                            </path>
                        </svg>
                        New
                    </div>
                </div>
            </div>
        )
    }
}