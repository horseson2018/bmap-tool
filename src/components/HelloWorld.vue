<template>
  <div class="map">
    <div id="container" style="" ref="map"></div>
    <div id="right-tool">
      <ul class="mouse-tools">
        <li id="tol_circle" class="bMapTool_box circle" title="画圆形"
          @click="drawCircle"></li>
        <li id="tol_rectangle" class="bMapTool_box rectangle" title="画矩形"
          @click="drawRectangle"></li>
        <li id="tol_polygon" class="bMapTool_box polygon" title="画多边形"
          @click="drawPolygon"></li>
        <li id="" class="bMapTool_box back" title="撤销"
          @click="revoke"></li>
        <li id="" class="bMapTool_box clear" title="重置"
          @click="reDraw"></li>
      </ul>
      <div id="circle-tool" class="circle-tool">
        <input
          v-model="center"
          type="text"
          placeholder="请输入中心点经纬度 例: 120.3154, 27.922"/>
        请输入覆盖范围半径:
        <input placeholder="半径" v-model="radius" @keyup.enter='makeCircle'/>
        KM
        <button size="mini" type="primary" style="float: right;" @click="makeCircle">
          确定
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import BMap from 'BMap'
import esriLoader from 'esri-loader'
import Drawlacci from '../utils/bmapTool'

export default {
  data() {
    return {
      areas: [330302, 330303, 330304, 330305],
      map: null,
      polygonEngine: null,
      graphic: null,
      geometryEngine: null,
      drawObj: null,
      isCircle: false,
      center: '', // 圆心
      radius: '', // 半径
      edgeList: [[116.387112,39.920977], [116.385243,39.913063], [116.394226,39.917988], [116.401772,39.921364], [116.41248,39.927893]],
      polygons: []
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      const poi = new BMap.Point(116.404, 39.915);
      this.map = new BMap.Map('container', {enableMapClick:false});
      this.map.centerAndZoom(poi, 15);
      const polygon = new BMap.Polygon(this.edgeList.map((str) => new BMap.Point(str[0], str[1])), {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5});
      this.map.addOverlay(polygon);
      this.map.enableScrollWheelZoom();
      this.map.disableDoubleClickZoom()
      this.drawObj = new Drawlacci(this.map, this.getPoints, this.channel)
      this.initArcgis()
    },
    initArcgis() {
      esriLoader.loadModules([
        'esri/geometry/geometryEngine',
        "esri/geometry/Polygon"
      ], {
        version: '3.32'
      }).then(([GeometryEngine, Polygon]) => {
        console.log(GeometryEngine)
        console.log(Polygon)
        this.polygonEngine = Polygon
        this.geometryEngine = GeometryEngine
        this.edgeList = new this.polygonEngine({
          rings: [this.edgeList],
        })
        console.log(this.edgeList)
      })
    },
    drawCircle() {
      this.drawObj.drawCircle(true)
      this.isCircle = true
      document.getElementById('circle-tool').style.display = 'block'
      this.center = ''
      this.radius = ''
    },
    drawRectangle() {
      document.getElementById('circle-tool').style.display = 'none'
      this.drawObj.drawRectangle()
    },
    drawPolygon() {
      document.getElementById('circle-tool').style.display = 'none'
      this.drawObj.drawPolygon()
    },
    revoke() {
      this.drawObj.revoke()
    },
    reDraw() {
      document.getElementById('circle-tool').style.display = 'none'
      this.drawObj.reDraw()
      this.polygons.forEach((item) => {
        this.map.removeOverlay(item);
      })
      this.cusAreaPeopleNumber = 0
      this.polygons = []
    },
    close() {
      this.drawObj.close()
    },
    makeCircle() {
      const index = this.drawObj.__maker.indexOf(this.editingCircle)
      this.drawObj.__maker.splice(index, 1)
      this.map.removeOverlay(this.editingCircle)
      this.editingCircle = this.drawObj.drawCircle(false, this.center, this.radius * 1000)
    },
    getPoints(result) {
      this.polygons.forEach((item) => {
        this.map.removeOverlay(item);
      })
      // 筛选区域
      result.forEach((item) => {
        var arr = item.getPath().map((item) => [item.lng, item.lat])
        var polygonGraphic = new this.polygonEngine({
          rings: [arr],
        })
        console.log(polygonGraphic)
        var points = this.geometryEngine.intersect(this.edgeList, polygonGraphic)?.rings || []
        console.log(this.geometryEngine.intersect(this.edgeList, polygonGraphic))
        for (let j = 0 ; j < points.length ; j++) {
          const intersectArea = new BMap.Polygon(points[j].map((str) => new BMap.Point(str[0], str[1])),
            {
              strokeColor: "#00f6ff ",
              strokeWeight: 2,
              strokeOpacity: 0.1,
              fillColor: '#00f6ff ',
              fillOpacity: .5
            });
          this.map.addOverlay(intersectArea)
          this.polygons.push(intersectArea)
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .map{
    width: 1400px;
    height: calc(100vh - 107px);
    position: relative;
  }
  #container{
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    margin: 3px 0 0 3px;
    float: left;
  }
  #right-tool {
      position: absolute;
      right: 80px;
      top: 45px;
      .mouse-tools {
        float:right;
        width: 195px;
        padding-inline-start: 0;
        background-color: #fff;
        border-radius: 5px;
        height: 38px;
        border: 1px solid #4ecaee;
        font-size: 0;
        li {
          list-style: none;
          display: inline-block;
          width: 38px;
          height: 36px;
          border-right: 1px solid #efefef;
          cursor: pointer;
          &:first-child {
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
          }
          &:last-child {
            border-right: 0;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
          }
          &.hander {
            background: #fff url(../assets/cus_toolsbg.png) 0px -35px no-repeat;
          }
          &.hander_checked {
            background: #4ecaee url(../assets/cus_toolsbg.png) 0px 0px no-repeat;
          }
          &.circle {
            background: #fff url(../assets/cus_toolsbg.png) -36px -35px no-repeat;
          }
          &.circle_checked {
            background: #4ecaee url(../assets/cus_toolsbg.png) -36px 0px no-repeat;
          }
          &.polyline {
            background: #fff url(../assets/cus_toolsbg.png) -234px -35px no-repeat;
          }
          &.polyline_checked {
            background: #4ecaee url(../assets/cus_toolsbg.png) -234px 0px no-repeat;
          }
          &.rectangle {
            background: #fff url(../assets/cus_toolsbg.png) -69px -35px no-repeat;
          }

          &.rectangle_checked {
            background: #4ecaee url(../assets/cus_toolsbg.png) -69px 0px no-repeat;
          }

          &.polygon {
            background: #fff url(../assets/cus_toolsbg.png) -102px -35px no-repeat;
          }

          &.polygon_checked {
            background: #4ecaee url(../assets/cus_toolsbg.png) -102px 0px no-repeat;
          }

          &.back {
            background: #fff url(../assets/cus_toolsbg.png) -136px -35px no-repeat;
          }

          &.back:hover {
            background: #4ecaee url(../assets/cus_toolsbg.png) -136px 0px no-repeat;
          }

          &.clear {
            background: #fff url(../assets/cus_toolsbg.png) -300px -34px no-repeat;
          }
          
          &.clear:hover {
            background: #4ecaee url(../assets/cus_toolsbg.png) -300px 1px no-repeat;
          }

          &.back_checked {
            background: #4ecaee url(../assets/cus_toolsbg.png) -136px 0px no-repeat;
          }

          &.search {
            background: #fff url(../assets/cus_toolsbg.png) -203px -35px no-repeat;
          }

          &.search_checked {
            background: #4ecaee url(../assets/cus_toolsbg.png) -203px 0px no-repeat;
          }
          
          &.measure {
            background: #fff url(../assets/cus_toolsbg.png) -268px -35px no-repeat;
          }
          &.measure:hover {
            background: #4ecaee url(../assets/cus_toolsbg.png) -268px 0px no-repeat;
          }
        }
      }
      .circle-tool{
        width: 300px;
        margin-top: 50px;
      }
    }
</style>