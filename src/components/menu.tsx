import React, { useState } from 'react';

const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black grid sm:grid-cols-2 grid-cols-3 space-x-8 py-2">
      <div className="sm:flex sm:flex-wrap sm:justify-between items-center text-white grid grid-cols-[600px] col-span-2 sm:col-span-1">
        <a href="https://flowbite.com" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/cgs.png" width="60px" height="60px" alt="Flowbite Logo" />
          <div className="inline font-bold grid grid-cols-[300px] flex content-center ml-4 text-sm font-display text-white">
            <span>Continuing Studies</span>
            <span className="hidden lg:block text-lg">Center for Government Services</span>
            <span className="block lg:hidden text-sm">Center for Government Services</span>
          </div>
        </a>
      </div>
      <div className="hidden md:block md:flex items-center justify-end space-x-6 rtl:space-x-reverse">
        <div className="hidden md:inline-block">
          <ul className="flex flex-row mt-0 space-x-8 rtl:space-x-reverse invisible sm:visible">
            <li>
              <a href="#" aria-current="page" className="active text-amber-400 font-bold">Spring</a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-amber-400 font-bold">Summer</a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-amber-400 font-bold">Fall</a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-amber-400 font-bold">Winter</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-white text-xs grid flex md:col-start-3 justify-end content-center pr-2">
        <ul>
          <li className="md:inline">
            <a title="Rutgers.edu" href="#">Visit Rutgers.edu<span className="invisible md:visible">|</span></a>
          </li>
          <li className="md:inline">
            <a title="Continuing Studies" href="#">Continuing Studies</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;