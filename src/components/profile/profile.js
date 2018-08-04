import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as profileActions from '../../actions/profile';
// import createAttachmentApiRequest from '../../actions/attachment';
import { createAttachmentApiRequest, fetchAttachmentApiRequest } from '../../actions/attachment';
import * as routes from '../../lib/routes';

import ProfileForm from '../profile-form/profile-form';
import AttachmentForm from '../attachment-form/attachment-form';
import AttachmentList from '../attachment-list/attachment-list';

const mapStateToProps = store => ({
  profile: store.profile,
  attachments: store.attachments,
});

const mapDispatchToProps = dispatch => ({
  createProfile: profile => dispatch(profileActions.createProfile(profile)),
  updateProfile: profile => dispatch(profileActions.updateProfile(profile)), 
  fetchProfile: () => dispatch(profileActions.fetchProfile()),
  createAttachment: file => dispatch(createAttachmentApiRequest(file)),
  fetchAttachment: attachmentId => dispatch(fetchAttachmentApiRequest(attachmentId)),
});

class Profile extends React.Component {
  constructor(props) {
    super(props);
    // this is UI state
    this.state = {
      editing: false,
      profile: props.profile || null,
    };
  }

  // lifecycle hook from React itself
  // TODO: resolve this flash of content
  componentDidMount() {
    this.props.fetchProfile()
      .then((response) => {
        // if response isn't empty, retrieve any attachments
        const promises = [];
        if (response) {
          for (let i = 0; i < response.payload.attachments.length; i++) {
            promises.push(this.props.fetchAttachment(response.payload.attachments[i]));
          }
        }
        return Promise.all(promises);
      })
      .catch(console.error);
  }

  handleCreate = (profile) => {
    this.props.createProfile(profile)
      .then(() => {
        // The profile has been created, we inform/interact with the user
        // this.props.history.push(routes.DASHBOARD_ROUTE);
        this.props.history.push(routes.PROFILE_ROUTE);
      });
  }

  handleUpdate = (profile) => {
    // TODO: add validation, i.e. catch blocks
    this.props.updateProfile(profile);
    this.setState({ editing: false });
  }

  renderJSX = (profile) => {
    let JSXEditing = null;
    let JSXDisplay = null;
    let JSXProfile = null;
    if (profile) {
      JSXEditing = // eslint-disable-line
        <div>
          <ProfileForm profile={ profile } onComplete={ this.handleUpdate }/>
          <button onClick={() => this.setState({ editing: false })}>Cancel</button>
        </div>;

      JSXDisplay = // eslint-disable-line
      <div>
        <h2>About { profile.firstName }</h2>
        <img src={ profile.profileImageUrl } />
        <p>{ profile.bio }</p>
        <p>My location is { profile.location }</p>
        <button data-cy="edit-profile" onClick={() => this.setState({ editing: true })}>Edit</button>
      </div>;

      JSXProfile = // eslint-disable-line
      <div>
        <h2>{ `${profile.firstName} ${profile.lastName}` }</h2>
        { this.state.editing ? JSXEditing : JSXDisplay }
        { this.state.editing ? '' : <AttachmentForm onComplete={ this.props.createAttachment } model="profile" modelId={this.props.profile._id} /> }
        { this.state.editing ? '' : <AttachmentList parentId={this.props.profile._id} /> }
      </div>;
      
      return JSXProfile;
    }
    return undefined;
  }

  render() {
    const { profile } = this.props;
    return (
      <div className="profile">
        <h1>Profile</h1>
        { profile ? this.renderJSX(profile) : <ProfileForm onComplete={ this.handleCreate }/>}
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object,
  createProfile: PropTypes.func,
  updateProfile: PropTypes.func,
  fetchProfile: PropTypes.func,
  fetchAttachment: PropTypes.func,
  createAttachment: PropTypes.func,
  history: PropTypes.object,
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
