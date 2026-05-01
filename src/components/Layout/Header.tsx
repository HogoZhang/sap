import { Layout, Row, Col, Badge, Avatar, Dropdown, MenuProps } from 'antd'
import {
  NotificationOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  SecurityScanOutlined,
} from '@ant-design/icons'
import { useAppStore } from '@/store'

const { Header: AntHeader } = Layout

const userMenuItems: MenuProps['items'] = [
  {
    key: 'profile',
    icon: <UserOutlined />,
    label: '个人中心',
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: '系统设置',
  },
  {
    type: 'divider',
  },
  {
    key: 'logout',
    icon: <LogoutOutlined />,
    label: '退出登录',
    danger: true,
  },
]

export default function Header() {
  const { collapsed, setCollapsed } = useAppStore()

  return (
    <AntHeader
      style={{
        height: 64,
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <Row align="middle" gutter={16}>
        <Col>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => setCollapsed(!collapsed)}
          >
            <SecurityScanOutlined
              style={{
                fontSize: 28,
                color: '#64ffda',
                marginRight: 12,
              }}
            />
            <span
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: '#64ffda',
                textShadow: '0 0 10px rgba(100, 255, 218, 0.3)',
                letterSpacing: 2,
              }}
            >
              网络安全态势感知平台
            </span>
          </div>
        </Col>
      </Row>

      <Row align="middle" gutter={24}>
        <Col>
          <Badge count={5} dot offset={[2, 2]}>
            <NotificationOutlined
              style={{
                fontSize: 20,
                color: '#8892b0',
                cursor: 'pointer',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#64ffda'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#8892b0'
              }}
            />
          </Badge>
        </Col>
        <Col>
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                padding: '4px 12px',
                borderRadius: 4,
                transition: 'background 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(100, 255, 218, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <Avatar
                size={32}
                icon={<UserOutlined />}
                style={{
                  backgroundColor: '#183b56',
                  color: '#64ffda',
                  marginRight: 8,
                }}
              />
              <span style={{ color: '#8892b0', fontSize: 14 }}>管理员</span>
            </div>
          </Dropdown>
        </Col>
      </Row>
    </AntHeader>
  )
}
