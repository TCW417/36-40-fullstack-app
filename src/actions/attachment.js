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
  const thisQuery = {};
  thisQuery[fileObj.model] = fileObj.modelId;
  if (fileObj.desc !== '') thisQuery.desc = fileObj.desc;
  return superagent.post(`${API_URL}/attachments`)
    .set('Authorization', `Bearer ${token}`)
    .withCredentials()
    .query(thisQuery)
    // .field('desc', fileObj.desc)
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
