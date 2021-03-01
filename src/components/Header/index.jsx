import React from 'react'
import SwipeableViews from 'react-swipeable-views'
import { AppBar, Tabs, Tab, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import TabPanel from './TapPanel'
import CustomSelect from '../CustomSelect'
import './Header.scss'

function Header(props) {
  const {
    districtList,
    searchOption,
    selectedDistrict,
    libraryTotalCount,
    libraryStartCount,
    libraryEndCount,
    searchText,
    handleSearch,
    handleSearchOptionChange,
    handleSearchValueChange
  } = props

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

  const [value, setValue] = React.useState(searchOption === searchOptionObj.district.prop ? 0 : 1)

  const handleChange = (e, value) => {
    setValue(value)
    handleSearchOptionChange(value)()
  }

  const handleChangeIndex = (index) => setValue(index)

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div>
      <div className="header-title-wrapper">
        <h1>서울시 도서관 조회 서비스</h1>
      </div>
      <div>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="구별 검색" />
            <Tab label="구별 검색 모아보기" />
            <Tab label="도서관명 / 주소 검색" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0}>
            <div className="header-district-tab-wrapper">
              <CustomSelect
                label={searchOptionObj.district.label}
                name={searchOptionObj.district.prop}
                value={selectedDistrict}
                list={districtList}
                handleSearchValueChange={handleSearchValueChange}
              />

              <div>
                <TextField
                  label="start"
                  name="libraryStartCount"
                  value={libraryStartCount}
                  placeholder="시작 (start)"
                  type="number"
                  InputProps={{ inputProps: { min: 1, max: libraryTotalCount } }}
                  onChange={handleSearchValueChange}
                />
        
                <TextField
                  label="limit"
                  name="libraryEndCount"
                  value={libraryEndCount}
                  placeholder="끝 (end)"
                  type="number"
                  InputLabelProps={{ shrink: true }}
                  onChange={handleSearchValueChange}
                />
              </div>
            </div>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <div className="header-district-tab-wrapper">
              <CustomSelect
                label={searchOptionObj.district.label}
                name={searchOptionObj.district.prop}
                value={selectedDistrict}
                list={districtList}
                handleSearchValueChange={handleSearchValueChange}
              />

              <div>
                <TextField
                  label="start"
                  name="libraryStartCount"
                  value={libraryStartCount}
                  placeholder="시작 (start)"
                  type="number"
                  InputProps={{ inputProps: { min: 1, max: libraryTotalCount } }}
                  onChange={handleSearchValueChange}
                />
        
                <TextField
                  label="limit"
                  name="libraryEndCount"
                  value={libraryEndCount}
                  placeholder="끝 (end)"
                  type="number"
                  InputLabelProps={{ shrink: true }}
                  onChange={handleSearchValueChange}
                />
              </div>
            </div>
          </TabPanel>

          <TabPanel value={value} index={2}>
            <div className="header-search-tab-wrapper">
              <FormControl variant="outlined">
                <InputLabel>검색 옵션</InputLabel>
                <Select
                  label="검색 옵션"
                  name="searchOption"
                  value={searchOption}
                  onChange={handleSearchValueChange}
                >
                  {
                    ['name', 'address'].map(elem => (
                      <MenuItem
                        key={searchOptionObj[elem].prop}
                        value={searchOptionObj[elem].prop}
                      >
                        {searchOptionObj[elem].label}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>

              <div>
                <TextField
                    label={(searchOptionObj && searchOptionObj[searchOption] && searchOptionObj[searchOption].label) || 'None'}
                    name="searchText"
                    value={searchText}
                    autoComplete="searchKeyword"
                    onChange={handleSearchValueChange}
                    onKeyPress={handleKeyPress}
                />

                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<SearchIcon />}
                  onClick={handleSearch}
                >
                  검색
                </Button>
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
      </div>
    </div>
  )
}

export default Header
