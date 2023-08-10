import React, { Component } from 'react';
import css from "./HeaderSection.module.css";

class HeaderSection extends Component {
  render() {
    return (
      <header className={css.headerBox}>
        <div className={css.logo}><span>The</span>Phonebook</div>
      </header>
    );
  }
}

export default HeaderSection;