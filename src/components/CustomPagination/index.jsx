import React from 'react'
import { Typography } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import './CustomPagination.scss'

const CustomPagination = (props) => {
  const { totalPage, currentPage, handlePagination } = props

  const useStyles = makeStyles((theme) => ({
    root: {
      padding: '20px 0 100px 0',
      display: 'flex',
      flexDirection: 'column',

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
        className="pagination-wrapper"
        count={totalPage}
        page={currentPage}
        onChange={handlePagination}
        size="large"
      />
    </div>
  )
}

export default CustomPagination
