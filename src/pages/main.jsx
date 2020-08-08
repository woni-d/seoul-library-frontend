import React, { Component } from 'react'
import axios from 'axios'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import Header from '../components/Header'
import CustomCard from '../components/CustomCard'
import LinearProgress from '../components/LinearProgress'
import CustomPagination from '../components/CustomPagination'
import { Container, Libraries } from './main.style'

const apiKey = process.env.REACT_APP_SEOUL_API_KEY

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      libraryAllCount: null,
      libraryList: null,
      libraryTotalCount: 1,
      libraryStartCount: 1, // Open API 인덱스 1부터 시작
      libraryEndCount: 1,

      districtOptionKeys: [],
      districtOption: null,
      searchOption: 'selectedDistrict',
      selectedDistrict: '-----',
      searchText: '',

      libraryCountPerPage: 5, // default. 페이지별 5개 의미
      currentPage: 1,

      successAlertOpen: false,
      errorAlertOpen: false,
      linearProgressShow: false,
    }
  }

  async componentDidMount() {
    await this.getLibraryInfo()

    const { libraryAllCount } = this.state
    let libraryList = []
    for (let i = 0; i < Math.floor(libraryAllCount / 1000) + (libraryAllCount % 1000 ? 1 : 0); i++) {
      const libraryApiUri = `http://openapi.seoul.go.kr:8088/${apiKey}/json/SeoulLibraryTimeInfo/${(i * 1000)}/${((i + 1) * 999)}`
      const { data: { SeoulLibraryTimeInfo: { row } } } = await axios.get(libraryApiUri)
      libraryList = [...libraryList, ...row]
    }

    const districtOption = {}

    libraryList.forEach((elem, idx) => { // idx는 0부터 시작
      if (districtOption.hasOwnProperty(elem['CODE_VALUE'])) {
        districtOption[elem['CODE_VALUE']].end ++
      }
      else {
        districtOption[elem['CODE_VALUE']] = {
          start: idx + 1,
          end: idx + 1,
        }
      }
    })

    const districtOptionKeys = Object.keys(districtOption)
    const firstDistrictOption = districtOptionKeys[0]

    this.setState({
      districtOptionKeys,
      districtOption,
      selectedDistrict: firstDistrictOption,
      libraryTotalCount: districtOption[firstDistrictOption].end - districtOption[firstDistrictOption].start,
      libraryStartCount: districtOption[firstDistrictOption].start,
      libraryEndCount: districtOption[firstDistrictOption].end,
    }, this.getLibraryInfo)
  }

  async getLibraryInfo() {
    const { searchOption, libraryStartCount, libraryEndCount, currentPage, libraryCountPerPage } = this.state

    this.setState({
      linearProgressShow: true,
    })

    if (searchOption === 'selectedDistrict') {
      const diff = ((currentPage - 1) * libraryCountPerPage)
      const libraryStartCountByPage = libraryStartCount + diff
      const libraryEndCountByPage = libraryStartCountByPage + (libraryCountPerPage - 1) <= libraryEndCount ? libraryStartCountByPage + (libraryCountPerPage - 1) : libraryEndCount

      const libraryApiUri = `http://openapi.seoul.go.kr:8088/${apiKey}/json/SeoulLibraryTimeInfo/${libraryStartCountByPage}/${libraryEndCountByPage}`
      try {
        const { config, data: { SeoulLibraryTimeInfo: { list_total_count, row } }, headers, request, status, statusText } = await axios.get(libraryApiUri)
        this.setState({
          libraryAllCount: list_total_count,
          libraryList: row,

          successAlertOpen: true,
        })
      } catch (err) {
        console.log(err)
        this.setState({
          errorAlertOpen: true,
        })
      }
    }
    else {
      const { searchText, libraryAllCount } = this.state
      try {
        let libraryList = []
        for (let i = 0; i < Math.floor(libraryAllCount / 1000) + (libraryAllCount % 1000 ? 1 : 0); i++) {
          const libraryApiUri = `http://openapi.seoul.go.kr:8088/${apiKey}/json/SeoulLibraryTimeInfo/${(i * 1000)}/${((i + 1) * 999)}`
          const { config, data: { SeoulLibraryTimeInfo: { list_total_count, row } }, headers, request, status, statusText } = await axios.get(libraryApiUri)
          // TODO: statusText나 status로 
          libraryList = [...libraryList, ...row]
        }

        let filterField = null
        if (searchOption === 'name') {
          filterField = 'LBRRY_NAME'
        }
        else {
          filterField = 'ADRES'
        }
        const filteredLibraryList = libraryList.filter(elem => elem[filterField].includes(searchText))
        this.setState({
          libraryList: filteredLibraryList,
          libraryStartCount: 0,
          libraryEndCount:0 ,
          libraryTotalCount: 0,
        })
      } catch (err) {
        console.log(err)
        this.setState({
          errorAlertOpen: true,
        })
      }
    }

    this.setState({
      linearProgressShow: false,
    })
  }

  handleClose = (e) => {
    this.setState({
      successAlertOpen: false,
      errorAlertOpen: false,
    })
  }

  handleSearch = (e) => this.setState({ currentPage: 1 }, this.getLibraryInfo)

  handlePagination = (e, value) => this.setState({ currentPage: value }, this.getLibraryInfo)

  handleSearchOptionChange = (value) => e => {
    this.setState({
      searchOption: value === 0 ? 'selectedDistrict' : 'name',
    })
  }

  handleChange = e => {
    const stateObj = {}
    if (e.target.name === 'selectedDistrict') {
      let selectedDistrict = e.target.value
      const { districtOption } = this.state
      let start, end
      start = districtOption[selectedDistrict].start
      end = districtOption[selectedDistrict].end
      stateObj['libraryStartCount'] = start
      stateObj['libraryEndCount'] = end
      stateObj['libraryTotalCount'] = (end - start)
      stateObj['searchText'] = ''
    }
    if (e.target.name === 'libraryStartCount' || e.target.name === 'libraryEndCount') {
      stateObj[e.target.name] = Number(e.target.value)
      const targetCountState = e.target.name === 'libraryStartCount' ? 'libraryEndCount' : 'libraryStartCount'
      stateObj[targetCountState] = this.state[targetCountState]
      stateObj['libraryTotalCount'] = (stateObj['libraryEndCount'] - stateObj['libraryStartCount'])
    }
    this.setState({
      [e.target.name]: e.target.value,
      ...stateObj,
    })

    if (e.target.name !== 'searchOption' && e.target.name !== 'searchText') {
      this.handleSearch()
    }
  }
  
	render() {
    const {
      districtOptionKeys,
      searchOption,
      selectedDistrict,
      searchText,

      libraryList,
      libraryTotalCount,
      libraryStartCount,
      libraryEndCount,

      successAlertOpen,
      errorAlertOpen,
      linearProgressShow,
    } = this.state

    let {
      libraryCountPerPage,
      currentPage
    } = this.state

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
    }
    const searchTextOptionArr = [
      'name',
      'address',
    ]

    if (!libraryList) {
      return null
    }

    if (libraryTotalCount > 0) {
      let maxPageCount = Math.floor((libraryTotalCount - 1) / (libraryCountPerPage - 1))
      if (maxPageCount < 0) maxPageCount = 0
      if (currentPage > maxPageCount) currentPage = maxPageCount
    }

    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />
    }

    return (
      <Container>
        <Header
          districtList={districtOptionKeys}
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
      
        {
          linearProgressShow &&
          <div>
            <LinearProgress />
          </div>
        }

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
          <CustomPagination
            totalPage={Math.floor((libraryTotalCount / libraryCountPerPage) + 1)}
            currentPage={currentPage}
            handlePagination={this.handlePagination}
          />
        </Libraries>

      </Container>
		)
	}
}

export default Main
