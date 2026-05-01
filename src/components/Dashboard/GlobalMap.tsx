import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { mockAttackLines, mockAttackPoints } from '@/mock'
import worldGeoJSON from '@amcharts/amcharts5-geodata/json/worldLow.json'

const GlobalMap: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstanceRef = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      echarts.registerMap('world', worldGeoJSON as any)
      chartInstanceRef.current = echarts.init(chartRef.current)

      const linesData = mockAttackLines.map((item) => ({
        coords: item.coords,
        value: `${item.fromName} -> ${item.toName}`,
      }))

      const scatterData = mockAttackPoints.map((item) => ({
        name: item.name,
        value: item.value,
      }))

      const option: echarts.EChartsOption = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(17, 34, 64, 0.95)',
          borderColor: '#64ffda',
          borderWidth: 1,
          textStyle: {
            color: '#e6f1ff',
          },
          formatter: (params: any) => {
            if (params.seriesType === 'effectScatter') {
              return `<div style="color: #64ffda; font-weight: bold;">${params.name}</div>
                      <div>攻击次数: <span style="color: #ffd700;">${params.value[2]}</span></div>`
            }
            if (params.seriesType === 'lines') {
              return `<div style="color: #ff4d4f; font-weight: bold;">攻击路径</div>
                      <div>${params.value}</div>`
            }
            if (params.name) {
              return `<div style="color: #64ffda; font-weight: bold;">${params.name}</div>`
            }
            return ''
          },
        },
        geo: {
          map: 'world',
          roam: false,
          zoom: 1.5,
          center: [10, 20],
          itemStyle: {
            areaColor: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.8,
              colorStops: [
                { offset: 0, color: 'rgba(100, 255, 218, 0.08)' },
                { offset: 0.5, color: 'rgba(24, 59, 86, 0.3)' },
                { offset: 1, color: 'rgba(12, 25, 41, 0.5)' }
              ]
            },
            borderColor: 'rgba(100, 255, 218, 0.3)',
            borderWidth: 1,
          },
          emphasis: {
            itemStyle: {
              areaColor: 'rgba(100, 255, 218, 0.2)',
              borderColor: '#64ffda',
              borderWidth: 2,
            },
          },
        },
        series: [
          {
            name: '攻击路径',
            type: 'lines',
            coordinateSystem: 'geo',
            zlevel: 2,
            effect: {
              show: true,
              period: 5,
              trailLength: 0.35,
              symbol: 'arrow',
              symbolSize: 8,
              color: '#ff4d4f',
            },
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  { offset: 0, color: '#ff4d4f' },
                  { offset: 0.5, color: '#ff6b6b' },
                  { offset: 1, color: '#ff4d4f' }
                ]
              },
              width: 1.5,
              opacity: 0.8,
              curveness: 0.25,
            },
            data: linesData,
          } as any,
          {
            name: '攻击路径光晕',
            type: 'lines',
            coordinateSystem: 'geo',
            zlevel: 1,
            lineStyle: {
              color: '#ff4d4f',
              width: 4,
              opacity: 0.15,
              curveness: 0.25,
            },
            data: linesData,
          } as any,
          {
            name: '攻击源点',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 3,
            rippleEffect: {
              brushType: 'stroke',
              scale: 5,
              period: 2.5,
            },
            symbolSize: (val: any) => {
              return 10 + val[2] / 18
            },
            itemStyle: {
              color: (params: any) => {
                const val = params.value[2]
                if (val > 100) return '#ff4d4f'
                if (val > 80) return '#ffd700'
                return '#64ffda'
              },
              shadowBlur: 15,
              shadowColor: '#64ffda',
            },
            label: {
              show: true,
              formatter: '{b}',
              position: 'right',
              color: '#e6f1ff',
              fontSize: 11,
              fontWeight: 500,
              textShadow: '0 0 5px rgba(100, 255, 218, 0.5)',
            },
            data: scatterData,
          } as any,
          {
            name: '攻击点光晕',
            type: 'scatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            symbolSize: (val: any) => {
              return 18 + val[2] / 12
            },
            itemStyle: {
              color: 'transparent',
              borderColor: (params: any) => {
                const val = params.value[2]
                if (val > 100) return 'rgba(255, 77, 79, 0.4)'
                if (val > 80) return 'rgba(255, 215, 0, 0.4)'
                return 'rgba(100, 255, 218, 0.4)'
              },
              borderWidth: 2,
              shadowBlur: 25,
              shadowColor: (params: any) => {
                const val = params.value[2]
                if (val > 100) return '#ff4d4f'
                if (val > 80) return '#ffd700'
                return '#64ffda'
              },
            },
            data: scatterData,
          } as any,
        ],
      }

      chartInstanceRef.current.setOption(option)

      const handleResize = () => {
        chartInstanceRef.current?.resize()
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        chartInstanceRef.current?.dispose()
      }
    }
  }, [])

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
}

export default GlobalMap
