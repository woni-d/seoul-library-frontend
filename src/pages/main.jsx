import React, { Component } from 'react';
import axios from 'axios';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Header from '../components/Header';
import CustomCard from '../components/CustomCard';
import LinearProgress from '../components/LinearProgress';
import CustomPagination from '../components/CustomPagination';
import { Container, Libraries } from './Main.style';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      libraryAllCount: null,
      libraryList: null,
      libraryListLength: null,
      libraryTotalCount: (53 - 0) + 1,
      libraryStartCount: 0,
      libraryEndCount: 53,
      searchOption: 'selectedDistrict',
      selectedDistrict: '강남구',
      searchText: '',
      libraryCountPerPage: 5, // default
      currentPage: 1,

      successAlertOpen: false,
      errorAlertOpen: false,
    };
  }

  async componentDidMount() {
    // TODO: 구별 카운트 정의
    await this.getLibraryInfo();
  }

  async getLibraryInfo() {
    const { searchOption, libraryStartCount, currentPage, libraryCountPerPage } = this.state;
    const apiKey = process.env.REACT_APP_SEOUL_API_KEY;

    if (searchOption === 'selectedDistrict') {
      const diff = (currentPage * libraryCountPerPage)
      const libraryApiUri = `http://openapi.seoul.go.kr:8088/${apiKey}/json/SeoulLibraryTimeInfo/${libraryStartCount + diff}/${libraryStartCount + diff + (libraryCountPerPage - 1)}`;
      try {
        const { config, data: { SeoulLibraryTimeInfo: { list_total_count, row } }, headers, request, status, statusText } = await axios.get(libraryApiUri);
        this.setState({
          libraryAllCount: list_total_count,
          libraryList: row,
          libraryListLength: row.length,
        })
        this.setState({
          successAlertOpen: true,
        })
      } catch (err) {
        this.setState({
          errorAlertOpen: true,
        })
      }
    }
    else {
      const { searchText, libraryAllCount } = this.state;
      try {
        // TODO: handleChange 말고 검색
        // TODO: KeyPress 이벤트
        let libraryList = []
        for (let i = 0; i < Math.floor(libraryAllCount / 1000) + (libraryAllCount % 1000 ? 1 : 0); i++) {
          const libraryApiUri = `http://openapi.seoul.go.kr:8088/${apiKey}/json/SeoulLibraryTimeInfo/${(i * 1000)}/${((i + 1) * 999)}`;
          const { config, data: { SeoulLibraryTimeInfo: { list_total_count, row } }, headers, request, status, statusText } = await axios.get(libraryApiUri);
          libraryList = [...libraryList, ...row];
        }

        let filterField = null;
        if (searchOption === 'name') {
          filterField = 'LBRRY_NAME';
        }
        else {
          filterField = 'ADRES';
        }
        const filteredLibraryList = libraryList.filter(elem => elem[filterField].includes(searchText));
        this.setState({
          libraryList: filteredLibraryList,
          libraryTotalCount: filteredLibraryList.length,
        });
      } catch (err) {
        console.log(err);
        this.setState({
          errorAlertOpen: true,
        });
      }
    }
  }

  handleClose = (e) => {
    this.setState({
      successAlertOpen: false,
      errorAlertOpen: false,
    });
  }

  handleSearch = (e) => this.setState({ currentPage: 0 }, this.getLibraryInfo)

  handlePagination = (e, value) => this.setState({ currentPage: value}, this.getLibraryInfo)

  handleSearchOptionChange = (value) => e => {
    this.setState({
      searchOption: value === 0 ? 'selectedDistrict' : 'name',
    });
  }

  handleChange = e => {
    const stateObj = {};
    if (e.target.name === 'selectedDistrict') {
      let selectedDistrict = e.target.value;
      let start, end;
      switch (selectedDistrict) {
        case '강동구':
          start = 54;
          end = 104;
          break;
        case '강북구':
          start = 105;
          end = 157;
          break;
        case '강서구':
          start = 158;
          end = 239;
          break;
        case '관악구':
          start = 240;
          end = 293;
          break;
        case '광진구':
          start = 294;
          end = 330;
          break;
        case '구로구':
          start = 331;
          end = 411;
          break;
        case '금천구':
          start = 412;
          end = 436;
          break;
        case '노원구':
          start = 437;
          end = 482;
          break;
        case '도봉구':
          start = 483;
          end = 526;
          break;
        case '동대문구':
          start = 527;
          end = 568;
          break;
        case '동작구':
          start = 569;
          end = 620;
          break;
        case '마포구':
          start = 621;
          end = 674;
          break;
        case '서대문구':
          start = 675;
          end = 709;
          break;
        case '성동구':
          start = 779;
          end = 812;
          break;
        case '성북구':
          start = 813;
          end = 880;
          break;
        case '서초구':
          start = 710;
          end = 778;
          break;
        case '송파구':
          start = 881;
          end = 962;
          break;
        case '영등포구':
          start = 1013;
          end = 1068;
          break;
        case '용산구':
          start = 1069;
          end = 1124;
          break;
        case '양천구':
          start = 963;
          end = 1012;
          break;
        case '은평구':
          start = 1125;
          end = 1222;
          break;
        case '종로구':
          start = 1223;
          end = 1272;
          break;
        case '중구':
          start = 1273;
          end = 1315;
          break;
        case '중랑구':
          start = 1316;
          end = 1366;
          break;
        default:
          selectedDistrict = '강남구';
          start = 1;
          end = 53;
      }
      stateObj['libraryStartCount'] = start;
      stateObj['libraryEndCount'] = end;
      stateObj['libraryTotalCount'] = (end - start);
      stateObj['searchText'] = '';
    }
    if (e.target.name === 'libraryStartCount' || e.target.name === 'libraryEndCount') {
      stateObj[e.target.name] = Number(e.target.value);
      const targetCountState = e.target.name === 'libraryStartCount' ? 'libraryEndCount' : 'libraryStartCount';
      stateObj[targetCountState] = this.state[targetCountState];
      stateObj['libraryTotalCount'] = (stateObj['libraryEndCount'] - stateObj['libraryStartCount']) + 1;
    }
    this.setState({
      [e.target.name]: e.target.value,
      ...stateObj,
      currentPage: 1,
    }, this.getLibraryInfo);
  }
  
	render() {
    const {
      successAlertOpen,
      errorAlertOpen,
      libraryList,
      libraryListLength,
      libraryTotalCount,
      libraryStartCount,
      libraryEndCount,
      searchOption,
      selectedDistrict,
      searchText,
    } = this.state;

    let {
      libraryCountPerPage,
      currentPage
    } = this.state;

    const districtList = [
      '강남구',
      '강동구',
      '강서구',
      '강북구',
      '관악구',
      '광진구',
      '구로구',
      '금천구',
      '노원구',
      '동대문구',
      '도봉구',
      '동작구',
      '마포구',
      '서대문구',
      '성동구',
      '성북구',
      '서초구',
      '송파구',
      '영등포구',
      '용산구',
      '양천구',
      '은평구',
      '종루구',
      '중구',
      '중랑구',
    ];

    const searchOptionObj = {
      district: {
        prop: 'selectedDistrict',
        label: '구명',
      },
      name: {
        prop: 'name',
        label: '도서관명',
      },
      address: {
        prop: 'address',
        label: '도서관주소',
      }
    };
    const searchTextOptionArr = [
      'name',
      'address',
    ]

    if (!libraryList) {
      return null;
    }
    if (libraryListLength > 0) {
      let maxPageCount = Math.floor((libraryListLength - 1) / libraryCountPerPage)
      if (maxPageCount < 0) maxPageCount = 0
      if (currentPage > maxPageCount) currentPage = maxPageCount
    }
    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return (
      <Container>
        <Header
          districtList={districtList}
          searchOption={searchOption}
          searchOptionObj={searchOptionObj}
          searchTextOptionArr={searchTextOptionArr}
          selectedDistrict={selectedDistrict}
          libraryStartCount={libraryStartCount}
          libraryEndCount={libraryEndCount}
          searchText={searchText}
          handleSearchOptionChange={this.handleSearchOptionChange}
          handleSearchValueChange={this.handleChange}
          handleSearch={this.handleSearch}
        />
      
        <div>
          <LinearProgress />
        </div>

        <Snackbar open={successAlertOpen} autoHideDuration={3000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="success">
            도서관 정보를 정상적으로 불러왔습니다!
          </Alert>
        </Snackbar>

        <Snackbar open={errorAlertOpen} autoHideDuration={3000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="error">
          도서관 정보를 불러오지 못했습니다.
          </Alert>
        </Snackbar>
        
        <Libraries>
          {
            (libraryList ? libraryList : Array.from({length: 10}, (v, i) => null)).map((elem, idx) => (
              <CustomCard
                key={idx}
                cardItem={elem}
                loading={libraryList ? false : true}
              />
            ))
          }
          <CustomPagination totalPage={Math.floor((libraryTotalCount / libraryCountPerPage) + 1)} currentPage={currentPage} handlePagination={this.handlePagination} />
        </Libraries>

      </Container>
		)
	}
}

export default Main;
