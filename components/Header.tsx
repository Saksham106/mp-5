"use client";
import React from 'react';

const Header = () => {
  return (
    <header className="flex flex-col items-center bg-white shadow-md py-5 px-4">
      <div className="flex items-center w-full max-w-7xl justify-between">
        <div>
          <h1 className="font-sans text-[1.8rem] font-bold text-blue-500 m-0 p-3">
            CS391 URL Shortener
          </h1>
          <p className="text-[0.95rem] text-slate-500 m-0 pl-3">
            Transform long links into short URLs
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;