import { useState, useRef, ChangeEvent } from 'react';
import './components.css'
const ProfileNavbar = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState<string>(''); // Initial user name
  const [userImage, setUserImage] = useState<string | null>(
    '/chefewa.jpg'
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setUserImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Save user's name and image (you can implement this logic)
    setIsEditing(false);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex items-center">
      <button
        className="profile-button" // Use your own CSS class
        onClick={toggleEditing}
      >
        PROFILE
      </button>
      <div className="profile-info"> {/* Use your own CSS class */}
        {isEditing ? (
          <div>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={handleImageChange}
              ref={inputRef}
            />
            <button className="save-button" onClick={handleSave}>Save</button>
          </div>
        ) : (
          <div onClick={toggleEditing}>
            <p>{userName}</p>
            <img
              src={userImage || ''}
              alt="Profile"
              width="50"
              height="50"
              onClick={() => inputRef.current?.click()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileNavbar;
