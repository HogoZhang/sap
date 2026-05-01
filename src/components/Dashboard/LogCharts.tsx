import React, { useEffect, useRef } from 'react'
import { Row, Col, Card } from 'antd'
import * as echarts from 'echarts'
import { mockLogTrend, mockHttpMethodDistribution, mockTcpStats } from '@/mock'

const LogCharts: React.FC = () => {
  const dnsChartRef = useRef<HTMLDivElement>(null)
  const tcpChartRef = useRef<HTMLDivElement>(null)
  const httpChartRef = useRef<HTMLDivElement>(null)

  const dnsChartInstanceRef = useRef<echarts.ECharts | null>(null)
  const tcpChartInstanceRef = useRef<echarts.ECharts | null>(null)
  const httpChartInstanceRef = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (dnsChartRef.current) {
      dnsChartInstanceRef.current = echarts.init(dnsChartRef.current)

      const dnsOption: echarts.EChartsOption = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(17, 34, 64, 0.9)',
          borderColor: '#64ffda',
          borderWidth: 1,
          textStyle: {
            color: '#e6f1ff',
          },
        },
        legend: {
          data: ['DNS', 'TCP', 'HTTP'],
          textStyle: {
            color: '#8892b0',
          },
          top: 0,
          right: 10,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: 35,
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: mockLogTrend.map((item) => item.time),
          axisLine: {
            lineStyle: {
              color: 'rgba(100, 255, 218, 0.3)',
            },
          },
          axisLabel: {
            color: '#8892b0',
            fontSize: 10,
            interval: 0,
          },
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 15000,
          interval: 3000,
          axisLine: {
            lineStyle: {
              color: 'rgba(100, 255, 218, 0.3)',
            },
          },
          axisLabel: {
            color: '#8892b0',
            fontSize: 10,
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(100, 255, 218, 0.1)',
            },
          },
        },
        series: [
          {
            name: 'DNS',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 4,
            lineStyle: {
              color: '#64ffda',
              width: 2,
              shadowColor: 'rgba(100, 255, 218, 0.5)',
              shadowBlur: 10,
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(100, 255, 218, 0.3)' },
                { offset: 1, color: 'rgba(100, 255, 218, 0.05)' },
              ]),
            },
            itemStyle: {
              color: '#64ffda',
            },
            data: mockLogTrend.map((item) => item.dns),
          },
          {
            name: 'TCP',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 4,
            lineStyle: {
              color: '#ffd700',
              width: 2,
              shadowColor: 'rgba(255, 215, 0, 0.5)',
              shadowBlur: 10,
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(255, 215, 0, 0.3)' },
                { offset: 1, color: 'rgba(255, 215, 0, 0.05)' },
              ]),
            },
            itemStyle: {
              color: '#ffd700',
            },
            data: mockLogTrend.map((item) => item.tcp),
          },
          {
            name: 'HTTP',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 4,
            lineStyle: {
              color: '#ff4d4f',
              width: 2,
              shadowColor: 'rgba(255, 77, 79, 0.5)',
              shadowBlur: 10,
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(255, 77, 79, 0.3)' },
                { offset: 1, color: 'rgba(255, 77, 79, 0.05)' },
              ]),
            },
            itemStyle: {
              color: '#ff4d4f',
            },
            data: mockLogTrend.map((item) => item.http),
          },
        ],
      }

      dnsChartInstanceRef.current.setOption(dnsOption)
    }

    if (tcpChartRef.current) {
      tcpChartInstanceRef.current = echarts.init(tcpChartRef.current)

      const tcpOption: echarts.EChartsOption = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(17, 34, 64, 0.9)',
          borderColor: '#64ffda',
          borderWidth: 1,
          textStyle: {
            color: '#e6f1ff',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: 10,
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: mockTcpStats.map((item) => item.name),
          axisLine: {
            lineStyle: {
              color: 'rgba(100, 255, 218, 0.3)',
            },
          },
          axisLabel: {
            color: '#8892b0',
            fontSize: 10,
          },
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 1500,
          interval: 300,
          axisLine: {
            lineStyle: {
              color: 'rgba(100, 255, 218, 0.3)',
            },
          },
          axisLabel: {
            color: '#8892b0',
            fontSize: 10,
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(100, 255, 218, 0.1)',
            },
          },
        },
        series: [
          {
            type: 'bar',
            barWidth: '50%',
            data: mockTcpStats.map((item) => ({
              value: item.value,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: item.color },
                  { offset: 1, color: 'rgba(10, 25, 47, 0.3)' },
                ]),
                shadowColor: item.color,
                shadowBlur: 10,
              },
            })),
          },
        ],
      }

      tcpChartInstanceRef.current.setOption(tcpOption)
    }

    if (httpChartRef.current) {
      httpChartInstanceRef.current = echarts.init(httpChartRef.current)

      const httpOption: echarts.EChartsOption = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(17, 34, 64, 0.9)',
          borderColor: '#64ffda',
          borderWidth: 1,
          textStyle: {
            color: '#e6f1ff',
          },
          formatter: '{b}: {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          top: 'center',
          textStyle: {
            color: '#8892b0',
            fontSize: 10,
          },
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '75%'],
            center: ['65%', '50%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 4,
              borderColor: '#0a192f',
              borderWidth: 2,
            },
            label: {
              show: false,
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 12,
                fontWeight: 'bold',
                color: '#e6f1ff',
              },
              itemStyle: {
                shadowBlur: 20,
                shadowOffsetX: 0,
                shadowColor: 'rgba(100, 255, 218, 0.5)',
              },
            },
            labelLine: {
              show: false,
            },
            data: mockHttpMethodDistribution,
          },
        ],
      }

      httpChartInstanceRef.current.setOption(httpOption)
    }

    const handleResize = () => {
      dnsChartInstanceRef.current?.resize()
      tcpChartInstanceRef.current?.resize()
      httpChartInstanceRef.current?.resize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      dnsChartInstanceRef.current?.dispose()
      tcpChartInstanceRef.current?.dispose()
      httpChartInstanceRef.current?.dispose()
    }
  }, [])

  return (
    <Row gutter={[16, 16]} style={{ width: '100%' }}>
      <Col xs={24} md={10} lg={10} xl={10} xxl={10}>
        <Card
          className="dashboard-card"
          title="DNS/TCP/HTTP 日志趋势"
          style={{ borderRadius: 4, height: '280px' }}
          styles={{ body: { padding: 8, height: '220px' } }}
        >
          <div className="card-border" />
          <div ref={dnsChartRef} style={{ width: '100%', height: '100%' }} />
        </Card>
      </Col>
      <Col xs={24} md={7} lg={7} xl={7} xxl={7}>
        <Card
          className="dashboard-card"
          title="TCP 连接状态"
          style={{ borderRadius: 4, height: '280px' }}
          styles={{ body: { padding: 8, height: '220px' } }}
        >
          <div className="card-border" />
          <div ref={tcpChartRef} style={{ width: '100%', height: '100%' }} />
        </Card>
      </Col>
      <Col xs={24} md={7} lg={7} xl={7} xxl={7}>
        <Card
          className="dashboard-card"
          title="HTTP 方法分布"
          style={{ borderRadius: 4, height: '280px' }}
          styles={{ body: { padding: 8, height: '220px' } }}
        >
          <div className="card-border" />
          <div ref={httpChartRef} style={{ width: '100%', height: '100%' }} />
        </Card>
      </Col>
    </Row>
  )
}

export default LogCharts
