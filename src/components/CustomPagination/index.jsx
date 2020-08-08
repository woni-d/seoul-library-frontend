import React from 'react'
import { Typography } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'

const CustomPagination = (props) => {
  const { totalPage, currentPage, handlePagination } = props

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }))
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography>- {currentPage} -</Typography>
      <Pagination
        count={totalPage}
        page={currentPage}
        onChange={handlePagination}
      />
    </div>
  )
}

export default CustomPagination
