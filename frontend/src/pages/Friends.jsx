import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import LinkUser from '../components/LinkUser';

function Friends() {
    const navigate = useNavigate(); // <-- ADDED THIS
    
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [friends, setFriends] = useState([]);
    const [requests, setRequests] = useState([]);
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState('');
    const [loadingSearch, setLoadingSearch] = useState(false);

    const defaultAvatar = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

    const fetchFriendsData = async () => {
        try {
            const [friendsResponse, requestsResponse] = await Promise.all([
                fetch('/api/friends', { credentials: 'include' }),
                fetch('/api/friends/requests', { credentials: 'include' })
            ]);

            if (friendsResponse.status === 401 || requestsResponse.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/Login';
                return;
            }

            const friendsData = await friendsResponse.json();
            const requestsData = await requestsResponse.json();

            if (!friendsResponse.ok) {
                setErrors([{ message: friendsData.error || 'Failed to fetch friends' }]);
                return;
            }

            if (!requestsResponse.ok) {
                setErrors([{ message: requestsData.error || 'Failed to fetch friend requests' }]);
                return;
            }

            setFriends(friendsData.friends || []);
            setRequests(requestsData.requests || []);
        } catch (error) {
            setErrors([{ message: 'Server error while loading friends' }]);
        }
    };

    const fetchSearchResults = async (username) => {
        if (!username || username.trim().length < 2) {
            setSearchResults([]);
            return;
        }

        setLoadingSearch(true);
        try {
            const response = await fetch(`/api/friends/search?username=${encodeURIComponent(username.trim())}`, {
                credentials: 'include'
            });

            if (response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/Login';
                return;
            }

            const data = await response.json();
            if (response.ok) {
                setSearchResults(data.users || []);
            } else {
                setErrors([{ message: data.error || 'Search failed' }]);
            }
        } catch (error) {
            setErrors([{ message: 'Server error while searching users' }]);
        } finally {
            setLoadingSearch(false);
        }
    };

    useEffect(() => {
        fetchFriendsData();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchSearchResults(searchValue);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchValue]);

    const handleSendFriendRequest = async (friendId) => {
        setErrors([]);
        setSuccess('');

        try {
            const response = await fetch('/api/friends/request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ friendId })
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess('Friend request sent');
                fetchSearchResults(searchValue);
                fetchFriendsData();
            } else {
                setErrors([{ message: data.error || 'Failed to send friend request' }]);
            }
        } catch (error) {
            setErrors([{ message: 'Server error while sending request' }]);
        }
    };

    const handleRequestResponse = async (friendshipId, status) => {
        setErrors([]);
        setSuccess('');

        try {
            const response = await fetch(`/api/friends/${friendshipId}/respond`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ status })
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess(status === 'accepted' ? 'Friend request accepted' : 'Friend request rejected');
                fetchSearchResults(searchValue);
                fetchFriendsData();
            } else {
                setErrors([{ message: data.error || 'Failed to update request' }]);
            }
        } catch (error) {
            setErrors([{ message: 'Server error while updating request' }]);
        }
    };

    const handleDeleteFriend = async (friendshipId) => {
        setErrors([]);
        setSuccess('');

        try {
            const response = await fetch(`/api/friends/${friendshipId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess('Friend removed successfully');
                fetchSearchResults(searchValue);
                fetchFriendsData();
            } else {
                setErrors([{ message: data.error || 'Failed to remove friend' }]);
            }
        } catch (error) {
            setErrors([{ message: 'Server error while deleting friend' }]);
        }
    };

    return (
        <main>
            <div className='overlay flex flex-col'>
                <h1 id="homeText">Friends</h1>

                {success && (
                    <div className="input_container !mb-5 !mt-5 text-center">
                        <p className='text-[#4D007E] font-bold'>{success}</p>
                    </div>
                )}

                <div className="input_container text-start">
                    {errors?.map((error, index) => (
                        <p key={index} className='text-center text-red-500 mb-2'>{error.message}</p>
                    ))}

                    <h2 className='!text-[#4D007E] !pt-0 !font-bold !uppercase'>Find players</h2>
                    <Input
                        classnameI="Input"
                        classnameL="input_label mt-4"
                        text='Search by username (min 2 chars)'
                        type="text"
                        label="Username"
                        value={searchValue}
                        set={setSearchValue}
                    />

                    {loadingSearch && <p className='text-center text-[#4D007E] font-bold mt-2'>Searching...</p>}

                    {searchResults.length > 0 && (
                        <div className='mt-4 max-h-64 overflow-y-auto bg-[#FFFADE] rounded-xl p-3 border border-[#58508D]'>
                            {searchResults.map((user) => (
                                <div key={user.id} className='flex items-center justify-between gap-3 py-2 border-b border-[#c9b3ff] last:border-0'>
                                    <div className='flex items-center gap-3'>
                                        <Link to={`/profile/${user.id}`} className='flex items-center gap-3 group'>
                                            <img
                                                src={user.avatar || defaultAvatar}
                                                alt={user.username}
                                                className='!w-10 !h-10 rounded-[50%] object-cover border-2 border-[#58508D]'
                                            />
                                            <p className='text-[#4D007E] font-bold group-hover:underline'>{user.username}</p>
                                        </Link>
                                    </div>

                                    <div>
                                        {user.status === 'none' && (
                                            <Button
                                                value="buttonP !text-sm"
                                                text="Add"
                                                action={() => handleSendFriendRequest(user.id)}
                                            />
                                        )}
                                        {user.status === 'pending' && user.requestDirection === 'outgoing' && (
                                            <p className='text-[#58508D] font-bold text-sm uppercase'>Request sent</p>
                                        )}
                                        {user.status === 'pending' && user.requestDirection === 'incoming' && (
                                            <div className='flex gap-2'>
                                                <Button
                                                    value="buttonP !text-sm !px-3"
                                                    text="Accept"
                                                    action={() => handleRequestResponse(user.friendshipId, 'accepted')}
                                                />
                                                <Button
                                                    value="buttonP !bg-red-600 !shadow-none hover:!bg-red-700 !text-sm !px-3"
                                                    text="Reject"
                                                    action={() => handleRequestResponse(user.friendshipId, 'rejected')}
                                                />
                                            </div>
                                        )}
                                        {user.status === 'accepted' && (
                                            <p className='text-[#4D007E] font-bold text-sm uppercase'>Already friends</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <hr className='w-full mx-auto my-8' style={{ borderColor: '#7972A3' }} />

                    <h2 className='!text-[#4D007E] !pt-0 !font-bold !uppercase'>Pending requests</h2>
                    {requests.length === 0 ? (
                        <p className='text-[#58508D] mt-3 font-bold'>No pending requests.</p>
                    ) : (
                        <div className='mt-3 max-h-56 overflow-y-auto bg-[#FFFADE] rounded-xl p-3 border border-[#58508D]'>
                            {requests.map((request) => (
                                <div key={request.friendshipId} className='flex items-center justify-between gap-3 py-2 border-b border-[#c9b3ff] last:border-0'>
                                    <div className='flex items-center gap-3'>
                                        <Link to={`/profile/${request.from.id}`} className='flex items-center gap-3 group'>
                                            <img
                                                src={request.from.avatar || defaultAvatar}
                                                alt={request.from.username}
                                                className='!w-10 !h-10 rounded-[50%] object-cover border-2 border-[#58508D]'
                                            />
                                            <p className='text-[#4D007E] font-bold group-hover:underline'>{request.from.username}</p>
                                        </Link>
                                    </div>
                                    <div className='flex gap-2'>
                                        <Button
                                            value="buttonP !text-sm !px-3"
                                            text="Accept"
                                            action={() => handleRequestResponse(request.friendshipId, 'accepted')}
                                        />
                                        <Button
                                            value="buttonP !bg-red-600 !shadow-none hover:!bg-red-700 !text-sm !px-3"
                                            text="Reject"
                                            action={() => handleRequestResponse(request.friendshipId, 'rejected')}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <hr className='w-full mx-auto my-8' style={{ borderColor: '#7972A3' }} />

                    <h2 className='!text-[#4D007E] !pt-0 !font-bold !uppercase'>Your friends</h2>
                    {friends.length === 0 ? (
                        <p className='text-[#58508D] mt-3 font-bold'>No friends yet.</p>
                    ) : (
                        <div className='mt-3 max-h-72 overflow-y-auto bg-[#FFFADE] rounded-xl p-3 border border-[#58508D]'>
                            {friends.map((friend) => (
                                <div key={friend.friendshipId} className='flex items-center justify-between gap-3 py-2 border-b border-[#c9b3ff] last:border-0'>
                                    <Link to={`/profile/${friend.id}`} className='flex items-center gap-3 group'>
                                        <img
                                            src={friend.avatar || defaultAvatar}
                                            alt={friend.username}
                                            className='!w-10 !h-10 rounded-[50%] object-cover border-2 border-[#58508D]'
                                        />
                                        <div>
                                            <p className='text-[#4D007E] font-bold group-hover:underline'>{friend.username}</p>
											{/* <LinkUser user={friend.username} color="text-[#4D007E] font-bold"/> */}
                                            <p className='text-[#7972A3] text-xs'>Friend since {new Date(friend.since).toLocaleDateString()}</p>
                                        </div>
                                    </Link>
                                    <div className='flex gap-2'>
                                        <Button
                                            value="buttonP !text-sm !px-3"
                                            text="Message"
                                            action={() => navigate(`/messages/${friend.id}`)}
                                        />
                                        <Button
                                            value="buttonP !bg-red-600 !shadow-none hover:!bg-red-700 !text-sm !px-3"
                                            text="Delete"
                                            action={() => handleDeleteFriend(friend.friendshipId)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default Friends;