import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ContactForm } from '@/components/ContactForm/ContactForm';
import { ContactList } from '@/components/ContactList/ContactList';
import '@/styles/global.css';
import { Header } from '@/components/Header/Header';

export const App = () => {
  return (
    <div>
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" component={ContactList} />
          <Route path="/add" component={ContactForm} />
          <Route path="/edit/:id" component={ContactForm} />
        </Switch>
      </Router>
    </div>
  );
};
