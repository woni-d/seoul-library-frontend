import React, { Component } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

class CustomSelect extends Component {
    render() {
      const { label, name, value, list, handleSearchValueChange } = this.props;
      return (
        <>
          <FormControl variant="outlined">
            <InputLabel>{label}</InputLabel>
            <Select
              label={label}
              name={name}
              value={value}
              onChange={handleSearchValueChange}
            >
              {
                list && list.map((elem, idx) => (
                  <MenuItem key={idx} value={elem}>{elem}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </>
      );
    }
}

export default CustomSelect;
