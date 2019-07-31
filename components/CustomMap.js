import React from 'react'
import MapGL from 'react-map-gl'
import {randomPoint} from '@turf/random'
import geoViewport from '@mapbox/geo-viewport'

class CustomMap extends React.PureComponent {
    state = {
      viewport: {
        latitude: 51.76409,
        longitude: 5.60482,
        zoom: 11.5,
        bearing: 0,
        pitch: 50,
        width: 900,
        height: 1000
      }
    } 

   drawRandomPoints() {
    let view = this.state.viewport
    let boundinbBox = geoViewport.bounds([view.longitude, view.latitude], view.zoom, [view.width,view.height])
    let randomPoints = randomPoint(this.props.count, {
       bbox: boundinbBox
    })
    return randomPoints
  }

  _onViewportChange = (viewport) => {
    this.setData()
    this.setState({ viewport })
  }

  setData() {
    this.props.updateProps({
      value: this.drawRandomPoints()
    })
  }
 
  render() {
    return (
        <MapGL
          {...this.state.viewport}
          onViewportChange={this._onViewportChange}
          value={this.setData.bind(this)}
          mapStyle={this.props.mapStyle}
        ></MapGL>
    )
  }
 
}

module.exports = CustomMap;