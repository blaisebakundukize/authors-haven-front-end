/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import Layout from '../../layouts/Layout';
import defaultAvatar from '../../../assets/Images/avatar.svg';
import PageNotFound from '../../NotFound';
import './Followers.scss';

class Following extends Component {
  render() {
    const {
      profile: { profile, followers, following }
    } = this.props;
    let followingArray = null;
    if (following !== null) followingArray = following.following;
    return (
      <Layout>
        <section class="profile-section">
          <div class="user-profile">
            <div class="user-infos">
              <div class="avatar">
                <img
                  src={profile !== null && profile.image !== null ? profile.image : defaultAvatar}
                  alt=""
                />
              </div>
              <div class="information">
                <h5> {profile !== null && profile.username}</h5>
                <h5>{profile !== null && profile.email}</h5>
                <div class="stars">
                  <i class="far fa-star" />
                  <i class="far fa-star" />
                  <i class="far fa-star" />
                  <i class="far fa-star" />
                  <i class="far fa-star" />
                </div>
              </div>
              <div class="bio">{profile !== null && profile.bio}</div>
              <div class="usernumber-followers">
                <div>
                  <Link to="/profile/followers">
                    {followers !== null && followers.numberOfFollowers} Followers
                  </Link>
                </div>
                <div>
                  <Link to="/profile/following">
                    {following !== null && following.numberOfFollowing} Following
                  </Link>
                </div>
              </div>
            </div>
            <div class="user-articles">
              <div class="pro-article-title">My following.</div>
              <div class="user-blog">
                {followingArray !== null
                && followingArray !== undefined
                && followingArray.length > 0 ? (
                    followingArray.map(myfollowing => (
                    <div class="people-follower">
                      <div class="follower-img">
                        <img
                          src={
                            myfollowing.userFkey.image
                              ? myfollowing.userFkey.image
                              : defaultAvatar
                          }
                          alt=""
                        />
                      </div>
                      <div class="follow-info">
                        <h3>{myfollowing.userFkey.username}</h3>
                        <span>{myfollowing.userFkey.email}</span>
                      </div>
                    </div>
                    ))
                  ) : (
                  <center>
                    <PageNotFound error="Sorry, currently you are not following any one" />
                  </center>
                  )}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

Following.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(Following);
