import { Card, Result } from 'antd'
import { CloudUploadOutlined } from '@ant-design/icons'

export default function Upgrade() {
  return (
    <Card
      className="dashboard-card"
      style={{ minHeight: 'calc(100vh - 112px)' }}
    >
      <div className="card-border" />
      <Result
        icon={<CloudUploadOutlined style={{ color: '#64ffda' }} />}
        title="系统升级"
        subTitle="该页面正在开发中，敬请期待..."
        status="info"
      />
    </Card>
  )
}
