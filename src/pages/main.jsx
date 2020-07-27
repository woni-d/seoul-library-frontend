import React, { Component } from 'react';
import { Snackbar, TextField, Button, IconButton } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import SaveIcon from '@material-ui/icons/Save';
import SearchIcon from '@material-ui/icons/Search';
import Header from '../components/Header';
import CustomSelect from '../components/CustomSelect';
import CustomCard from '../components/CustomCard';
import LinearProgress from '../components/LinearProgress';
import CustomPagination from '../components/CustomPagination';
import { Container, Libraries } from './Main.style';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      district: '강남구',
      libraryList: null,
      libraryListCount: null,
      libraryStartPosition: null,
      libraryEndPosition: null,
      libraryCountPerPage: 16, // default
      currentPage: null,
      successAlertOpen: false,
      errorAlertOpen: false,
    };
  }

  componentDidMount() {
    this.getLibraryInfo();
  }

  getLibraryInfo() {
    this.setState({
      libraryList: [
        {
          LBRRY_SEQ_NO: 1571,
          LBRRY_NAME: 'LH강남3단지작은도서관',
          CODE_VALUE: '강남구',
          ADRES: '서울특별시 강남구 자곡로3길 22',
          FDRM_CLOSE_DATE: '매주 화요일,목요일',
          TEL_NO: '02-459-8700',
        },
      ],
      libraryListCount: 1,
      currentPage: 1,
    })
  }

  handleClose = (e) => {
    this.setState({
      [`${e.target.name}AlertOpen`]: false,
    })
  }

  handlePagination = (e, value) => {
    this.setState({
      currentPage: value,
    });
  }

  handleChange = e => {
    const stateObj = {};
    if (e.target.name === 'district') {
      const selectedDistrict = e.target.value;
      let start, end;
      switch (selectedDistrict) {
        case '강남구':
          start = 1;
          end = 53;
          break;
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
          start = 1;
          end = 53;
      }
      stateObj['libraryStartPosition'] = start;
      stateObj['libraryEndPosition'] = end;
      stateObj['searchCondition'] = 'district';
    }
    this.setState({
      [e.target.name]: e.target.value,
      ...stateObj,
    });
  }
  
	render() {
    const { successAlertOpen, errorAlertOpen, libraryList, libraryListCount, libraryStartPosition, libraryEndPosition, libraryCountPerPage, currentPage } = this.state;
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

    
    const totalPage = Math.round(libraryListCount / libraryCountPerPage) + ((libraryListCount % libraryCountPerPage) && 1) 
    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return (
      <Container>
        <Header />
      
        <div>
          <LinearProgress />
        </div>
        
        <CustomSelect
          label='구'
          name='district'
          value={districtList}
          handleChange={this.handleChange}
        />

        <div>

          <TextField
            id="standard-number"
            label="start"
            placeholder="시작 (start)"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
  
          <TextField
            id="standard-number"
            label="limit"
            placeholder="개수 (limit)"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SaveIcon />}
          >
            적용
          </Button>
        </div>

        <div>
          <TextField
            id="standard-full-width"
            label="Label"
            style={{ margin: 8 }}
            placeholder="Placeholder"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <IconButton aria-label="search" color="primary">
            <SearchIcon />
          </IconButton>
        </div>

        <Snackbar open={successAlertOpen} autoHideDuration={6000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="success" name="success">
            This is a success message!
          </Alert>
        </Snackbar>

        <Snackbar open={errorAlertOpen} autoHideDuration={6000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="error" name="error">
            This is a success message!
          </Alert>
        </Snackbar>
        
        <Libraries>
          {
            libraryList && 
            libraryList.map((elem, idx) => (
              <CustomCard
                key={idx}
                cardItem={elem}
                loading={true}
              />
            ))
          }
          <CustomPagination totalPage={totalPage} currentPage={currentPage} handlePagination={this.handlePagination} />
        </Libraries>

      </Container>
		)
	}
}

export default Main;
