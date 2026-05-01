import { Layout, Menu } from 'antd'
import {
  DashboardOutlined,
  SettingOutlined,
  ContainerOutlined,
  FileTextOutlined,
  WarningOutlined,
  CloudUploadOutlined,
  UserOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppStore } from '@/store'
import { menuItems } from '@/routes'

const { Sider } = Layout

const iconMap = {
  dashboard: <DashboardOutlined />,
  setting: <SettingOutlined />,
  server: <ContainerOutlined />,
  file: <FileTextOutlined />,
  warning: <WarningOutlined />,
  cloud: <CloudUploadOutlined />,
  user: <UserOutlined />,
  team: <TeamOutlined />,
}

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { collapsed, setCurrentRoute } = useAppStore()

  const selectedKey = location.pathname === '/' ? '/dashboard' : location.pathname

  const handleMenuClick = (key: string) => {
    setCurrentRoute(key)
    navigate(key)
  }

  return (
    <Sider
      width={160}
      collapsed={collapsed}
      collapsedWidth={64}
      trigger={null}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 64,
        bottom: 0,
        zIndex: 999,
      }}
    >
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        defaultOpenKeys={[]}
        style={{
          height: '100%',
          borderRight: 0,
          paddingTop: 16,
        }}
        items={menuItems.map((item) => ({
          key: item.key,
          icon: iconMap[item.icon],
          label: item.label,
          onClick: () => handleMenuClick(item.key),
        }))}
      />
    </Sider>
  )
}
