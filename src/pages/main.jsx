import React, { Component } from 'react';
import Header from '../components/Header';
import CustomSelect from '../components/CustomSelect';
import CustomCard from '../components/CustomCard';
import { Container, Libraries } from './Main.style';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      district: '강남구',
      libraryList: [],
      libraryStartPosition: null,
      libraryEndPosition: null,
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
      ]
    })
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
    console.log(this.state);
    const { libraryList } = this.state;
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

		return (
      <Container>
        <Header />
        
        <CustomSelect
          label='구'
          name='district'
          value={districtList}
          handleChange={this.handleChange}
        />
        
        <Libraries>
          {
            libraryList.length !== 0 &&
            libraryList.map((elem, idx) => (
              <CustomCard
                key={idx}
                cardItem={elem}
                loading={true}
              />
            ))
          }
        </Libraries>

      </Container>
		)
	}
}

export default Main;
