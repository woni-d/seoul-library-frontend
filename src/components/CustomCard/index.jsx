import React, { Component } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import './CustomCard.scss';

class CardView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { cardItem, loading } = this.props;
    return ( 
      <>
        <Card className='root'>
          <CardContent>
            <Typography variant="h6">
                {loading ? <Skeleton variant="text" /> : `No. ${cardItem.LBRRY_SEQ_NO} ${cardItem.LBRRY_NAME}`}
            </Typography>

            <br />

            <Typography variant="body1">
                {loading ? <Skeleton variant="text" /> : `구명: ${cardItem.CODE_VALUE}`}
            </Typography>

            <Typography variant="body1">
                {loading ? <Skeleton variant="text" /> : `주소: ${cardItem.ADRES}`}
            </Typography>

            <Typography variant="body1">
                {loading ? <Skeleton variant="text" /> : `정기 휴관일: ${cardItem.FDRM_CLOSE_DATE}`}
            </Typography>

            <Typography variant="body1">
                {loading ? <Skeleton variant="text" /> : `전화번호: ${cardItem.TEL_NO}`}
            </Typography>

            <Skeleton variant="rect" animation="wave" height={250} />

          </CardContent>
          <CardActions>
            <Button>Map</Button>
          </CardActions>
        </Card>
      </>
    );
  }
}

export default CardView;
