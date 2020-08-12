import React from 'react'
import Link from 'next/link'
import { IconFacebook, IconTwitter, IconInstagram } from '../icons'
const Footer = () => {
  return (
    <footer className="w-full text-gray-700 bg-gray-100 body-font">
      <div className="container flex flex-col items-center px-5 pt-6 pb-4 mx-auto sm:flex-row">
        <Link href="/">
          <a className="flex items-center justify-center font-medium text-gray-900 title-font md:justify-start">
            <img src="/logo.svg" className="w-32 h-10 p-2 text-white" alt="" />
          </a>
        </Link>
        <p className="mt-4 text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0">
          © 2020 nodesend —
          <a
            href="https://twitter.com/luismardev"
            className="ml-1 text-gray-600"
            rel="noopener noreferrer"
            target="_blank"
          >
            @luismardev
          </a>
        </p>
        <span className="inline-flex justify-center mt-4 sm:ml-auto sm:mt-0 sm:justify-start">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.facebook.com/luismardev"
            className="text-gray-500 hover:text-blue-700"
          >
            <IconFacebook className="w-5 h-5" />
          </a>

          <a
            target="_blank"
            rel="noreferrer"
            href="https://twitter.com/luismardev"
            className="ml-3 text-gray-500 hover:text-blue-400"
          >
            <IconTwitter className="w-5 h-5" />
          </a>

          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.instagram.com/luismardev"
            className="ml-3 text-gray-500 hover:text-pink-600"
          >
            <IconInstagram className="w-5 h-5" />
          </a>
        </span>
      </div>
    </footer>
  )
}

export default Footer
