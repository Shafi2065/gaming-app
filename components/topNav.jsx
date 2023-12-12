"use client"
import "../public/style.css";
import Link from 'next/link'

export default function TopNav() {
  return (
    <div>
      <nav className="topNav">
        <Link href="/" className="navBrand">MY DAY</Link>
        <ul>
          <li className="active">
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/pricing">Clans</Link>
          </li>
          <li>
            <Link href="/about">Games</Link>
          </li>
          <li>
            <Link href="/login" passHref>
              <button className="loginButton">Login</button>
            </Link>
          </li>
          <li>
            <Link href="login/register">
              <button className="registerButton">Create Account</button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
