
import { Container } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AddNewContact from '../Admin/AddNewContact';
import ContactList from '../Admin/ContactList';
import AuthorSubmittedPaper from '../Author/AuthorSubmittedPaper';
import ConferenceDetail from '../Admin/ConferenceDetail';
import { Login } from '@mui/icons-material';
import AllPapersList from '../ConferenceChair/AllPapersListView';
import BiddingSystem from '../Reviewer/BiddingSystem';

;

const Home = () => {
  const { authState: { userData, isAuth } } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
    
  }, [isAuth, navigate]);


  // todo: change the routing for different type of home account
  switch (userData.accountType) {
    case 'ADMIN':
      return <ConferenceDetail />;
    case 'AUTHOR':
      return <AuthorSubmittedPaper />;
      // todo: change reviewer home page
    case 'REVIEWER':
      return <BiddingSystem />;
    case 'CHAIR':
      return <AllPapersList />;
    default:
      return <Login/>;
  }
};

export default Home;
