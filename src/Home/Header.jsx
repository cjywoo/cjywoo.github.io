import React from 'react';
import { Link } from 'bisheng/router';

export default function Header(props) {
  return (
    <header {...props} id="header">
      <Link id="logo">
        <img alt="logo" src="https://avatars1.githubusercontent.com/u/13762580?s=460&v=4" />
        <span className="logo-text">Chen JunWoo</span>
      </Link>
    </header>
  );
}
