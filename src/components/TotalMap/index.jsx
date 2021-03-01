import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import './TotalMap.scss'

class TotalMap extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          map: null,
          mapLevel: 7,
          doesExistTrafficLayer: false,
          doesExistRoadViewLayer: false,
          libraryListLength: null,
          selectedDistrict: null,
          libraryStartCount: null,
          libraryEndCount: null
        }
    }

    componentDidMount() {
      this.setTotalMap()
    }

    setTotalMap = () => {
      try {
        const { libraryList, selectedDistrict, libraryStartCount, libraryEndCount } = this.props
        const { mapLevel } = this.state

        if (libraryList && libraryList.length > 0) {
          window.window.kakao.maps.load(() => {
            const container = document.getElementById('map')

            const options = {
              center: new window.kakao.maps.LatLng(Number(libraryList[0].XCNTS), Number(libraryList[0].YDNTS)), // 지도의 중심좌표
              level: mapLevel // 지도의 확대 레벨
            }
            const map = new window.kakao.maps.Map(container, options)
  
            map.addOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC)
            map.addOverlayMapTypeId(window.kakao.maps.MapTypeId.ROADVIEW)

            const mapTypeControl = new window.kakao.maps.MapTypeControl()
            map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT)

            const zoomControl = new window.kakao.maps.ZoomControl()
            map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT)

            libraryList.forEach(library => {
              const { LBRRY_NAME, XCNTS, YDNTS } = library
              const marker = new window.kakao.maps.Marker({ position: new window.kakao.maps.LatLng(Number(XCNTS), Number(YDNTS)) })
              marker.setMap(map)

              const link = `https://www.google.com/maps/search/?api=1&query=${XCNTS},${YDNTS}`
              const content = `<div>
                ${LBRRY_NAME}
                <br>
                <a href="${link}" target='_blank'>(Google 지도로 이동하기)</a>
              </div>
              `
              
              const infoWindow = new window.kakao.maps.InfoWindow({ content, removable: true })
              window.kakao.maps.event.addListener(marker, 'click', () => infoWindow.open(map, marker))
            })

            this.setState({
              map,
              doesExistTrafficLayer: true,
              doesExistRoadViewLayer: true,
              libraryListLength: libraryList.length,
              selectedDistrict,
              libraryStartCount,
              libraryEndCount
            })
          })
        }
      } catch (err) {
        console.log(err)
      }
    }

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
      const { libraryList, selectedDistrict, libraryStartCount, libraryEndCount } = this.props

      if (
        (libraryList ? libraryList.length : 0) !== this.state.libraryListLength ||
        selectedDistrict !== this.state.selectedDistrict ||
        libraryStartCount !== this.state.libraryStartCount ||
        libraryEndCount !== this.state.libraryEndCount
      ) {
        this.setTotalMap()
      }

      return (
          <>
          <div className='map-button-wrapper'>
              <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={this.toggleTrafficLayer}
              >
                교통 지도 추가/삭제
              </Button>

              <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={this.toggleRoadViewLayer}
              >
                로드뷰 지도 추가/삭제
              </Button>
          </div>

          <div className="map-wrapper">
              <div id="map"></div>
          </div>
          </>
      )
    }
}

export default TotalMap
