import React from 'react';
import { Table } from 'antd';

export default ({ day, pickCount }) => {
  const columns = pickCount.map(item => {
    return {
      title: item.teamName,
      dataIndex: item.teamName,
      key: item.teamName,
    };
  });

  const counts = {};

  pickCount.forEach(item => {
    counts[item.teamName] = item.count;
  });

  const dataSource = [
    {
      key: '1',
      ...counts,
    },
  ];

  return (
    <div>
      <h2>Pick Counts for Day {day}</h2>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={{ x: true }}
      />
    </div>
  );
};
