import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './BaseForm.module.css';

export default class BaseForm extends Component {
  state = {
    name: '',
    number: '',
  };

  inputHandler = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.addContact(this.state);
    this.setState({ name: '', number: '' });
  }

  render() {
    return (
      <form className={css.form} onSubmit={this.submitHandler}>
        <div className={css.fieldsbox}>
          <label className={css.label}>
            <span>Name:</span>
            <input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={event => {
                this.inputHandler(event);
              }}
              value={this.state.name}
            />
          </label>
          <label className={css.label}>
            <span>Tel:</span>
            <input
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={this.inputHandler}
              value={this.state.number}
            />
          </label>
        </div>
        <button type="submit">Add Contact</button>
      </form>
    );
  }
}

BaseForm.propTypes = {
  addContact: PropTypes.func,
};
