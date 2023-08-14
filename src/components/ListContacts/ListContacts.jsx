import React from 'react';
import PropTypes, { shape } from 'prop-types';
import css from './ListContacts.module.css';

function ListContacts ({contacts, deleteContact}) {
  

    return (
      <ol className={css.listBox}>
        {contacts.map(item => {
          return (
            <li className={css['list-item']} key={item.id}>
              <span>{item.name}:</span> <span>{item.number}</span>
              <button
                type="button"
                onClick={() => {
                  deleteContact(item.id);
                }}
              >
                Del
              </button>
            </li>
          );
        })}
      </ol>
    );
  }


ListContacts.propTypes = {
  contacts: PropTypes.arrayOf(
    shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  deleteContact: PropTypes.func,
};

export default ListContacts;
