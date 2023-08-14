import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import BaseForm from './components/BaseForm/BaseForm';
import Section from './utils/Section/Section';
import HeaderSection from './components/HeaderSection/HeaderSection';
import ListContacts from './components/ListContacts/ListContacts';
import QuickSearch from './components/QuickSearch/QuickSearch';
import { contactsdb } from './utils/contacts';

class App extends Component {
  state = {
    contacts: [],
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

  inputHandler = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
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

  componentDidMount() {
    
    if (localStorage.getItem('contacts')) {
      this.setState({ contacts: JSON.parse(localStorage.getItem('contacts')) });
    } else {
      localStorage.setItem('contacts', JSON.stringify(contactsdb));
    }
  }

  componentDidUpdate(_, pervState) {
    if (this.state.contacts !== pervState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

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
