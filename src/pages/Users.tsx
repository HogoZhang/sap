import React, { useState, useEffect } from 'react'
import {
  Card,
  Table,
  Button,
  Space,
  Input,
  Select,
  Tag,
  Modal,
  Form,
  Switch,
  Popconfirm,
  message,
  Avatar,
} from 'antd'
import {
  UserOutlined,
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import { mockUsers, mockRoles, UserItem } from '@/mock'

const { Option } = Select

interface SearchFormType {
  username?: string
  status?: string
  roleId?: string
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<UserItem[]>([])
  const [loading, setLoading] = useState(false)
  const [searchForm] = Form.useForm()
  const [modalVisible, setModalVisible] = useState(false)
  const [editingUser, setEditingUser] = useState<UserItem | null>(null)
  const [form] = Form.useForm()
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const fetchUsers = (params?: SearchFormType) => {
    setLoading(true)
    setTimeout(() => {
      let filteredUsers = [...mockUsers]
      if (params?.username) {
        filteredUsers = filteredUsers.filter(
          (u) =>
            u.username.includes(params.username!) ||
            u.realName.includes(params.username!)
        )
      }
      if (params?.status) {
        filteredUsers = filteredUsers.filter((u) => u.status === params.status)
      }
      if (params?.roleId) {
        filteredUsers = filteredUsers.filter((u) => u.roleId === params.roleId)
      }
      setTotal(filteredUsers.length)
      setUsers(filteredUsers)
      setLoading(false)
    }, 300)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSearch = (values: SearchFormType) => {
    setCurrentPage(1)
    fetchUsers(values)
  }

  const handleReset = () => {
    searchForm.resetFields()
    setCurrentPage(1)
    fetchUsers()
  }

  const handleAdd = () => {
    setEditingUser(null)
    form.resetFields()
    setModalVisible(true)
  }

  const handleEdit = (record: UserItem) => {
    setEditingUser(record)
    form.setFieldsValue({
      username: record.username,
      realName: record.realName,
      email: record.email,
      phone: record.phone,
      roleId: record.roleId,
      status: record.status === 'active',
    })
    setModalVisible(true)
  }

  const handleDelete = (id: string) => {
    setLoading(true)
    setTimeout(() => {
      const newUsers = users.filter((u) => u.id !== id)
      setUsers(newUsers)
      setTotal(newUsers.length)
      message.success('删除成功')
      setLoading(false)
    }, 300)
  }

  const handleStatusChange = (record: UserItem, checked: boolean) => {
    setLoading(true)
    setTimeout(() => {
      const newStatus = checked ? 'active' as const : 'inactive' as const
      const newUsers = users.map((u) =>
        u.id === record.id ? { ...u, status: newStatus } as UserItem : u
      )
      setUsers(newUsers)
      message.success(`已${checked ? '启用' : '禁用'}用户`)
      setLoading(false)
    }, 300)
  }

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      setLoading(true)
      setTimeout(() => {
        const newStatus = values.status ? 'active' as const : 'inactive' as const
        if (editingUser) {
          const newUsers = users.map((u) =>
            u.id === editingUser.id
              ? {
                  ...u,
                  ...values,
                  roleName: mockRoles.find((r) => r.id === values.roleId)?.name || '',
                  status: newStatus,
                } as UserItem
              : u
          )
          setUsers(newUsers)
          message.success('编辑成功')
        } else {
          const newUser: UserItem = {
            id: String(Date.now()),
            ...values,
            roleName: mockRoles.find((r) => r.id === values.roleId)?.name || '',
            status: newStatus,
            createTime: new Date().toLocaleString(),
            lastLoginTime: '-',
          }
          const newUsers = [newUser, ...users]
          setUsers(newUsers)
          setTotal(newUsers.length)
          message.success('添加成功')
        }
        setModalVisible(false)
        setLoading(false)
      }, 300)
    })
  }

  const columns: ColumnsType<UserItem> = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      width: 120,
      render: (text) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} style={{ backgroundColor: '#64ffda' }} />
          <span style={{ color: '#e6f1ff' }}>{text}</span>
        </Space>
      ),
    },
    {
      title: '真实姓名',
      dataIndex: 'realName',
      key: 'realName',
      width: 100,
      render: (text) => <span style={{ color: '#e6f1ff' }}>{text}</span>,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 180,
      render: (text) => <span style={{ color: '#8892b0' }}>{text}</span>,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      width: 120,
      render: (text) => <span style={{ color: '#8892b0' }}>{text}</span>,
    },
    {
      title: '角色',
      dataIndex: 'roleName',
      key: 'roleName',
      width: 120,
      render: (text, record) => (
        <Tag
          color={record.roleId === '1' ? 'red' : record.roleId === '2' ? 'gold' : 'blue'}
        >
          {text}
        </Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (text: string, record) => (
        <Switch
          checked={text === 'active'}
          checkedChildren="启用"
          unCheckedChildren="禁用"
          onChange={(checked) => handleStatusChange(record, checked)}
        />
      ),
    },
    {
      title: '最后登录',
      dataIndex: 'lastLoginTime',
      key: 'lastLoginTime',
      width: 160,
      render: (text) => <span style={{ color: '#8892b0', fontSize: 12 }}>{text}</span>,
    },
    {
      title: '操作',
      key: 'action',
      width: 140,
      fixed: 'right',
      render: (_: any, record: UserItem) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ color: '#64ffda' }}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除该用户吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button
              type="link"
              size="small"
              danger
              icon={<DeleteOutlined />}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div style={{ padding: 0 }}>
      <Card
        className="dashboard-card"
        style={{ minHeight: 'calc(100vh - 112px)' }}
        title={
          <Space>
            <UserOutlined style={{ color: '#64ffda' }} />
            <span>用户管理</span>
          </Space>
        }
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
            style={{ backgroundColor: '#64ffda', borderColor: '#64ffda' }}
          >
            新增用户
          </Button>
        }
      >
        <div className="card-border" />
        
        <Card
          style={{
            marginBottom: 16,
            background: 'rgba(24, 59, 86, 0.3)',
            border: '1px solid rgba(100, 255, 218, 0.15)',
          }}
          styles={{ body: { padding: '12px 16px' }}}
        >
          <Form
            form={searchForm}
            layout="inline"
            onFinish={handleSearch}
          >
            <Form.Item name="username" label="用户名/姓名">
              <Input
                placeholder="请输入用户名或姓名"
                prefix={<SearchOutlined style={{ color: '#8892b0' }} />}
                style={{ width: 200 }}
                allowClear
              />
            </Form.Item>
            <Form.Item name="status" label="状态">
              <Select
                placeholder="请选择状态"
                style={{ width: 140 }}
                allowClear
              >
                <Option value="active">启用</Option>
                <Option value="inactive">禁用</Option>
              </Select>
            </Form.Item>
            <Form.Item name="roleId" label="角色">
              <Select
                placeholder="请选择角色"
                style={{ width: 140 }}
                allowClear
              >
                {mockRoles.map((role) => (
                  <Option key={role.id} value={role.id}>
                    {role.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SearchOutlined />}
                  style={{ backgroundColor: '#64ffda', borderColor: '#64ffda' }}
                >
                  搜索
                </Button>
                <Button icon={<ReloadOutlined />} onClick={handleReset}>
                  重置
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>

        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          loading={loading}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条记录`,
            onChange: (page, size) => {
              setCurrentPage(page)
              setPageSize(size)
            },
          }}
          scroll={{ x: 1300 }}
        />
      </Card>

      <Modal
        title={editingUser ? '编辑用户' : '新增用户'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        confirmLoading={loading}
        okText="确定"
        cancelText="取消"
        okButtonProps={{
          style: { backgroundColor: '#64ffda', borderColor: '#64ffda' },
        }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ status: true }}
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" disabled={!!editingUser} />
          </Form.Item>
          <Form.Item
            name="realName"
            label="真实姓名"
            rules={[{ required: true, message: '请输入真实姓名' }]}
          >
            <Input placeholder="请输入真实姓名" />
          </Form.Item>
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入正确的邮箱格式' },
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="手机号"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式' },
            ]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="roleId"
            label="角色"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select placeholder="请选择角色">
              {mockRoles.map((role) => (
                <Option key={role.id} value={role.id}>
                  {role.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            valuePropName="checked"
          >
            <Switch checkedChildren="启用" unCheckedChildren="禁用" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Users
