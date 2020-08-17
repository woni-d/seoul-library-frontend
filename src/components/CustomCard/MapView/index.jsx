/* global kakao */
import React, { Component } from 'react'
import { Button } from '@material-ui/core'       

class MapView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      map: null,
      mapCenterPosition: null,
      mapLevel: 3,
    }
  }

  componentDidMount() {
    const { id, x, y } = this.props
    const { mapLevel } = this.state
    try {
      if (!id || !x || !y) {
        throw new Error('Not Kakao Map!')
      }
      const container = document.getElementById(id)

      if (window.kakao && window.kakao.hasOwnProperty('maps')) {
        const centerPosition = new kakao.maps.LatLng(Number(x), Number(y)) 
        const options = {
          center: centerPosition, // 지도의 중심좌표
          level: mapLevel // 지도의 확대 레벨
        }
        const map = new kakao.maps.Map(container, options)
        const marker = new kakao.maps.Marker({
            position: centerPosition
        })
        marker.setMap(map)

        this.setState({
          map,
          mapCenterPosition: centerPosition,
        })
      } else {
        const apiKey = process.env.REACT_APP_KAKAO_API_KEY
        const script = document.createElement('script')
        script.onload = () => kakao.maps.load(this.initMap)
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services&autoload=false`
        document.head.appendChild(script)
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  zoomIn = () => { // 확대
    const map = this.state.map
    const level = map.getLevel();
    map.setLevel(level - 1);
  }

  zoomOut = () => { // 축소
    const map = this.state.map
    const level = map.getLevel();
    map.setLevel(level + 1);
  }

  panTo = () => {
    const map = this.state.map
    const centerPosition = this.state.mapCenterPosition
    map.panTo(centerPosition);            
  }

  render() {
    const { id, x, y } = this.props
    const { map } = this.state
    const mapClassName = (!id || !x || !y) ? 'map-alt-wrapper': 'map-wrapper'

    return (
      <>
        {
          (mapClassName === 'map-wrapper' && map)
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
            { mapClassName === 'map-wrapper' || 'Google 지도로 이동하기' }
              <div id={id}>{ (mapClassName === 'map-wrapper' && map) && 'Google 지도로 이동하기' }</div>
          </div>
        </a>
      </>
    )
  }
}

export default MapView
