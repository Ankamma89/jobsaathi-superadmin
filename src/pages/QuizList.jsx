import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../src/constants';
import Sidebar from '../components/Sidebar';

const QuizListPage = () => {
    const history = useNavigate();
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/api/quizzes`)
            .then(response => response.json())
            .then(data => setQuizzes(data.quizzes))
            .catch(error => console.error('Error fetching quizzes:', error));
    }, []);

    const handleUpdateQuiz = (quizId) => {
        history(`/update-quiz/${quizId}`);
    };

    const deleteQuiz = (quizId) => {
        fetch(`${API_URL}/api/quizzes/${quizId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    setQuizzes(quizzes.filter(quiz => quiz.id !== quizId));
                } else {
                    console.error('Failed to delete quiz');
                }
            })
            .catch(error => console.error('Error deleting quiz:', error));
    };

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 p-6 bg-gray-100 overflow-auto">
                <div className="container mx-auto p-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-blue-800">Quiz List</h2>
                        <Link to="/create-quiz" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Create New Quiz</Link>
                    </div>
                    <table className="w-full bg-white rounded-lg shadow-lg text-gray-800 border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="py-3 px-4 border border-gray-300">Title</th>
                                <th className="py-3 px-4 border border-gray-300">Description</th>
                                <th className="py-3 px-4 border border-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quizzes.map(quiz => (
                                <tr key={quiz.id} className="hover:bg-gray-50 text-gray-800">
                                    <td className="py-3 px-4 border border-gray-300">{quiz.title}</td>
                                    <td className="py-3 px-4 border border-gray-300">{quiz.description}</td>
                                    <td className="py-3 px-4 border border-gray-300">
                                        <button onClick={() => handleUpdateQuiz(quiz.id)} className="text-blue-500 hover:underline mr-4">Edit</button>
                                        <button onClick={() => deleteQuiz(quiz.id)} className="text-red-500 hover:underline">Delete</button>
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

export default QuizListPage;