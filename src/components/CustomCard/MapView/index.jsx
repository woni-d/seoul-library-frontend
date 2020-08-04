/* global kakao */
import React, { Component } from 'react';

class MapView extends Component {
  componentDidMount() {
    const { id, x, y } = this.props
    const container = document.getElementById(id);
    if (window.kakao && window.kakao.hasOwnProperty('maps')) {
      const centerPosition = new kakao.maps.LatLng(Number(x), Number(y)); 
      const options = {
        center: centerPosition, // 지도의 중심좌표
        level: 4 // 지도의 확대 레벨
      };
      const map = new kakao.maps.Map(container, options);
      const marker = new kakao.maps.Marker({
          position: centerPosition
      });
      marker.setMap(map);
    } else {
      const apiKey = process.env.REACT_APP_KAKAO_API_KEY;
      const script = document.createElement('script');
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services&autoload=false`;
      document.head.appendChild(script);
    }
  }

  render() {
    const props = this.props;
    return (
      <div>
        <a href={`https://www.google.com/maps/search/?api=1&query=${props.x},${props.y}`}>
          <div id={props.id} width={500} height={250}></div>
        </a>
      </div>
    )
  }
}

export default MapView;
