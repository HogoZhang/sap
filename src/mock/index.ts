export interface AlertItem {
  id: string
  time: string
  level: 'high' | 'medium' | 'low'
  type: string
  source: string
  target: string
  status: string
}

export interface LogItem {
  time: string
  dns: number
  tcp: number
  http: number
}

export interface AssetItem {
  id: string
  name: string
  type: string
  ip: string
  status: 'online' | 'warning' | 'offline'
  lastCheck: string
}

export const mockAlerts: AlertItem[] = [
  { id: '1', time: '14:32:15', level: 'high', type: 'SQL注入攻击', source: '192.168.1.45:5234', target: '10.0.0.10:3306', status: '已拦截' },
  { id: '2', time: '14:31:42', level: 'high', type: 'DDoS攻击', source: '203.0.113.5', target: '192.168.1.100:80', status: '已拦截' },
  { id: '3', time: '14:30:18', level: 'medium', type: '端口扫描', source: '198.51.100.23', target: '192.168.1.0/24', status: '已检测' },
  { id: '4', time: '14:28:55', level: 'medium', type: '暴力破解', source: '172.16.0.8', target: '10.0.0.5:22', status: '已拦截' },
  { id: '5', time: '14:27:33', level: 'low', type: '异常登录', source: '203.0.113.10', target: '192.168.1.20:22', status: '已审核' },
  { id: '6', time: '14:26:10', level: 'high', type: '勒索软件', source: '198.51.100.45', target: '192.168.1.30', status: '已隔离' },
  { id: '7', time: '14:24:48', level: 'medium', type: '钓鱼邮件', source: 'phish@example.com', target: 'user@company.com', status: '已拦截' },
  { id: '8', time: '14:23:25', level: 'low', type: '敏感信息泄露', source: '192.168.1.15', target: '外部服务器', status: '已处理' },
  { id: '9', time: '14:22:03', level: 'high', type: '零日漏洞', source: '未知', target: '核心服务器', status: '紧急处理中' },
  { id: '10', time: '14:20:40', level: 'medium', type: '未授权访问', source: '10.0.0.88', target: '192.168.1.10:443', status: '已拦截' },
]

export const mockLogTrend: LogItem[] = Array.from({ length: 24 }, (_, i) => ({
  time: `${i.toString().padStart(2, '0')}:00`,
  dns: Math.floor(Math.random() * 5000) + 2000,
  tcp: Math.floor(Math.random() * 8000) + 3000,
  http: Math.floor(Math.random() * 6000) + 4000,
}))

export const mockHttpMethodDistribution = [
  { name: 'GET', value: 45, itemStyle: { color: '#64ffda' } },
  { name: 'POST', value: 32, itemStyle: { color: '#ffd700' } },
  { name: 'PUT', value: 12, itemStyle: { color: '#f97316' } },
  { name: 'DELETE', value: 6, itemStyle: { color: '#ff4d4f' } },
  { name: '其他', value: 5, itemStyle: { color: '#8892b0' } },
]

export const mockTcpStats = [
  { name: '已建立', value: 1245, color: '#64ffda' },
  { name: 'TIME_WAIT', value: 856, color: '#ffd700' },
  { name: 'CLOSE_WAIT', value: 123, color: '#f97316' },
  { name: 'SYN_RECV', value: 45, color: '#ff4d4f' },
  { name: 'FIN_WAIT', value: 234, color: '#8892b0' },
]

export const mockAssets: AssetItem[] = [
  { id: '1', name: '核心防火墙 FW-01', type: '防火墙', ip: '192.168.1.1', status: 'online', lastCheck: '2026-05-02 14:30' },
  { id: '2', name: '入侵检测系统 IDS-01', type: 'IDS', ip: '192.168.1.2', status: 'online', lastCheck: '2026-05-02 14:30' },
  { id: '3', name: '数据库服务器 DB-PRIMARY', type: '数据库', ip: '10.0.0.10', status: 'online', lastCheck: '2026-05-02 14:28' },
  { id: '4', name: 'Web服务器 WEB-01', type: 'Web服务器', ip: '192.168.1.100', status: 'warning', lastCheck: '2026-05-02 14:25' },
  { id: '5', name: '邮件服务器 MAIL-01', type: '邮件服务器', ip: '192.168.1.50', status: 'online', lastCheck: '2026-05-02 14:30' },
  { id: '6', name: '备份服务器 BACKUP-01', type: '存储', ip: '10.0.0.20', status: 'offline', lastCheck: '2026-05-02 12:00' },
]

export const mockAttackLines = [
  {
    fromName: '北京',
    toName: '纽约',
    coords: [[116.4074, 39.9042], [-74.0060, 40.7128]],
  },
  {
    fromName: '莫斯科',
    toName: '华盛顿',
    coords: [[37.6173, 55.7558], [-77.0369, 38.9072]],
  },
  {
    fromName: '上海',
    toName: '东京',
    coords: [[121.4737, 31.2304], [139.6917, 35.6895]],
  },
  {
    fromName: '伦敦',
    toName: '新加坡',
    coords: [[-0.1278, 51.5074], [103.8198, 1.3521]],
  },
  {
    fromName: '深圳',
    toName: '洛杉矶',
    coords: [[114.0579, 22.5431], [-118.2437, 34.0522]],
  },
  {
    fromName: '首尔',
    toName: '悉尼',
    coords: [[126.9780, 37.5665], [151.2093, -33.8688]],
  },
  {
    fromName: '巴黎',
    toName: '迪拜',
    coords: [[2.3522, 48.8566], [55.2708, 25.2048]],
  },
  {
    fromName: '广州',
    toName: '孟买',
    coords: [[113.2644, 23.1291], [72.8777, 19.0760]],
  },
]

export const mockAttackPoints = [
  { name: '北京', value: [116.4074, 39.9042, 120] },
  { name: '上海', value: [121.4737, 31.2304, 95] },
  { name: '深圳', value: [114.0579, 22.5431, 85] },
  { name: '广州', value: [113.2644, 23.1291, 78] },
  { name: '纽约', value: [-74.0060, 40.7128, 110] },
  { name: '华盛顿', value: [-77.0369, 38.9072, 90] },
  { name: '洛杉矶', value: [-118.2437, 34.0522, 88] },
  { name: '伦敦', value: [-0.1278, 51.5074, 95] },
  { name: '巴黎', value: [2.3522, 48.8566, 80] },
  { name: '莫斯科', value: [37.6173, 55.7558, 85] },
  { name: '东京', value: [139.6917, 35.6895, 105] },
  { name: '首尔', value: [126.9780, 37.5665, 75] },
  { name: '新加坡', value: [103.8198, 1.3521, 70] },
  { name: '悉尼', value: [151.2093, -33.8688, 65] },
  { name: '迪拜', value: [55.2708, 25.2048, 60] },
  { name: '孟买', value: [72.8777, 19.0760, 72] },
]

export interface RoleItem {
  id: string
  name: string
  code: string
  description: string
  status: 'active' | 'inactive'
  permissions: string[]
  createTime: string
  userCount: number
}

export interface UserItem {
  id: string
  username: string
  realName: string
  email: string
  phone: string
  roleId: string
  roleName: string
  status: 'active' | 'inactive'
  avatar?: string
  createTime: string
  lastLoginTime: string
}

export const mockRoles: RoleItem[] = [
  {
    id: '1',
    name: '超级管理员',
    code: 'super_admin',
    description: '拥有系统所有权限',
    status: 'active',
    permissions: ['all'],
    createTime: '2026-01-01 00:00:00',
    userCount: 1,
  },
  {
    id: '2',
    name: '安全管理员',
    code: 'security_admin',
    description: '负责安全策略和规则管理',
    status: 'active',
    permissions: ['rules:read', 'rules:write', 'alerts:read', 'logs:read'],
    createTime: '2026-01-15 10:30:00',
    userCount: 2,
  },
  {
    id: '3',
    name: '资产管理员',
    code: 'asset_admin',
    description: '负责资产信息管理',
    status: 'active',
    permissions: ['assets:read', 'assets:write'],
    createTime: '2026-02-01 09:00:00',
    userCount: 1,
  },
  {
    id: '4',
    name: '普通用户',
    code: 'viewer',
    description: '仅查看权限',
    status: 'active',
    permissions: ['dashboard:read', 'alerts:read', 'logs:read', 'assets:read'],
    createTime: '2026-02-10 14:00:00',
    userCount: 5,
  },
  {
    id: '5',
    name: '审计员',
    code: 'auditor',
    description: '系统审计权限',
    status: 'inactive',
    permissions: ['logs:read', 'alerts:read'],
    createTime: '2026-03-01 11:00:00',
    userCount: 0,
  },
]

export const mockUsers: UserItem[] = [
  {
    id: '1',
    username: 'admin',
    realName: '系统管理员',
    email: 'admin@company.com',
    phone: '13800000001',
    roleId: '1',
    roleName: '超级管理员',
    status: 'active',
    createTime: '2026-01-01 00:00:00',
    lastLoginTime: '2026-05-02 14:00:00',
  },
  {
    id: '2',
    username: 'security01',
    realName: '张三',
    email: 'zhangsan@company.com',
    phone: '13800000002',
    roleId: '2',
    roleName: '安全管理员',
    status: 'active',
    createTime: '2026-01-20 10:30:00',
    lastLoginTime: '2026-05-02 13:45:00',
  },
  {
    id: '3',
    username: 'security02',
    realName: '李四',
    email: 'lisi@company.com',
    phone: '13800000003',
    roleId: '2',
    roleName: '安全管理员',
    status: 'active',
    createTime: '2026-02-01 09:00:00',
    lastLoginTime: '2026-05-01 16:30:00',
  },
  {
    id: '4',
    username: 'asset01',
    realName: '王五',
    email: 'wangwu@company.com',
    phone: '13800000004',
    roleId: '3',
    roleName: '资产管理员',
    status: 'active',
    createTime: '2026-02-05 11:00:00',
    lastLoginTime: '2026-05-02 10:00:00',
  },
  {
    id: '5',
    username: 'viewer01',
    realName: '赵六',
    email: 'zhaoliu@company.com',
    phone: '13800000005',
    roleId: '4',
    roleName: '普通用户',
    status: 'active',
    createTime: '2026-02-15 14:00:00',
    lastLoginTime: '2026-04-30 09:00:00',
  },
  {
    id: '6',
    username: 'viewer02',
    realName: '钱七',
    email: 'qianqi@company.com',
    phone: '13800000006',
    roleId: '4',
    roleName: '普通用户',
    status: 'inactive',
    createTime: '2026-03-01 10:00:00',
    lastLoginTime: '2026-04-15 15:00:00',
  },
  {
    id: '7',
    username: 'viewer03',
    realName: '孙八',
    email: 'sunba@company.com',
    phone: '13800000007',
    roleId: '4',
    roleName: '普通用户',
    status: 'active',
    createTime: '2026-03-10 11:00:00',
    lastLoginTime: '2026-05-02 12:00:00',
  },
]

export const mockPermissions = [
  { group: '仪表盘', permissions: ['dashboard:read', 'dashboard:write'] },
  { group: '规则管理', permissions: ['rules:read', 'rules:write', 'rules:delete'] },
  { group: '资产管理', permissions: ['assets:read', 'assets:write', 'assets:delete'] },
  { group: '日志管理', permissions: ['logs:read', 'logs:export'] },
  { group: '警报管理', permissions: ['alerts:read', 'alerts:write', 'alerts:delete'] },
  { group: '用户管理', permissions: ['users:read', 'users:write', 'users:delete'] },
  { group: '角色管理', permissions: ['roles:read', 'roles:write', 'roles:delete'] },
]
