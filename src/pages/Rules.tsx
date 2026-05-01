import { Card, Result } from 'antd'
import { SettingOutlined } from '@ant-design/icons'

export default function Rules() {
  return (
    <Card
      className="dashboard-card"
      style={{ minHeight: 'calc(100vh - 112px)' }}
    >
      <div className="card-border" />
      <Result
        icon={<SettingOutlined style={{ color: '#64ffda' }} />}
        title="规则管理"
        subTitle="该页面正在开发中，敬请期待..."
        status="info"
      />
    </Card>
  )
}
