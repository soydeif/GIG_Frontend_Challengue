import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { ContactForm } from '@/components/ContactForm/ContactForm';
import { ContactList } from '@/components/ContactList/ContactList';
import '@/styles/global.css';
import { Header } from '@/components/Header/Header';
import { useContacts } from '@hooks/useContacts';

const AppContent = () => {
  const location = useLocation();
  const history = useHistory();
  const { contacts, loading } = useContacts();

  useEffect(() => {
    console.log("Cambio en el historial detectado:", location.pathname);

    if (location.pathname.includes("/edit/") && !loading) {
      const id = location.pathname.split("/").pop();
      const contactExists = contacts.some(contact => contact.id === id);
      if (!contactExists) {
        history.push("/");
      }
    }
  }, [location, contacts, loading, history]);

  if (loading) return <p>Loading contacts...</p>;

  return (
    <Switch>
      <Route exact path="/" component={ContactList} />
      <Route path="/add" component={ContactForm} />
      <Route path="/edit/:id" component={ContactForm} />
    </Switch>
  );
};

export const App = () => {
  return (
    <>
      <Header />
      <Router>
        <AppContent />
      </Router>
    </>
  );
};
