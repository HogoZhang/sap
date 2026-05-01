import { Card, Result } from 'antd'
import { ContainerOutlined } from '@ant-design/icons'

export default function Assets() {
  return (
    <Card
      className="dashboard-card"
      style={{ minHeight: 'calc(100vh - 112px)' }}
    >
      <div className="card-border" />
      <Result
        icon={<ContainerOutlined style={{ color: '#64ffda' }} />}
        title="资产管理"
        subTitle="该页面正在开发中，敬请期待..."
        status="info"
      />
    </Card>
  )
}
