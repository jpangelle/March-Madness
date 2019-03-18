import React from 'react';
import { Button, Modal } from 'antd';

export default ({ aboutModalStatus, handleCloseModal }) => {
  return (
    <Modal
      title="About this site"
      visible={aboutModalStatus}
      onCancel={handleCloseModal}
      footer={[
        <Button key="close" onClick={handleCloseModal}>
          Close
        </Button>,
      ]}
    >
      <p>
        This March Madness survival pool is all in good fun and money will be
        donated to United Way. This website has no affiliation with the NCAA or
        CBS.
      </p>
    </Modal>
  );
};
