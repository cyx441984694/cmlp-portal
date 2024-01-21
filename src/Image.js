import React, { useState, useEffect} from 'react';
import './index.css';
import { DownOutlined } from '@ant-design/icons';
import { Drawer, InputRef } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { Button, Flex, Switch, Badge, Dropdown, Space, Table, Layout, Popconfirm, Form, Col, Row, Input, Select } from 'antd';
import type { FormInstance } from 'antd/es/form';


const { Content } = Layout;
const { Option } = Select;

export const templateData = [
{
  key: 1,
  tag: '1.0',
  path: '/test',
  updated_date: '2023-12-24 23:12:00',
},
{
    key: 2,
    tag: '1.1',
    path: '/demo',
    updated_date: '2023-12-25 23:12:00',
}];

export const subTemplateData = [{
    key: 1,
    name: 'notebook-image',
    owner: 'platform_pod',
    createdAt: '2023-12-24 23:12:00',
  }];
  

interface ExpandedDataType {
    key: React.Key;
    tag: string;
    path: string;
    updated_date: string;
  }
  
interface DataType {
  key: React.Key;
  name: string;
  owner: string;
  createdAt: string;
}

type TableRowSelection<T> = TableProps<T>['rowSelection'];

const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

const handleRefresh = (key: React.Key) => {
    console.log("hello refreshing")
};


const Image: React.FC = () => {

//   const handleSubmit = (event) => {
//   console.log("checking")
//   console.log(event.target)
//   };
        
    

  const [visible, setVisible] = useState(false);
  const [checkStrictly, setCheckStrictly] = useState(false);
  const expandedRowRender = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: 'Tag', dataIndex: 'tag', key: 'tag' },
      { title: 'Path', dataIndex: 'path', key: 'path'},
      { title: 'Updated_date', dataIndex: 'updated_date', key: 'updated_date'},
      {
        title: 'Status',
        key: 'state',
        render: () => <Badge status="success" text="Finished" />,
      },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: (_, record: { key: React.Key }) =>
        data.length >= 1 ? (
          <div>
         
          <Button type="text" onClick={()=>{setVisible(true);}}>Promote</Button>
          <Popconfirm title="Sure to refresh?" onConfirm={() => handleRefresh(record.key)}><a>Refresh</a></Popconfirm>
          <Drawer width={800} title="Configure" placement="right" visible={visible} closable={false} onClose={()=> {setVisible(false)}}>
          <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="environment"
                    placeholder="environment"
                    label="environment"
                    rules={[{ required: true, message: 'Please select environment to promote' }]}>
                    <Select placeholder="Please select environment to promote">
                      <Option value="uat">uat</Option>
                      <Option value="prod">prod</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="nexus_path"
                    label="nexus_path"
                    rules={[{ required: false, message: 'Please input nexus path' }]}
                  >
                    <Input placeholder="Please input nexus path"/>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="description"
                    label="Description"
                  >
                    <Input.TextArea rows={4} placeholder="please enter description" />
                  </Form.Item>
                </Col>
              </Row>
              <Button onClick={()=>{setVisible(false);}}>Submit</Button>
              <Button onClick={()=>{setVisible(false);}}>Cancel</Button>
            </Form>
          </Drawer>
          </div>
        ) : null,
      },
    ];
    const data = templateData;
    return <Table columns={columns} dataSource={data} pagination={false} rowSelection={{ ...rowSelection, checkStrictly }}/>;
  };
  const items = [
    { key: '1', label: 'Promote' },
    { key: '2', label: 'Refresh' },
  ];
  const columns: TableColumnsType<DataType> = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Owner', dataIndex: 'owner', key: 'creator' },
    { title: 'CreatedAt', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Action', key: 'operation', render: () => 
        <Dropdown menu={{ items }}><a>Bulk <DownOutlined /></a></Dropdown> },
  ];
  const data = subTemplateData;
 
  return (
    <Layout>
        <Content style={{ padding: '0 50px',minHeight: "85vh",background: "#fff", }}>
        <div className="Image">
            <div className="Image-header">
                <h2> Images in dev</h2>
                <Flex gap="small" wrap = "wrap" style={{ float: 'right' }}>
                <Button type="primary" > Refresh </Button></Flex>
                <Space align="center" style={{ marginBottom: 16 }}>
                    CheckStrictly: <Switch checked={checkStrictly} onChange={setCheckStrictly} />
                </Space>
                <Table
                columns={columns}
                expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
                dataSource={data}
                />
            </div>
        </div>        
        </Content>
    </Layout>
  );
};

export default Image;