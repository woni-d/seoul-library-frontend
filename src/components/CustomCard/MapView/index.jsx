/* global kakao */
import React, { Component } from 'react'

class MapView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoadingComplated: false,
    }
  }

  componentDidMount() {
    const { id, x, y } = this.props
    const container = document.getElementById(id)
    try {
      if (!id || !x || !y) {
        throw new Error('Not Kakao Map!')
      }

      if (window.kakao && window.kakao.hasOwnProperty('maps')) {
        const centerPosition = new kakao.maps.LatLng(Number(x), Number(y)) 
        const options = {
          center: centerPosition, // 지도의 중심좌표
          level: 4 // 지도의 확대 레벨
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

      // 이전에 throw new Error()을 만나서 catch로 빠지면 isLoadingCompleted는 계속 false
      this.setState({
        isLoadingComplated: true,
      })
    }
    catch (err) {
      console.log(err)
    }
  }

  render() {
    const props = this.props
    const { isLoadingComplated } = this.state
    const mapClassName = isLoadingComplated ? 'map-wrapper' : 'map-alt-wrapper'
    console.log(this.state)
    return (
      // eslint-disable-next-line react/jsx-no-target-blank
      <a href={`https://www.google.com/maps/search/?api=1&query=${props.x},${props.y}`} target='_blank'>
        <div className={mapClassName}>
            Google 지도로 이동하기
            <div id={props.id} width={500} height={250}></div>
        </div>
      </a>
    )
  }
}

export default MapView
