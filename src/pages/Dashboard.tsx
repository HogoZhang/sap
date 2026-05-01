import { Card, Row, Col, Space } from 'antd'
import {
  SafetyCertificateOutlined,
  WarningOutlined,
  GlobalOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'
import GlobalMap from '@/components/Dashboard/GlobalMap'
import LogCharts from '@/components/Dashboard/LogCharts'
import AlertTable from '@/components/Dashboard/AlertTable'
import AssetCards from '@/components/Dashboard/AssetCards'

export default function Dashboard() {
  const stats = [
    {
      icon: <ThunderboltOutlined />,
      iconColor: '#ff4d4f',
      value: '28,456',
      suffix: '次',
      title: '今日攻击总数',
      valueColor: '#ff4d4f',
    },
    {
      icon: <SafetyCertificateOutlined />,
      iconColor: '#64ffda',
      value: '27,890',
      suffix: '次',
      title: '已拦截攻击',
      valueColor: '#64ffda',
    },
    {
      icon: <GlobalOutlined />,
      iconColor: '#ffd700',
      value: '156',
      suffix: '个',
      title: '活跃攻击源',
      valueColor: '#ffd700',
    },
    {
      icon: <WarningOutlined />,
      iconColor: '#ff4d4f',
      value: '23',
      suffix: '条',
      title: '高危警报',
      valueColor: '#ff4d4f',
    },
  ]

  return (
    <div style={{ padding: 0 }}>
      <Row gutter={[16, 0]} style={{ marginBottom: 16 }}>
        {stats.map((stat, index) => (
          <Col key={index} xs={12} sm={12} md={6}>
            <Card
              className="dashboard-card"
              style={{ borderRadius: 4, margin: 0 }}
              styles={{ body: { padding: '12px 16px' } }}
            >
              <div className="card-border" />
              <Space
                align="center"
                style={{ width: '100%', justifyContent: 'space-between' }}
              >
                <Space align="center">
                  <span
                    style={{
                      fontSize: 24,
                      color: stat.iconColor,
                      textShadow: `0 0 10px ${stat.iconColor}30`,
                    }}
                  >
                    {stat.icon}
                  </span>
                  <span
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                      color: stat.valueColor,
                      textShadow: `0 0 10px ${stat.valueColor}50`,
                      marginLeft: 8,
                    }}
                  >
                    {stat.value}
                    <span
                      style={{
                        fontSize: 12,
                        color: stat.valueColor,
                        marginLeft: 2,
                      }}
                    >
                      {stat.suffix}
                    </span>
                  </span>
                </Space>
                <div
                  style={{
                    fontSize: 12,
                    color: '#8892b0',
                    fontWeight: 500,
                  }}
                >
                  {stat.title}
                </div>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={18}>
          <Card
            className="dashboard-card"
            title="全球攻击态势地图"
            style={{ height: '450px', borderRadius: 4 }}
            styles={{ body: { padding: 0, height: '390px' } }}
          >
            <div className="card-border" />
            <GlobalMap />
          </Card>
        </Col>
        <Col xs={24} lg={6}>
          <Card
            className="dashboard-card"
            title="重要网络资产"
            style={{ height: '210px', borderRadius: 4, marginBottom: 16 }}
            styles={{ body: { padding: '8px 12px', height: '150px', overflow: 'hidden' } }}
          >
            <div className="card-border" />
            <AssetCards />
          </Card>
          <Card
            className="dashboard-card"
            title="最新警报日志"
            style={{ height: '224px', borderRadius: 4 }}
            styles={{ body: { padding: 0, height: '164px', overflow: 'hidden' } }}
          >
            <div className="card-border" />
            <AlertTable />
          </Card>
        </Col>
      </Row>

      <div style={{ marginTop: 16 }}>
        <LogCharts />
      </div>
    </div>
  )
}
