import React, { useState, useEffect } from 'react';
import { API_URL } from './../constants';
import Sidebar from '../components/Sidebar';

const CreateCourse = () => {
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newPrice, setNewPrice] = useState('');

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        const response = await fetch(`${API_URL}/api/courses`);
        const data = await response.json();
        setCourses(data); // Assuming the response contains courses as an array
    };

    const handleChange = (e) => {
        setCourse({
            ...courseData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newCourse = {
            title: newTitle,
            description: newDescription,
            price: newPrice
        };
        try {
            const response = await fetch(`${API_URL}/api/create-course`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCourse)
            });
            if (response.ok) {
                fetchCourses();
                setNewTitle('');
                setNewDescription('');
                setNewPrice('');
            } else {
                console.error('Failed to create course');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 p-6 bg-gray-100 overflow-auto">
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-4">Create a New Course</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Course Title</label>
                            <input
                                type="text"
                                name="title"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                className="w-full p-2 border border-gray-300 text-gray-800 rounded-lg bg-transparent"
                                required
                                placeholder="Title"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Description</label>
                            <textarea
                                name="description"
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                                className="w-full p-2 border border-gray-300 text-gray-800 rounded-lg bg-transparent"
                                required
                                placeholder="Description"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Price</label>
                            <input
                                type="text"
                                name="price"
                                value={newPrice}
                                onChange={(e) => setNewPrice(e.target.value)}
                                className="w-full p-2 border border-gray-300 text-gray-800 rounded-lg bg-transparent"
                                required
                                placeholder="Price"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                        >
                            Create Course
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCourse;