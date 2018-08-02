import superagent from 'superagent';
import { readCookie } from '../lib/cookieLib';

// sync action creator
const createAttachment = file => ({
  type: 'ATTACHMENT_CREATE',
  payload: file,
});

// async action creator

export default fileObj => (dispatch) => {
  const token = readCookie('Lab37ServerToken');
  // need to get model and modelId based on where the attachment is supposed to be attached
  console.log('attachment async action fileObj', fileObj);
  return superagent.post(`${API_URL}/attachments`)
    .set('Authorization', `Bearer ${token}`)
    .query({ [fileObj.model]: fileObj.modelId })
    .field('title', fileObj.title)
    .attach('attachment', fileObj.file)
    .then((response) => {
      return dispatch(createAttachment(response.body));
    });
};
