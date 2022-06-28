import React from 'react';
import Head from 'next/head';

import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";

const Profile = () => {
  const followingList = [{ nickname: '제리' }, { nickname: '베러댐' }, { nickname: '리미' }]
  const followerList = [{ nickname: '제리' }, { nickname: '베러댐' }, { nickname: '리미' }]

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로워 목록" data={followerList} />
        <FollowList header="팔로잉 목록" data={followingList} />
      </AppLayout>
    </>
  )
}

export default Profile;