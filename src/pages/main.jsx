import React, { Component } from 'react'
import axios from 'axios'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import Header from '../components/Header'
import CustomCard from '../components/CustomCard'
import LinearProgress from '../components/LinearProgress'
import CustomPagination from '../components/CustomPagination'
import { Container, Libraries } from './main.style'

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

      countPerPage: 5,
      currentPage: 1,

      successAlertOpen: false,
      errorAlertOpen: false,
      linearProgressShow: false
    }
  }

  async componentDidMount() {
    await this.getLibraryList()

    this.setState({
      linearProgressShow: true
    })

    try {
      const { libraryAllCount } = this.state

      let list = []
      const districtOption = {}
      
      for (let i = 0; i < Math.floor(libraryAllCount / 1000) + (libraryAllCount % 1000 ? 1 : 0); i++) {
        const requestUrl = `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_SEOUL_API_KEY}/json/SeoulLibraryTimeInfo/${(i * 1000)}/${((i + 1) * 999)}`
        const response = await axios.get(requestUrl)
        if (response && response.data && response.status === 200) {
          const { data: { SeoulLibraryTimeInfo: { row } } } = response
          list = [...list, ...row]
        }
      }
  
      list.forEach((elem, idx) => {
        if (districtOption.hasOwnProperty(elem['CODE_VALUE'])) {
          districtOption[elem['CODE_VALUE']].end++
        } else {
          districtOption[elem['CODE_VALUE']] = {
            start: idx + 1,
            end: idx + 1
          }
        }
      })

      const districtOptionKeys = Object.keys(districtOption)
      const defaultDistrict = districtOptionKeys[0]

      this.setState({
        districtOptionKeys: districtOptionKeys,
        districtOption,
        selectedDistrict: defaultDistrict,
        libraryTotalCount: districtOption[defaultDistrict].end - districtOption[defaultDistrict].start,
        libraryStartCount: districtOption[defaultDistrict].start,
        libraryEndCount: districtOption[defaultDistrict].end,
      }, this.getLibraryList)
    } catch (err) {
      console.log(err)
      
      this.setState({
        errorAlertOpen: true
      })
    }

    this.setState({
      linearProgressShow: false
    })
  }

  async getLibraryList() {
    const { searchOption, libraryStartCount, libraryEndCount, currentPage, countPerPage } = this.state

    this.setState({
      linearProgressShow: true
    })

    try {
      if (searchOption === 'selectedDistrict') {
        const libraryStartCountByPage = libraryStartCount + ((currentPage - 1) * countPerPage)
        const libraryEndCountByPage = libraryStartCountByPage + (countPerPage - 1) <= libraryEndCount ? libraryStartCountByPage + (countPerPage - 1) : libraryEndCount
  
        const reuqestUrl = `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_SEOUL_API_KEY}/json/SeoulLibraryTimeInfo/${libraryStartCountByPage}/${libraryEndCountByPage}`
        const response = await axios.get(reuqestUrl)
        if (response && response.data && response.status === 200) {
          const { data: { SeoulLibraryTimeInfo } } = response
          
          this.setState({
            libraryAllCount: SeoulLibraryTimeInfo && SeoulLibraryTimeInfo.list_total_count ? SeoulLibraryTimeInfo.list_total_count : 0,
            libraryList: SeoulLibraryTimeInfo && SeoulLibraryTimeInfo.row ? SeoulLibraryTimeInfo.row : [],
            successAlertOpen: true
          })
        }
      } else {
        const { searchText, libraryAllCount } = this.state

        let list = []
        for (let i = 0; i < Math.floor(libraryAllCount / 1000) + (libraryAllCount % 1000 ? 1 : 0); i++) {
          const reuqestUrl = `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_SEOUL_API_KEY}/json/SeoulLibraryTimeInfo/${(i * 1000)}/${((i + 1) * 999)}`
          const response = await axios.get(reuqestUrl)
          if (response && response.data && response.status === 200) {
            const { data: { SeoulLibraryTimeInfo: { row } } } = response
            list = [...list, ...row]
          }
        }

        const filterField = searchOption === 'name' ? 'LBRRY_NAME' : 'ADRES'
        let filteredList = []
        if (searchText.length > 2) {
          filteredList = list.filter(elem => elem[filterField].includes(searchText))
        }

        this.setState({
          libraryList: filteredList,
          libraryStartCount: 0,
          libraryEndCount:0 ,
          libraryTotalCount: 0
        })
      }
    } catch (err) {
      console.log(err)

      this.setState({
        errorAlertOpen: true
      })
    }

    this.setState({
      linearProgressShow: false
    })
  }

  handleClose = (e) => this.setState({ successAlertOpen: false, errorAlertOpen: false })
  handleSearch = (e) => this.setState({ currentPage: 1 }, this.getLibraryList)
  handlePagination = (e, value) => this.setState({ currentPage: value }, this.getLibraryList)
  
  handleSearchOptionChange = value => e => {
    const { districtOptionKeys, districtOption } = this.state
    const stateObj = {}

    if (value === 0) { // district
      stateObj['searchOption'] = 'selectedDistrict'
      stateObj['libraryStartCount'] = districtOptionKeys.length > 0 ? districtOption[districtOptionKeys[0]].start : 1
      stateObj['libraryEndCount'] = districtOptionKeys.length > 0 ? districtOption[districtOptionKeys[0]].end : 1
    } else { // search text
      stateObj['searchOption'] = 'name'
      stateObj['searchText'] = ''
    }

    this.setState(stateObj)
  }

  handleChange = e => {
    const stateObj = {}

    if (e.target.name === 'selectedDistrict') {
      const { districtOption } = this.state

      const start = districtOption[e.target.value].start
      const end = districtOption[e.target.value].end

      stateObj['libraryStartCount'] = start
      stateObj['libraryEndCount'] = end
      stateObj['libraryTotalCount'] = (end - start)
      stateObj['searchText'] = ''
    } else if (e.target.name === 'libraryStartCount' || e.target.name === 'libraryEndCount') {
      const target = e.target.name === 'libraryStartCount' ? 'libraryEndCount' : 'libraryStartCount'
      stateObj[e.target.name] = Number(e.target.value)
      stateObj[target] = this.state[target]

      const total = stateObj['libraryEndCount'] - stateObj['libraryStartCount']
      stateObj['libraryTotalCount'] = total
      
      if (typeof total !== 'number' || total < 0) {
        return
      }
    }

    this.setState({
      [e.target.name]: e.target.value,
      ...stateObj
    })

    if (e.target.name !== 'searchOption' && e.target.name !== 'searchText') {
      this.handleSearch()
    }
  }
  
	render() {
    const {
      libraryList,
      libraryTotalCount,
      libraryStartCount,
      libraryEndCount,

      districtOptionKeys,
      searchOption,
      selectedDistrict,
      searchText,

      countPerPage,

      successAlertOpen,
      errorAlertOpen,
      linearProgressShow,
    } = this.state
    let { currentPage } = this.state

    if (libraryTotalCount > 0) {
      let maxPageCount = Math.floor((libraryTotalCount - 1) / (countPerPage - 1))
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
          selectedDistrict={selectedDistrict}
          libraryTotalCount={libraryTotalCount}
          libraryStartCount={libraryStartCount}
          libraryEndCount={libraryEndCount}
          searchText={searchText}
          handleSearchOptionChange={this.handleSearchOptionChange}
          handleSearchValueChange={this.handleChange}
          handleSearch={this.handleSearch}
        />

        <Libraries>
          {
            (
              libraryList ?
              libraryList :
              Array.from({length: 10}, (_v, _i) => null)).map((elem, idx) => (
                <CustomCard
                  key={idx}
                  cardItem={elem}
                  loading={libraryList ? false : true}
                  doesLoadedKakaoMap={searchOption === 'selectedDistrict' ? true : false}
                />
              )
            )
          }
          
          {
            searchOption === 'selectedDistrict' &&
            <CustomPagination
              totalPage={Math.floor((libraryTotalCount / countPerPage) + 1)}
              currentPage={currentPage}
              handlePagination={this.handlePagination}
            />
          }
        </Libraries>
      
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
      </Container>
		)
	}
}

export default Main
