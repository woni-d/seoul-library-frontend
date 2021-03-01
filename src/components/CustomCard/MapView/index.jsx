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
      doesExistTrafficLayer: false,
      doesExistRoadViewLayer: false,
      id: null,
      doesLoadedKakaoMap: null
    }
  }

  componentDidMount() {
    this.setMap()
  }

  setMap = () => {
    try {
      const { doesLoadedKakaoMap, id, name, x, y } = this.props
      const { mapLevel } = this.state

      if (id) {
        window.kakao.maps.load(() => {
          const container = document.getElementById(id)
          const options = {
            center: new window.kakao.maps.LatLng(Number(x), Number(y)), // 지도의 중심좌표
            level: mapLevel // 지도의 확대 레벨
          }
          const map = new window.kakao.maps.Map(container, options)

          map.addOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC)
          map.addOverlayMapTypeId(window.kakao.maps.MapTypeId.ROADVIEW)

          const marker = new window.kakao.maps.Marker({ position: options.center })
          marker.setMap(map)
          const link = `https://www.google.com/maps/search/?api=1&query=${x},${y}`
          const content = `<div style="font-family: 'Nanum Myeongjo'; height: 100px;">
            ${name}
            <br>
            <a href="${link}" target='_blank'>(Google 지도로 이동하기)</a>
          </div>
          `
          
          const infoWindow = new window.kakao.maps.InfoWindow({ content })
          infoWindow.open(map, marker)
    
          this.setState({
            map,
            mapCenterPosition: options.center,
            doesExistTrafficLayer: true,
            doesExistRoadViewLayer: true,
            id,
            doesLoadedKakaoMap
          })
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  zoomIn = () => this.state.map.setLevel(this.state.map.getLevel() - 1)
  zoomOut = () => this.state.map.setLevel(this.state.map.getLevel() + 1)
  panTo = () => this.state.map.panTo(this.state.mapCenterPosition)
  toggleTrafficLayer = () => {
    const { doesExistTrafficLayer, map } = this.state

    if (doesExistTrafficLayer) map.removeOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC)  
    else map.addOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC)

    this.setState({ doesExistTrafficLayer: !doesExistTrafficLayer })
  }
  toggleRoadViewLayer = () => {
    const { doesExistRoadViewLayer, map } = this.state

    if (doesExistRoadViewLayer) map.removeOverlayMapTypeId(window.kakao.maps.MapTypeId.ROADVIEW)  
    else map.addOverlayMapTypeId(window.kakao.maps.MapTypeId.ROADVIEW)

    this.setState({ doesExistRoadViewLayer: !doesExistRoadViewLayer })
  }

  render() {
    const { doesLoadedKakaoMap, id, x, y } = this.props
    
    if (id !== this.state.id || doesLoadedKakaoMap !== this.state.doesLoadedKakaoMap) {
      this.setMap()
    }

    return (
      <>
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

          <div className='map-button-pair-wrapper'>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={this.zoomIn}
              style={{ width: '100%' }}
            >
              +
            </Button>

            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={this.zoomOut}
              style={{ width: '100%' }}
            >
              -
            </Button>
          </div>
          <div className='map-button-pair-wrapper'>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={this.toggleTrafficLayer}
              style={{ width: '100%' }}
            >
              교통 지도 추가/삭제
            </Button>

            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={this.toggleRoadViewLayer}
              style={{ width: '100%' }}
            >
              로드뷰 지도 추가/삭제
            </Button>
          </div>
        </div>

        <div className="map-wrapper">
          <div id={id}>
            <a href={`https://www.google.com/maps/search/?api=1&query=${x},${y}`} target='_blank'>
              Google 지도로 이동하기
            </a>
          </div>
        </div>
      </>
    )
  }
}

export default MapView
