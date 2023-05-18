
import { Container } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AddNewContact from '../Admin/AddNewContact';
import ContactList from '../Admin/ContactList';
import AuthorSubmittedPaper from '../Author/AuthorSubmittedPaper';
import ConferenceDetail from '../Admin/ConferenceDetail';
import Login from '../Login/Login';
import AllPapersList from '../ConferenceChair/AllPapersListView';
import BiddingSystem from '../Reviewer/BiddingSystem';
import ReviewerAllocatedPaper from '../Reviewer/ReviewerAllocatedPaper';

const Home = () => {
  const { authState, setAuthState } = useAuth();
  const userData = authState.userData
  const navigate = useNavigate();
  useEffect(() => {
    if (!authState.isAuth) {
      navigate('/login');
    }
  }, []);

  // todo: change the routing for different type of home account
  switch (userData.accountType) {
    case 'ADMIN':
      return <ConferenceDetail />;
    case 'AUTHOR':
      return <AuthorSubmittedPaper />;
    // todo: change reviewer home page
    case 'REVIEWER':
      return <ReviewerAllocatedPaper />;
    case 'CHAIR':
      return <AllPapersList />;
    default:
      navigate('/login')
      return <Login></Login>;
  }
};

export default Home;
