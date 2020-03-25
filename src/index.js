import { szRoad } from './road-data'
import mapboxgl from 'mapbox-gl'
import echarts from 'echarts'
import 'echarts-gl'

window.mapboxgl = mapboxgl
mapboxgl.accessToken = 'pk.eyJ1IjoibW9ob25nIiwiYSI6ImNrNGFsdjY5ZzA1NW4zbG14b2JoMnA5c3IifQ.1qVWFsyHW2wKThTgQg08SA'

var taxiRoutes = [];
var data = szRoad.data;
var hStep = 300 / (data.length - 1);

var i = 0;
for (var x in data) {
    // i++;
    // if(i<5000)
    //     continue;
    var line = data[x];
    // if(busLines.length>500)
    //     break;
    var pointString = line.ROAD_LINE;
    var pointArr = pointString.split(';');
    var lnglats = [];
    for (var j in pointArr) {
        lnglats.push(pointArr[j].split(','))
    }
    taxiRoutes.push({
        coords: lnglats,
        lineStyle: {
            // color: echarts.color.modifyHSL('#5A94DF', Math.round(hStep * x))
        }
    })
}

const option = {
  mapbox: {
      center: [104.091, 30.639],
      zoom: 13,
      // pitch: 50,
      // bearing: -10,
      altitudeScale: 2,
      style: 'mapbox://styles/mapbox/dark-v9',
      postEffect: {
          enable: true,
          FXAA: {
              enable: true
          }
      },
      light: {
          main: {
              intensity: 1,
              shadow: true,
              shadowQuality: 'high'
          },
          ambient: {
              intensity: 0.
          },
          ambientCubemap: {
              // texture: './canyon.hdr', 
              exposure: 1,
              diffuseIntensity: 0.5,
              specularIntensity: 2
          }
      }
  },
  series: [{
      type: 'lines3D',

      coordinateSystem: 'mapbox',

      effect: {
          show: true,
          constantSpeed: 5,
          trailWidth: 2,
          trailLength: 0.4,
          trailOpacity: 1,
          spotIntensity: 10
      },

      blendMode: 'lighter',

      polyline: true,

      lineStyle: {
          width: 0.1,
          color: 'rgb(200, 40, 0)',
          opacity: 0.
      },

      data: {
          count: function () {
              return taxiRoutes.length;
          },
          getItem: function (idx) {
              return taxiRoutes[idx]
          }
      }
  }]
}

const chart = echarts.init(document.getElementById('map'));
chart.setOption(option)

