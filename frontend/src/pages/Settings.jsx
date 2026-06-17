import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

function Settings() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState('');
    
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);
    const [twoFASecret, setTwoFASecret] = useState('');
    const [twoFAQrCode, setTwoFAQrCode] = useState('');
    const [twoFACode, setTwoFACode] = useState('');
    const [show2FASetup, setShow2FASetup] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('/api/users/profile', {
                    credentials: 'include'
                });
                if (response.ok) {
                    const data = await response.json();
                    setEmail(data.user.email);
                    setUsername(data.user.username);
                    setAvatar(data.user.avatar);
                    setIs2FAEnabled(data.user.twoFactorEnabled || false);
                } else if (response.status === 401) {
                    console.log(response);
                    localStorage.removeItem("token");
                    window.location.href = '/Login';
                }
            } catch (error) {
                console.error("Failed to fetch profile", error);
            }
        };
        fetchProfile();
    }, [navigate]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setErrors([]);
        setSuccess('');
        try {
            const response = await fetch('/api/users/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, username })
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess('Profile updated successfully');
            } else {
                setErrors(data.details || [{ message: data.error }]);
            }
        } catch (error) {
            setErrors([{ message: 'Server error' }]);
        }
    };

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64String = reader.result;
            try {
                const response = await fetch('/api/users/avatar', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ avatar: base64String })
                });

                if (response.ok) {
                    setAvatar(base64String);
                    setSuccess('Avatar updated successfully');
                } else {
                    const data = await response.json();
                    setErrors([{ message: data.error }]);
                }
            } catch (error) {
                setErrors([{ message: 'Failed to upload avatar' }]);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setErrors([]);
        setSuccess('');

        if (newPassword !== confirmNewPassword) {
            setErrors([{ field: 'confirmPassword', message: 'Passwords do not match' }]);
            return;
        }

        try {
            const response = await fetch('/api/users/password', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ currentPassword, newPassword })
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess('Password updated successfully');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
            } else {
                setErrors(data.details || [{ message: data.error }]);
            }
        } catch (error) {
            setErrors([{ message: 'Server error' }]);
        }
    };

    const handleSetup2FA = async () => {
        setErrors([]);
        setSuccess('');
        try {
            const response = await fetch('/api/auth/2fa/setup', {
                method: 'POST',
                credentials: 'include'
            });
            const data = await response.json();
            if (response.ok) {
                setTwoFASecret(data.secret);
                setTwoFAQrCode(data.qrCode);
                setShow2FASetup(true);
            } else {
                setErrors([{ message: data.error || 'Failed to setup 2FA' }]);
            }
        } catch (error) {
            setErrors([{ message: 'Server error' }]);
        }
    };

    const handleEnable2FA = async (e) => {
        e.preventDefault();
        setErrors([]);
        setSuccess('');
        try {
            const response = await fetch('/api/auth/2fa/enable', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ code: twoFACode })
            });
            const data = await response.json();
            if (response.ok) {
                setIs2FAEnabled(true);
                setShow2FASetup(false);
                setTwoFACode('');
                setSuccess('2FA enabled successfully');
            } else {
                setErrors([{ message: data.error || 'Invalid 2FA code' }]);
            }
        } catch (error) {
            setErrors([{ message: 'Server error' }]);
        }
    };

    const handleDisable2FA = async (e) => {
        e.preventDefault();
        setErrors([]);
        setSuccess('');
        try {
            const response = await fetch('/api/auth/2fa/disable', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ code: twoFACode })
            });
            const data = await response.json();
            if (response.ok) {
                setIs2FAEnabled(false);
                setTwoFACode('');
                setSuccess('2FA disabled successfully');
            } else {
                setErrors([{ message: data.error || 'Invalid 2FA code' }]);
            }
        } catch (error) {
            setErrors([{ message: 'Server error' }]);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const response = await fetch('/api/users', {
                method: 'DELETE',
                credentials: 'include'
            });

            if (response.ok) {
                localStorage.removeItem('token');
                window.location.href = '/Login';
            } else {
                const data = await response.json();
                setErrors([{ message: data.error }]);
            }
        } catch (error) {
            setErrors([{ message: 'Failed to delete account' }]);
        }
    };

    return (
        <main>
            <div className='overlay flex flex-col'>
                <h1 id="homeText">Settings</h1>
                
                {success && (
                    <div className="input_container !mb-5 !mt-5 text-center">
                        <p className='text-[#4D007E] font-bold'>{success}</p>
                    </div>
                )}
                
                <div className="input_container text-start">
                    <div className="flex flex-col items-center mb-5">
                        <div 
                            className="w-24 h-24 rounded-[50%] border-4 border-[#58508D] mb-3 overflow-hidden bg-[#FFFADE] flex items-center justify-center cursor-pointer"
                            onClick={() => document.getElementById('avatar-upload').click()}
                        >
                            {avatar ? (
                                <img src={avatar} alt="Avatar" className="!w-full !h-full object-cover rounded-[50%]" />
                            ) : (
                                <img 
                                    src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" 
                                    alt="Default Avatar" 
                                    className="!w-full !h-full object-cover rounded-[50%]" 
                                />
                            )}
                        </div>
                        <input 
                            id="avatar-upload" 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleAvatarChange} 
                        />
                        <p className="text-[#4D007E] text-xs font-bold uppercase">Click to change avatar</p>
                    </div>

                    {errors?.filter(error => !error.field).map((error, index) => (
                        <p key={index} className='text-center text-red-500 mb-2'>{error.message}</p>
                     ))}
                    <form onSubmit={handleUpdateProfile}>
                        <Input 
                            classnameI="Input" 
                            classnameL="input_label mt-5" 
                            text='Email@email.com' 
                            type="email" 
                            label="Email Address" 
                            value={email} 
                            set={setEmail} 
                        />
                        {errors?.filter(error => error.field === "email").map((error, index) => (
                            <p key={index} className='text-center text-red-500'>{error.message}</p>
                        ))}
                        
                        <Input 
                            classnameI="Input" 
                            classnameL="input_label mt-5" 
                            text='Username' 
                            type="text" 
                            label="Username" 
                            value={username} 
                            set={setUsername} 
                        />
                        {errors?.filter(error => error.field === "username").map((error, index) => (
                            <p key={index} className='text-center text-red-500'>{error.message}</p>
                        ))}
                        
                        <div className="flex px-2 items-center mt-5 justify-center gap-10">
                            <Button value="buttonP !pl-18 !pr-18" type="submit" text="Save Profile" />
                        </div>
                    </form>

                    <hr className='w-full mx-auto my-10' style={{ borderColor: '#7972A3' }} />
                    
                    <form onSubmit={handleUpdatePassword}>
                        <Input 
                            classnameI="Input" 
                            classnameL="input_label mt-5" 
                            text='Current Password' 
                            type="password" 
                            label="Current Password" 
                            value={currentPassword} 
                            set={setCurrentPassword} 
                        />
                        <Input 
                            classnameI="Input" 
                            classnameL="input_label mt-5" 
                            text='New Password' 
                            type="password" 
                            label="New Password" 
                            value={newPassword} 
                            set={setNewPassword} 
                        />
                        {errors?.filter(error => error.field === "newPassword").map((error, index) => (
                            <p key={index} className='text-center text-red-500'>{error.message}</p>
                        ))}
                        <Input 
                            classnameI="Input" 
                            classnameL="input_label mt-5" 
                            text='Confirm New Password' 
                            type="password" 
                            label="Confirm New Password" 
                            value={confirmNewPassword} 
                            set={setConfirmNewPassword} 
                        />
                        {errors?.filter(error => error.field === "confirmPassword" || (!error.field && error.message.includes("password"))).map((error, index) => (
                            <p key={index} className='text-center text-red-500'>{error.message}</p>
                        ))}
                        <div className="flex px-2 items-center mt-5 justify-center gap-10">
                            <Button value="buttonP !pl-18 !pr-18" type="submit" text="Change Password" />
                        </div>
                    </form>

                    <hr className='w-full mx-auto my-10' style={{ borderColor: '#7972A3' }} />

                    <div className="flex flex-col items-center">
                        <h3 className="input_label mb-3 font-bold text-lg">Two-Factor Authentication (2FA)</h3>
                        
                        {!is2FAEnabled && !show2FASetup && (
                            <Button 
                                value="buttonP !pl-10 !pr-10" 
                                text="Setup 2FA" 
                                action={handleSetup2FA} 
                            />
                        )}

                        {!is2FAEnabled && show2FASetup && (
                            <div className="flex flex-col items-center gap-4 w-full">
                                {twoFAQrCode && (
                                    <img src={twoFAQrCode} alt="2FA QR Code" className="!w-48 !h-48 border-4 border-[#58508D] p-2 bg-white object-contain" />
                                )}
                                {twoFASecret && (
                                    <p className="text-xs text-[#4D007E] font-mono bg-[#FFFADE] p-2 rounded">
                                        Secret: {twoFASecret}
                                    </p>
                                )}
                                <form onSubmit={handleEnable2FA} className="w-full">
                                    <Input 
                                        classnameI="Input" 
                                        classnameL="input_label mt-2" 
                                        text='6-digit code' 
                                        type="text" 
                                        label="Enter Verification Code" 
                                        value={twoFACode} 
                                        set={setTwoFACode} 
                                    />
                                    <div className="flex px-2 items-center mt-5 justify-center gap-4">
                                        <Button value="buttonP !pl-6 !pr-6" type="submit" text="Verify & Enable" />
                                        <Button value="buttonP !bg-gray-500 !pl-6 !pr-6" text="Cancel" action={() => setShow2FASetup(false)} />
                                    </div>
                                </form>
                            </div>
                        )}

                        {is2FAEnabled && (
                            <div className="w-full flex flex-col items-center">
                                <p className="text-green-600 font-bold mb-4 uppercase text-sm">2FA is currently active</p>
                                <form onSubmit={handleDisable2FA} className="w-full">
                                    <Input 
                                        classnameI="Input" 
                                        classnameL="input_label" 
                                        text='6-digit code' 
                                        type="text" 
                                        label="Enter code to disable 2FA" 
                                        value={twoFACode} 
                                        set={setTwoFACode} 
                                    />
                                    <div className="flex px-2 items-center mt-5 justify-center">
                                        <Button value="buttonP !bg-red-600 hover:!bg-red-700 !pl-10 !pr-10" type="submit" text="Disable 2FA" />
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>

                    <hr className='w-full mx-auto my-10' style={{ borderColor: '#7972A3' }} />

                    <div className="flex flex-col items-center">
                        {!showDeleteConfirm ? (
                            <Button 
								value="buttonP !bg-red-600 hover:!bg-red-700 !pl-10 !pr-10"
                                text="Delete Account" 
                                action={() => setShowDeleteConfirm(true)} 
                            />
                        ) : (
                            <div className="flex flex-col items-center gap-3">
                                <p className="text-red-600 font-bold uppercase text-sm">Are you absolutely sure?</p>
                                <div className="flex gap-4">
                                    <Button 
                                        value="buttonP !bg-red-600 !pl-6 !pr-6" 
                                        text="Yes, Delete" 
                                        action={handleDeleteAccount} 
                                    />
                                    <Button 
                                        value="buttonP !bg-gray-500 !pl-6 !pr-6" 
                                        text="Cancel" 
                                        action={() => setShowDeleteConfirm(false)} 
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Settings;