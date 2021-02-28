import React, { Component } from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import MapView from './MapView'
import './CustomCard.scss'

class CardView extends Component {
  render() {
    const { loading, cardItem, doesLoadedKakaoMap } = this.props

    return (
      <Card className='library-wrapper'>
        <CardContent>
          <Typography variant="h6">
            {
              loading
              ? <Skeleton variant="text" />
              : `No. ${cardItem.LBRRY_SEQ_NO || '?'} ${cardItem.LBRRY_NAME || '-'}`
            }
          </Typography>

          <br />

          <Typography variant="body1">
            {
              loading
              ? <Skeleton variant="text" /> 
              : `구명: ${cardItem.CODE_VALUE || '-'}`
            }
          </Typography>

          <Typography variant="body1">
            {
              loading
              ? <Skeleton variant="text" /> 
              : `주소: ${cardItem.ADRES || '-'}`
            }
          </Typography>

          <Typography variant="body1">
            {
              loading
              ? <Skeleton variant="text" /> 
              : `정기 휴관일: ${cardItem.FDRM_CLOSE_DATE || '-'}`
            }
          </Typography>

          <Typography variant="body1">
            {
              loading
              ? <Skeleton variant="text" /> 
              : `전화번호: ${cardItem.TEL_NO || '-'}`
            }
          </Typography>

          {
            loading
            ? <Skeleton variant="rect" animation="wave" width={500} height={250} /> 
            : <MapView
                id={doesLoadedKakaoMap ? cardItem.LBRRY_SEQ_NO : undefined}
                x={doesLoadedKakaoMap ? cardItem.XCNTS : undefined}
                y={doesLoadedKakaoMap ? cardItem.YDNTS : undefined}
              />
          }
        </CardContent>
      </Card>
    )
  }
}

export default CardView
