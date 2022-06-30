import React, {useEffect} from 'react';
import Head from 'next/head';

import {useSelector} from "react-redux";
import { useRouter } from "next/router";
import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";

const Profile = () => {
  const router = useRouter();
  const { me } = useSelector((state) => state.user);

  if (!me) {
    router.push('/');
    return null;
  }

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로워" data={me.Followers} />
        <FollowList header="팔로잉" data={me.Followings} />
      </AppLayout>
    </>
  );
};

export default Profile;
