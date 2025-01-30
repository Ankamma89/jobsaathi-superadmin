import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../constants';
import Sidebar from '../components/Sidebar';

const InterviewQuestionsList = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/api/get-interview-qas`)
            .then(response => response.json())
            .then(data => setQuestions(data))
            .catch(error => console.error('Error fetching interview questions:', error));
    }, []);

    const handleDelete = (id) => {
        fetch(`${API_URL}/api/interview-questions/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    setQuestions(questions.filter(question => question._id !== id));
                } else {
                    console.error('Failed to delete question');
                }
            })
            .catch(error => console.error('Error deleting question:', error));
    };

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 p-6 bg-gray-100 overflow-auto">
                <div className="container mx-auto p-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-blue-800">Interview Questions List</h2>
                        <Link
                            to="/create-qa"
                            className="bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-green-600 transition-all"
                        >
                            Create New Interview QA List
                        </Link>
                    </div>
                    <table className="w-full bg-white rounded-lg shadow-lg text-gray-800 border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="py-3 px-4 border border-gray-300">Question</th>
                                <th className="py-3 px-4 border border-gray-300">Answer</th>
                                <th className="py-3 px-4 border border-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map(item => (
                                <tr key={item._id} className="hover:bg-gray-50 text-gray-800">
                                    <td className="py-3 px-4 border border-gray-300">{item.title}</td>
                                    <td className="py-3 px-4 border border-gray-300">{item.description}</td>
                                    <td className="py-3 px-4 border border-gray-300">
                                        <Link
                                            to={`/edit-qa/${item._id}`}
                                            className="text-blue-500 hover:text-blue-700 font-medium mr-4"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            className="text-red-500 hover:text-red-700 font-medium"
                                            onClick={() => handleDelete(item._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InterviewQuestionsList;