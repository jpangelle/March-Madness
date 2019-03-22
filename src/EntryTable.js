import React from 'react';
import { Table } from 'antd';
import './styles.scss';

const columns = [
  {
    title: 'Name',
    dataIndex: 'entryName',
  },
  {
    title: 'Day 1',
    dataIndex: 'teams[0]',
  },
  {
    title: 'Day 2',
    dataIndex: 'teams[1]',
  },
  // {
  //   title: 'Day 3',
  //   dataIndex: 'teams[2]',
  // },
  // {
  //   title: 'Day 4',
  //   dataIndex: 'teams[3]',
  // },
  // {
  //   title: 'Day 5',
  //   dataIndex: 'teams[4]',
  //   key: 'day5',
  // },
  // {
  //   title: 'Day 6',
  //   dataIndex: 'teams[5]',
  //   key: 'day6',
  // },
  // {
  //   title: 'Day 7',
  //   dataIndex: 'teams[6]',
  //   key: 'day7',
  // },
  // {
  //   title: 'Day 8',
  //   dataIndex: 'teams[7]',
  //   key: 'day8',
  // },
  // {
  //   title: 'Day 9',
  //   dataIndex: 'teams[8]',
  //   key: 'day9',
  // },
  // {
  //   title: 'Day 10',
  //   dataIndex: 'teams[9]',
  //   key: 'day10',
  // }
];

export default props => {
  return (
    <Table
      rowKey={entry => entry.uniqueID}
      rowClassName={entry => {
        return entry.status ? 'in' : 'out';
      }}
      className="table-column"
      columns={columns}
      dataSource={props.data}
      pagination={{ pageSize: 315 }}
    />
  );
};
