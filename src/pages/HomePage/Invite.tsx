import React, { useState, useEffect } from 'react';
import { auth, db } from '../Firebase/firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import Invite_Style from './Invite.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  displayName: string;
  email:string;
  // Add other properties as needed
}

function Invite() {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [userData, setUserData] = useState<any>({});
    const currentUser = auth.currentUser;
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchData = async () => {
        if (currentUser) {
          try {
            const userDocRef = doc(db, 'users', currentUser.uid);
            const docSnapshot = await getDoc(userDocRef);
            if (docSnapshot.exists()) {
              setUserData(docSnapshot.data());
            } else {
              console.log('User data not found.');
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        }
      };
  
      fetchData();
    }, [currentUser]);
  
    const handleSearch = async () => {
      try {
        const q = query(collection(db, 'users'), where('email', '==', searchText));
        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as User[];
        setSearchResults(results);
      } catch (error) {
        console.error('Error searching users:', error);
      }
    };
  
    const handleRedictMainPage = () => {
      navigate('/setting/profile');
    };
  
    return (
      <div>
        <input
          type="text"
          placeholder="Find a user"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className={Invite_Style.search}
        />
        <FontAwesomeIcon
          icon={faPlus}
          className={Invite_Style.plusIconStyle}
          onClick={handleSearch}
        />
       
  
        {/* Conditional rendering for search results */}
        {searchResults.length > 0 && (
          <div className={Invite_Style.searchResults}>
            {/* Display search results here */}
          </div>
        )}
        {!searchResults.length && <p>No display user</p>}
      </div>
    );
  }
  
  export default Invite;
  
