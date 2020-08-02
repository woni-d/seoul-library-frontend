import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { Typography, AppBar, Tabs, Tab, Box, TextField, FormControl, Select, MenuItem, Button, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CustomSelect from '../CustomSelect';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function Header(props) {
  const {
    districtList,
    searchOption,
    searchOptionObj,
    searchTextOptionArr,
    selectedDistrict,
    searchText,
    handleSearchOptionChange,
    handleSearchValueChange,
    handleSearch
  } = props

  const [value, setValue] = React.useState(searchOption === searchOptionObj.district.prop ? 0 : 1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    handleSearchOptionChange(newValue)();
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div>
      <div>
        <Typography
          variant = "h3"
          component = "h1"
        >
          서울 도서관 조회 서비스
        </Typography>
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
            <Tab label="도서관명 / 주소 검색" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0}>
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
                placeholder="시작 (start)"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
      
              <TextField
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
                endIcon={<SearchIcon />}
              >
                검색
              </Button>
            </div>

          </TabPanel>

          <TabPanel value={value} index={1}>
            <div>
              <FormControl variant="outlined">
                <Select
                  label="검색 옵션"
                  name="searchOption"
                  value={searchOption}
                  onChange={handleSearchValueChange}
                >
                  {
                    searchTextOptionArr.map(elem => (
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

              <TextField
                  label={searchOptionObj.hasOwnProperty(searchOption) ? searchOptionObj[searchOption].label : 'None'}
                  name="searchText"
                  value={searchText}
                  autoComplete="searchKeyword"
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
          </TabPanel>
        </SwipeableViews>
      </div>
    </div>
  )
}

export default Header;
