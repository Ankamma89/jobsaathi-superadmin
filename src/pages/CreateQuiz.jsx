import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from './../constants';
import Sidebar from '../components/Sidebar';

const CreateQuizPage = () => {
    const token = localStorage.getItem('token');
    const [quizTitle, setQuizTitle] = useState('');
    const [type, setType] = useState('');
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [questions, setQuestions] = useState([]);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            {
                question: question,
                type: type,
                options,
                correctAnswer,
            },
        ]);
        setQuestion('');
        setOptions(['', '', '', '']);
        setCorrectAnswer('');
    };

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...questions];
        if (field === 'text' || field === 'correctAnswer' || field === 'type') {
            newQuestions[index][field] = value;
        } else {
            newQuestions[index].options[field] = value;
        }
        setQuestions(newQuestions);
    };

    const handleSaveQuiz = async (e) => {
        e.preventDefault()
        const quizData = {
            title: quizTitle,
            questions: questions,
        };
        console.log(quizData, API_URL, 'quizzes')
        try {
            const response = await axios.post(`${API_URL}/api/quizzes`, { ...quizData }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            //alert('Quiz created successfully');
            console.log(response.data);
        } catch (error) {
            console.error('Error creating quiz:', error);
            alert('Failed to create quiz');
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 p-6 bg-gray-100 overflow-auto">
                <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-4">Create a New Quiz</h2>
                    <form onSubmit={(e) => handleSaveQuiz(e)}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Quiz Title</label>
                            <input
                                type="text"
                                value={quizTitle}
                                onChange={(e) => setQuizTitle(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg bg-transparent"
                                required
                                placeholder='title'
                            />
                        </div>
                        {questions.map((question, index) => (
                            <div key={index} className="mb-4 border p-4 rounded-lg">
                                <label className="block text-gray-700 font-medium mb-2">Question Type</label>
                                <select className='w-full mb-4 px-2 py-2 border-gray-300 border rounded-md bg-transparent' value={question.type}
                                    onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
                                >
                                    <option value=''>select type</option>
                                    <option value='mcq'>MCQ</option>
                                    <option value='coding'>Coding</option>
                                </select>
                                <label className="block text-gray-700 font-medium mb-2"> {index + 1}</label>
                                <input
                                    type="text"
                                    value={question.text}
                                    onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg mb-2 bg-transparent"
                                    required
                                    placeholder='question'
                                />
                                <label className="block text-gray-700 font-medium mb-2">Options</label>
                                {question.options.map((option, optIndex) => (
                                    <input
                                        key={optIndex}
                                        type="text"
                                        value={option}
                                        onChange={(e) => handleQuestionChange(index, optIndex, e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-lg mb-2 bg-transparent"
                                        placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                                        required
                                    />
                                ))}
                                <label className="block text-gray-700 font-medium mb-2">Correct Answer</label>
                                <input
                                    type="text"
                                    value={question.correctAnswer}
                                    onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg bg-transparent"
                                    required
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddQuestion}
                            className="bg-blue-500 text-white p-2 rounded-lg mb-4 mr-2 hover:bg-blue-600"
                        >
                            {questions?.length > 0 ? 'Add Another Question' : 'Add Question'}
                        </button>
                        <button
                            type="submit"
                            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                        >
                            Submit Quiz
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateQuizPage;