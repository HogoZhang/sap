import { Card, Result } from 'antd'
import { FileTextOutlined } from '@ant-design/icons'

export default function NetworkLogs() {
  return (
    <Card
      className="dashboard-card"
      style={{ minHeight: 'calc(100vh - 112px)' }}
    >
      <div className="card-border" />
      <Result
        icon={<FileTextOutlined style={{ color: '#64ffda' }} />}
        title="网络日志"
        subTitle="该页面正在开发中，敬请期待..."
        status="info"
      />
    </Card>
  )
}
