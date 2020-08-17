/* global kakao */
import React, { Component } from 'react'

class MapView extends Component {
  componentDidMount() {
    const { id, x, y } = this.props
    try {
      if (!id || !x || !y) {
        throw new Error('Not Kakao Map!')
      }
      const container = document.getElementById(id)

      if (window.kakao && window.kakao.hasOwnProperty('maps')) {
        const centerPosition = new kakao.maps.LatLng(Number(x), Number(y)) 
        const options = {
          center: centerPosition, // 지도의 중심좌표
          level: 3 // 지도의 확대 레벨
        }
        const map = new kakao.maps.Map(container, options)
        const marker = new kakao.maps.Marker({
            position: centerPosition
        })
        marker.setMap(map)
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

  render() {
    const { id, x, y } = this.props
    const mapClassName = (!id || !x || !y) ? 'map-alt-wrapper': 'map-wrapper'

    return (
      // eslint-disable-next-line react/jsx-no-target-blank
      <a href={`https://www.google.com/maps/search/?api=1&query=${x},${y}`} target='_blank'>
        <div className={mapClassName}>
          { mapClassName === 'map-wrapper' || 'Google 지도로 이동하기' }
            <div id={id}>{ mapClassName === 'map-wrapper' && 'Google 지도로 이동하기' }</div>
        </div>
      </a>
    )
  }
}

export default MapView
