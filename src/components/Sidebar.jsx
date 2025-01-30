import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaPlus, FaList, FaBook, FaCalendarAlt, FaQuestionCircle } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-4 flex flex-col">
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      <nav className="flex-1">
        <ul>
          <li className="mb-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "flex items-center text-purple-400" : "flex items-center text-white hover:text-purple-400"
              }
            >
              <FaTachometerAlt className="mr-2" />
              Dashboard
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/create-quiz"
              className={({ isActive }) =>
                isActive ? "flex items-center text-purple-400" : "flex items-center text-white hover:text-purple-400"
              }
            >
              <FaPlus className="mr-2" />
              Create Quiz
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/quizlist"
              className={({ isActive }) =>
                isActive ? "flex items-center text-purple-400" : "flex items-center text-white hover:text-purple-400"
              }
            >
              <FaList className="mr-2" />
              View Quiz List
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/create-course"
              className={({ isActive }) =>
                isActive ? "flex items-center text-purple-400" : "flex items-center text-white hover:text-purple-400"
              }
            >
              <FaPlus className="mr-2" />
              Create Course
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/courses"
              className={({ isActive }) =>
                isActive ? "flex items-center text-purple-400" : "flex items-center text-white hover:text-purple-400"
              }
            >
              <FaBook className="mr-2" />
              View Course List
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/interview-calendar"
              className={({ isActive }) =>
                isActive ? "flex items-center text-purple-400" : "flex items-center text-white hover:text-purple-400"
              }
            >
              <FaCalendarAlt className="mr-2" />
              View Interview List
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/create-qa"
              className={({ isActive }) =>
                isActive ? "flex items-center text-purple-400" : "flex items-center text-white hover:text-purple-400"
              }
            >
              <FaPlus className="mr-2" />
              Create Interview QA
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink
              to="/qalist"
              className={({ isActive }) =>
                isActive ? "flex items-center text-purple-400" : "flex items-center text-white hover:text-purple-400"
              }
            >
              <FaQuestionCircle className="mr-2" />
              View Interview QA List
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="mt-auto">
        <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg">
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;