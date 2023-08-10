import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import BaseForm from './components/BaseForm/BaseForm';
import Section from './utils/Section/Section';
import HeaderSection from './components/HeaderSection/HeaderSection';
import ListContacts from './components/ListContacts/ListContacts';
import QuickSearch from './components/QuickSearch/QuickSearch';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = data => {
    const contacts = this.state.contacts;
    const isExists = contacts.some(({ name }) => {
      return name === data.name;
    });
    if (isExists) {
      alert(`Looks like ${data.name} is already in contacts.`);

      return;
    }

    this.setState(pervState => {
      return {
        contacts: [
          ...pervState.contacts,
          { id: nanoid(), name: data.name, number: data.number },
        ],
      };
    });
  };

  filterFn = () => {
    const contacts = this.state.contacts;
    return contacts.filter(({ name }) => {
      return name.toLowerCase().includes(this.state.filter.toLowerCase());
    });
  };

  deleteContact = id => {
    this.setState(pervState => {
      return {
        contacts: pervState.contacts.filter(item => {
          return item.id !== id;
        }),
      };
    });
  };

  render() {
    return (
      <>
        <HeaderSection />
        <Section title="Add New Contact">
          <BaseForm addContact={this.addContact} />
        </Section>
        <Section title="Contacts">
          <QuickSearch fnInput={this.inputHandler} />
          <ListContacts
            contacts={this.filterFn()}
            deleteContact={this.deleteContact}
          />
        </Section>
      </>
    );
  }
}

export default App;
