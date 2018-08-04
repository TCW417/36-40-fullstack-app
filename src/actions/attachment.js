import superagent from 'superagent';
import { readCookie } from '../lib/cookieLib';

// sync action creator
const createAttachment = file => ({
  type: 'ATTACHMENT_CREATE',
  payload: file,
});

// async action creator

const createAttachmentApiRequest = fileObj => (dispatch) => {
  const token = readCookie('Lab37ServerToken');
  
  return superagent.post(`${API_URL}/attachments`)
    .set('Authorization', `Bearer ${token}`)
    .withCredentials()
    .query({ [fileObj.model]: fileObj.modelId.trim(), desc: fileObj.desc })
    .field('desc', fileObj.desc)
    .field('filename', fileObj.filename)
    .attach('attachment', fileObj.file)
    .then((response) => {
      return dispatch(createAttachment(response.body));
    });
};

const fetchAttachmentApiRequest = id => (dispatch) => {
  const token = readCookie('Lab37ServerToken');
  
  return superagent.get(`${API_URL}/attachments`)
    .set('Authorization', `Bearer ${token}`)
    .withCredentials()
    .query({ id })
    .then((response) => {
      return dispatch(createAttachment(response.body));
    });
};

export { createAttachmentApiRequest, fetchAttachmentApiRequest };
