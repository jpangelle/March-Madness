import React, { Component } from 'react';
import { AutoComplete, Button, Icon, Input, Spin } from 'antd';
import axios from 'axios';
import EntryTable from './EntryTable';
import PickCountTable from './PickCountTable';
import AboutModal from './AboutModal';
import logo from './logo.png';
import './styles.scss';

const antIcon = <Icon type="loading" style={{ fontSize: 60 }} spin />;

export default class App extends Component {
  state = {
    aboutModalStatus: false,
    entryData: [],
    pickCount: [],
    showStatus: 'all',
    searchText: '',
  };

  componentDidMount() {
    axios
      .get('/fetchEntries')
      .then(({ data }) => {
        this.setState({
          day: data.day,
          entryData: data.pickData.sort(this.sortDataAlphabetically),
          pickCount: data.pickCount,
        });
      })
      .catch(err => {
        console.log('error on fetching entries', err);
      });
  }

  // * Future Data Entry
  // addEntryToDatabase = () => {
  //   axios
  //     .post('newEntry', {
  //       entryName: 'slim1',
  //       teams: ['Kansas', 'North Carolina'],
  //       status: true,
  //     })
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  getAliveEntries = () => {
    const { entryData } = this.state;
    return entryData.filter(entry => entry.status);
  };

  getDeadEntries = () => {
    const { entryData } = this.state;
    return entryData.filter(entry => !entry.status);
  };

  getEntryNames = () => {
    const visibleData = this.getVisibleData();
    return visibleData.map(datum => datum.entryName);
  };

  getVisibleData = () => {
    const { entryData } = this.state;
    return entryData
      .filter(entry => this.matchesShowStatus(entry))
      .filter(entry => this.matchesSearchInput(entry));
  };

  handleCloseModal = e => {
    e.stopPropagation();
    this.setState({
      aboutModalStatus: false,
    });
  };

  handleOpenModal = () => {
    this.setState({
      aboutModalStatus: true,
    });
  };

  handleSearchAndSelect = value => {
    this.setState({
      searchText: value,
    });
  };

  handleChangeStatus = statusFilter => {
    this.setState({
      showStatus: statusFilter,
    });
  };

  matchesSearchInput = ({ entryName }) => {
    const { searchText } = this.state;
    return entryName.toLowerCase().includes(searchText.toLowerCase());
  };

  matchesShowStatus = ({ status }) => {
    const { showStatus } = this.state;
    if (showStatus === 'dead') {
      return !status;
    } else if (showStatus === 'alive') {
      return status;
    }
    return true;
  };

  sortDataAlphabetically = (a, b) => {
    if (a.entryName < b.entryName) return -1;
    if (a.entryName > b.entryName) return 1;
    return 0;
  };

  render() {
    const { aboutModalStatus, day, entryData, pickCount } = this.state;

    return (
      <div className="app">
        <div className="header">
          <div className="logo">
            <a href="/">
              <img src={logo} alt="logo" />
            </a>
          </div>
          <a href="/">
            <div className="navbar-item home">Home</div>
          </a>
          <div className="navbar-item about" onClick={this.handleOpenModal}>
            About
            <AboutModal
              aboutModalStatus={aboutModalStatus}
              handleCloseModal={this.handleCloseModal.bind(this)}
            />
          </div>
          <div />
        </div>
        <div className="contentDiv">
          <div className="content">
            <div className="filters">
              <div className="filter-div">
                <div className="filter-button-div">
                  <Button
                    type="primary"
                    className="alpha-button filter-item"
                    onClick={() => this.handleChangeStatus('all')}
                  >
                    All
                    <span className="number-of">
                      {entryData.length ? `(${entryData.length})` : ''}
                    </span>
                  </Button>
                </div>
                <div className="filter-button-div">
                  <Button
                    type="primary"
                    className="alpha-button filter-item"
                    onClick={() => this.handleChangeStatus('alive')}
                  >
                    Alive
                    <span className="number-of">
                      {entryData.length
                        ? `(${this.getAliveEntries().length})`
                        : ''}
                    </span>
                  </Button>
                </div>
                <div className="filter-button-div">
                  <Button
                    type="primary"
                    className="alpha-button filter-item"
                    onClick={() => this.handleChangeStatus('dead')}
                  >
                    Dead
                    <span className="number-of">
                      {entryData.length
                        ? `(${this.getDeadEntries().length})`
                        : ''}
                    </span>
                  </Button>
                </div>
              </div>
              <div className="search">
                <AutoComplete
                  dataSource={entryData.length ? this.getEntryNames() : ''}
                  placeholder="search entry"
                  filterOption={(inputValue, option) =>
                    option.props.children
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                  onSearch={this.handleSearchAndSelect}
                  onSelect={this.handleSearchAndSelect}
                  className="search-bar"
                >
                  <Input
                    suffix={
                      <Icon type="search" className="certain-category-icon" />
                    }
                  />
                </AutoComplete>
              </div>
            </div>

            {entryData.length ? (
              <>
                <div className="pick-count">
                  <PickCountTable day={day} pickCount={pickCount} />
                </div>
                <div>
                  <EntryTable data={this.getVisibleData()} day={day} />
                </div>
              </>
            ) : (
              <Spin className="loader" indicator={antIcon} />
            )}
          </div>
        </div>
        <div className="footer">
          Angelle Consulting ©2019 Created by JP Angelle
        </div>
      </div>
    );
  }
}
