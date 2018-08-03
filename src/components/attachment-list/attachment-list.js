import React from 'react';
import { connect } from 'react-redux';
import './attachment-list.scss';

const mapStateToProps = state => ({
  attachments: state.attachments,
});

// AccountList
const AttachmentList = (props) => {
  const { attachments, parentId } = props;

  if (!attachments || !attachments.length) return null;

  return attachments.filter(a => a.parentId === parentId)
    .map(a => <div key={ a._id} ><img className="thumbnail" src={a.url}/><span className="thumbnail-filename">{a.originalName}</span><span className="thumbnail-desc">{a.description}</span></div>);
};

export default connect(mapStateToProps)(AttachmentList);
