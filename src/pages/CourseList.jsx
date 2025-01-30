import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from '../constants';
import Sidebar from '../components/Sidebar';

const CourseManagement = () => {
    const [courses, setCourses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        fetchCourses();
    }, []);

    const openModal = (course) => {
        setSelectedCourse(course);
        setTitle(course.title);
        setDescription(course.description);
        setPrice(course?.price)
        setIsModalOpen(true);
    };

    const fetchCourses = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/courses`);
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleDelete = async (courseId) => {
        try {
            await axios.delete(`${API_URL}/api/courses/${courseId}`);
            setCourses(courses.filter(course => course.id !== courseId));
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    const closeModal = () => {
        setSelectedCourse(null);
        setIsModalOpen(false);
    };

    const handleUpdate = async () => {
        try {
            await axios.post(`${API_URL}/api/edit-course/${selectedCourse.course_id}`, { title, description, price });
            closeModal();
            fetchCourses()
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 p-6 bg-gray-100 overflow-auto">
                <div className="container mx-auto p-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-blue-800">Course Management</h2>
                        <Link to="/create-course" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Create New Course</Link>
                    </div>
                    <table className="w-full bg-white rounded-lg shadow-lg text-gray-800 border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="py-3 px-4 border border-gray-300">Title</th>
                                <th className="py-3 px-4 border border-gray-300">Description</th>
                                <th className="py-3 px-4 border border-gray-300">Price</th>
                                <th className="py-3 px-4 border border-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map(course => (
                                <tr key={course.course_id} className="hover:bg-gray-50 text-gray-800">
                                    <td className="py-3 px-4 border border-gray-300">{course.title}</td>
                                    <td className="py-3 px-4 border border-gray-300">{course.description}</td>
                                    <td className="py-3 px-4 border border-gray-300">{course.price}</td>
                                    <td className="py-3 px-4 border border-gray-300">
                                        <button onClick={() => openModal(course)} className="text-blue-500 hover:underline mr-4">Edit</button>
                                        <button onClick={() => handleDelete(course.id)} className="text-red-500 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Edit Course</h3>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                                    />
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                                    ></textarea>
                                    <input
                                        type="text"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                                    />
                                </div>
                                <div className="flex justify-end mt-4">
                                    <button onClick={handleUpdate} className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 mr-2">
                                        Save
                                    </button>
                                    <button onClick={closeModal} className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseManagement;