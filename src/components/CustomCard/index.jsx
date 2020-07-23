import React, {
  Component
} from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography
} from '@material-ui/core';

class CardView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { value } = this.props;
    return ( 
      <>
        <Card variant = "outlined">
          <CardContent>
            <Typography
              variant = "h6"
              component = "h6"
            >
              No. {value.LBRRY_SEQ_NO} {value.LBRRY_NAME}
            </Typography>

            <br />

            <Typography
              variant = "body1"
              component = "p"
            >
             구명: {value.CODE_VALUE}
            </Typography>

            <Typography
              variant = "body1"
              component = "p"
            >
              주소: {value.ADRES}
            </Typography>

            <Typography
              variant = "body1"
              component = "p"
            >
              정기 휴관일: {value.FDRM_CLOSE_DATE}
            </Typography>

            <Typography
              variant = "body1"
              component = "p"
            >
              전화번호: {value.TEL_NO}
            </Typography>
            
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
