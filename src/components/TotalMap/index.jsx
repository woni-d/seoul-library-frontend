import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import './CustomCard.scss'

class TotalMap extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          map: null,
          mapLevel: 3,
          doesExistTrafficLayer: false,
          doesExistRoadViewLayer: false
        }
    }

    componentDidMount() {
        try {
            const { libraryList, doesLoadedKakaoMap } = this.props
            const { mapLevel } = this.state
      
            if (id) {
              kakao.maps.load(() => {
                const container = document.getElementById(id)
                const options = {
                  center: new kakao.maps.LatLng(Number(x), Number(y)), // 지도의 중심좌표
                  level: mapLevel // 지도의 확대 레벨
                }
                const map = new kakao.maps.Map(container, options)
      
                map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
                map.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW)
      
                const marker = new kakao.maps.Marker({ position: options.center })
                marker.setMap(map)
                const link = `https://www.google.com/maps/search/?api=1&query=${x},${y}`
                const content = `<div style="font-family: 'Nanum Myeongjo'; height: 100px;">
                  ${name}
                  <br>
                  <a href="${link}" target='_blank'>(Google 지도로 이동하기)</a>
                </div>
                `
                
                const infoWindow = new kakao.maps.InfoWindow({ content })
                infoWindow.open(map, marker)
          
                this.setState({
                  map,
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

    render() {
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
                <div id="map">
                <a href={`https://www.google.com/maps/search/?api=1&query=${x},${y}`} target='_blank'>
                    Google 지도로 이동하기
                </a>
                </div>
            </div>
            </>
        )
    }

    zoomIn = () => this.state.map.setLevel(this.state.map.getLevel() - 1)
    zoomOut = () => this.state.map.setLevel(this.state.map.getLevel() + 1)
    toggleTrafficLayer = () => {
        const { doesExistTrafficLayer, map } = this.state
    
        if (doesExistTrafficLayer) map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)  
        else map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
    
        this.setState({ doesExistTrafficLayer: !doesExistTrafficLayer })
    }
    toggleRoadViewLayer = () => {
        const { doesExistRoadViewLayer, map } = this.state
    
        if (doesExistRoadViewLayer) map.removeOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW)  
        else map.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW)
    
        this.setState({ doesExistRoadViewLayer: !doesExistRoadViewLayer })
    }
}

export default TotalMap
