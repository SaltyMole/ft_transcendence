import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';

function Profile() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [currentUserId, setCurrentUserId] = useState('');
  const [friends, setFriends] = useState([]);
  const [stats, setStats] = useState(null);
  const [online, setOnline] = useState(null);
  const [friendship, setFriendship] = useState(null);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  const defaultAvatar = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
  const isSelfProfile = userId === 'me' || (currentUserId && profile?.id === currentUserId);

  const loadProfile = async () => {
    setLoading(true);
    setErrors([]);

    try {
      const currentUserRes = await fetch('/api/users/profile', { credentials: 'include' });

      if (currentUserRes.status === 401) {
        localStorage.removeItem('token');
        navigate('/Login');
        return;
      }

      const currentUserData = await currentUserRes.json();
      const currentUser = currentUserData.user || currentUserData;
      const resolvedIsSelf = userId === 'me' || userId === currentUser.id;
      const targetUserId = resolvedIsSelf ? currentUser.id : userId;

      setCurrentUserId(currentUser.id);

      const [profileRes, friendsRes, statsRes, statusRes] = await Promise.all([
        resolvedIsSelf
          ? Promise.resolve({ ok: true, json: async () => ({ user: currentUser }) })
          : fetch(`/api/users/${targetUserId}/profile`, { credentials: 'include' }),
        resolvedIsSelf
          ? fetch('/api/friends', { credentials: 'include' })
          : fetch(`/api/users/${targetUserId}/friends`, { credentials: 'include' }),
        fetch(`/api/users/${targetUserId}/stats`, { credentials: 'include' }),
        fetch(`/api/users/${targetUserId}/status`, { credentials: 'include' }),
      ]);

      if ([profileRes, friendsRes, statsRes, statusRes].some((response) => response.status === 401)) {
        localStorage.removeItem('token');
        navigate('/Login');
        return;
      }

      const profileData = resolvedIsSelf ? { user: currentUser } : await profileRes.json();
      const friendsData = await friendsRes.json();
      const statsData = await statsRes.json();
      const statusData = await statusRes.json();

      if (!profileRes.ok) {
        setErrors([{ message: profileData.error || 'Failed to load profile' }]);
        return;
      }

      setProfile(profileData.user || profileData);
      setFriends(friendsData.friends || []);
      setStats(resolvedIsSelf ? profileData.user : statsData.stats || null);
      setOnline(resolvedIsSelf ? true : statusData.online ?? null);

      if (!resolvedIsSelf) {
        const friendsResponse = await fetch('/api/friends', { credentials: 'include' });
        if (friendsResponse.ok) {
          const myFriendsData = await friendsResponse.json();
          const existingFriendship = myFriendsData.friends?.find((friend) => friend.id === (profileData.user?.id || profileData.id));
          setFriendship(existingFriendship || null);
        }
      } else {
        setFriendship({ self: true });
      }
    } catch (error) {
      console.error('Profile load error:', error);
      setErrors([{ message: 'Failed to load profile' }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [userId]);

  const handleAddFriend = async () => {
    if (!profile?.id || isSelfProfile) return;

    try {
      const response = await fetch('/api/friends/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ friendId: profile.id }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess('Friend request sent');
        loadProfile();
      } else {
        setErrors([{ message: data.error || 'Failed to send friend request' }]);
      }
    } catch (error) {
      setErrors([{ message: 'Server error while sending friend request' }]);
    }
  };

  const handleRemoveFriend = async () => {
    if (!friendship?.friendshipId) return;

    try {
      const response = await fetch(`/api/friends/${friendship.friendshipId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(data.message || 'Friend removed successfully');
        loadProfile();
      } else {
        setErrors([{ message: data.error || 'Failed to remove friend' }]);
      }
    } catch (error) {
      setErrors([{ message: 'Server error while removing friend' }]);
    }
  };

  if (loading) {
    return (
      <main>
        <div className='overlay flex flex-col'>
          <h1 id='homeText'>Profile</h1>
          <div className='input_container !max-w-[900px] w-[92%] text-center'>
            <p className='text-[#4D007E] font-bold text-xl'>Loading profile...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main>
        <div className='overlay flex flex-col'>
          <h1 id='homeText'>Profile</h1>
          <div className='input_container !max-w-[900px] w-[92%] text-center'>
            {errors.map((error, index) => (
              <p key={index} className='text-red-500 font-bold'>{error.message}</p>
            ))}
          </div>
        </div>
      </main>
    );
  }

  const isFriend = Boolean(friendship?.friendshipId);

  return (
    <main>
      <div className='overlay flex flex-col'>
        <h1 id='homeText'>Profile</h1>

        <div className='input_container !max-w-[900px] w-[92%] text-start'>
          <div className='flex flex-col lg:flex-row gap-6 items-center lg:items-start'>
            <div className='flex flex-col items-center lg:items-start gap-3 shrink-0'>
              <img
                src={profile.avatar || defaultAvatar}
                alt={profile.username}
                className='!w-28 !h-28 rounded-[50%] object-cover border-4 border-[#58508D]'
              />
              <p className='text-[#7972A3] text-xs uppercase font-bold tracking-[0.2em] text-center lg:text-left'>
                {isSelfProfile ? 'Your profile' : 'Player profile'}
              </p>
            </div>

            <div className='flex-1 w-full'>
              <div className='flex flex-col gap-4'>
                <div>
                  <p className='text-[#7972A3] text-xs uppercase font-bold tracking-[0.2em]'>Player</p>
                  <h2 className='!text-[#4D007E] !pt-0 !mt-1 !text-[clamp(2rem,4vw,3.5rem)] !font-black !leading-none'>
                    {profile.username}
                  </h2>
                  <p className='text-[#58508D] font-bold mt-2'>
                    {isSelfProfile ? 'Your profile and social links.' : 'Public profile and social links.'}
                  </p>
                </div>

                <div className='flex flex-wrap gap-3'>
                  {isSelfProfile ? (
                    <Button value='buttonP' text='Edit profile' action={() => navigate('/Settings')} />
                  ) : isFriend ? (
                    <>
                      <Button value='buttonP' text='Message' action={() => navigate(`/messages/${profile.id}`)} />
                      <Button value='buttonP !bg-red-600 hover:!bg-red-700' text='Remove friend' action={handleRemoveFriend} />
                    </>
                  ) : (
                    <Button value='buttonP' text='Add friend' action={handleAddFriend} />
                  )}
                </div>

                {(success || errors.length > 0) && (
                  <div className='mt-1'>
                    {success && <p className='text-[#4D007E] font-bold'>{success}</p>}
                    {errors.map((error, index) => (
                      <p key={index} className='text-red-500 font-bold'>{error.message}</p>
                    ))}
                  </div>
                )}

                <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                  <div className='bg-[#FFFADE] border border-[#58508D] rounded-xl p-4 text-center'>
                    <p className='text-[#7972A3] text-sm uppercase font-bold'>Status</p>
                    <p className='text-[#4D007E] font-bold mt-2'>{online ? 'Online' : 'Offline'}</p>
                  </div>
                  <div className='bg-[#FFFADE] border border-[#58508D] rounded-xl p-4 text-center'>
                    <p className='text-[#7972A3] text-sm uppercase font-bold'>Friends</p>
                    <p className='text-[#4D007E] font-bold mt-2'>{stats?.friendCount ?? friends.length}</p>
                  </div>
                  <div className='bg-[#FFFADE] border border-[#58508D] rounded-xl p-4 text-center'>
                    <p className='text-[#7972A3] text-sm uppercase font-bold'>Games</p>
                    <p className='text-[#4D007E] font-bold mt-2'>{stats?.gamesPlayed ?? 0}</p>
                  </div>
                  <div className='bg-[#FFFADE] border border-[#58508D] rounded-xl p-4 text-center'>
                    <p className='text-[#7972A3] text-sm uppercase font-bold'>Wins</p>
                    <p className='text-[#4D007E] font-bold mt-2'>{stats?.wins ?? 0}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='input_container !max-w-[900px] w-[92%] text-start'>
          <h2 className='!text-[#4D007E] !pt-0 !font-bold !uppercase'>Friends of {profile.username}</h2>
          {friends.length === 0 ? (
            <p className='text-[#58508D] font-bold mt-3'>No friends to show.</p>
          ) : (
            <div className='mt-3 grid gap-3 md:grid-cols-2'>
              {friends.map((friend) => (
                <Link key={friend.friendshipId} to={`/profile/${friend.id}`} className='flex items-center gap-3 bg-[#FFFADE] rounded-xl p-3 border border-[#58508D]'>
                  <img
                    src={friend.avatar || defaultAvatar}
                    alt={friend.username}
                    className='!w-10 !h-10 rounded-[50%] object-cover border-2 border-[#58508D]'
                  />
                  <div>
                    <p className='text-[#4D007E] font-bold group-hover:underline'>{friend.username}</p>
                    <p className='text-[#7972A3] text-xs'>Friend since {new Date(friend.since).toLocaleDateString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Profile;