import React, { Component } from 'react'
import {
  Card,
  CardContent,
  Typography
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import MapView from './MapView'
import './CustomCard.scss'

class CardView extends Component {
  render() {
    const { cardItem, loading } = this.props
    return ( 
      <>
        <Card className='library-wrapper'>
          <CardContent>
            <Typography variant="h6">
              {loading ? <Skeleton variant="text" /> : `No. ${cardItem.LBRRY_SEQ_NO} ${cardItem.LBRRY_NAME}`}
            </Typography>

            <br />

            <Typography variant="body1">
              {
                loading
                ? <Skeleton variant="text" /> 
                : (cardItem.CODE_VALUE ? `구명: ${cardItem.CODE_VALUE}` : null)
              }
            </Typography>

            <Typography variant="body1">
              {
                loading
                ? <Skeleton variant="text" /> 
                : (cardItem.ADRES ? `주소: ${cardItem.ADRES}` : null)
              }
            </Typography>

            <Typography variant="body1">
              {
                loading
                ? <Skeleton variant="text" /> 
                : (cardItem.FDRM_CLOSE_DATE ? `정기 휴관일: ${cardItem.FDRM_CLOSE_DATE}` : null)
              }
            </Typography>

            <Typography variant="body1">
              {
                loading
                ? <Skeleton variant="text" /> 
                : (cardItem.TEL_NO ? `전화번호: ${cardItem.TEL_NO}` : null)
              }
            </Typography>

            {
              // TODO: Kakao Map API 처리
              // loading
              // ? <Skeleton variant="rect" animation="wave" width={500} height={250} /> 
              // : <MapView
              //     id={cardItem.LBRRY_SEQ_NO}
              //     x={cardItem.XCNTS}
              //     y={cardItem.YDNTS}
              //   />
            }
          </CardContent>
        </Card>
      </>
    )
  }
}

export default CardView
