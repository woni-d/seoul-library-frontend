/* global kakao */
import React, { Component } from 'react'
import { Button } from '@material-ui/core'       

class MapView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      map: null,
      mapCenterPosition: null,
      mapLevel: 3
    }
  }

  componentDidMount() {
    try {
      const { id, x, y } = this.props
      const { mapLevel } = this.state

      if (!id || !x || !y) {
        throw new Error('There was a problem importing the Kakao Map!')
      }
      
      if (window.kakao && window.kakao.hasOwnProperty('maps')) {
        const options = {
          center: new kakao.maps.LatLng(Number(x), Number(y)), // 지도의 중심좌표
          level: mapLevel // 지도의 확대 레벨
        }
        const container = document.getElementById(id)
        const map = new kakao.maps.Map(container, options)
        const marker = new kakao.maps.Marker({ position: options.center })
        marker.setMap(map)

        this.setState({
          map,
          mapCenterPosition: options.center
        })
      } else {
        const script = document.createElement('script')
        script.onload = () => kakao.maps.load(this.initMap)
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&autoload=false`
        document.head.appendChild(script)
      }
    } catch (err) {
      console.log(err)
    }
  }

  zoomIn = () => this.state.map.setLevel(this.state.map.getLevel() - 1) // 확대
  zoomOut = () => this.state.map.setLevel(this.state.map.getLevel() + 1) // 축소
  panTo = () => this.state.map.panTo(this.state.mapCenterPosition)

  render() {
    const { id, x, y } = this.props
    const { map } = this.state
    const mapClassName = !id || !x || !y || !map ? 'map-alt-wrapper': 'map-wrapper'

    return (
      <>
        {
          (map && mapClassName === 'map-wrapper')
          &&
          <div className='map-button-wrapper'>
            <Button
              className="map-buttons"
              variant="outlined"
              color="primary"
              size="large"
              onClick={this.panTo}
            >
              도서관 위치로
            </Button>

            <div className="map-buttons">
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={this.zoomIn}
              >
                +
              </Button>

              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={this.zoomOut}
              >
                -
              </Button>
            </div>
          </div>
        }

        <a href={`https://www.google.com/maps/search/?api=1&query=${x},${y}`} target='_blank'>
          <div className={mapClassName}>
            {mapClassName === 'map-alt-wrapper' && 'Google 지도로 이동하기'}
            <div id={id}>
              {(map && mapClassName === 'map-wrapper') && 'Google 지도로 이동하기'}
            </div>
          </div>
        </a>
      </>
    )
  }
}

export default MapView
