import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../constants';
import Modal from './Modal';

const UpdateQuizPage = () => {
    const { quizId } = useParams();
    const [title, setTitle] = useState('');
    const [quiz, setQuiz] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedQuestion, setEditedQuestion] = useState('');
    const [editedOptions, setEditedOptions] = useState(['', '', '', '']);
    const [editedCorrectAnswer, setEditedCorrectAnswer] = useState('');
    const [editedQuestionType, setEditedQuestionType] = useState('MCQ');
    const [newQuestion, setNewQuestion] = useState('');
    const [newOptions, setNewOptions] = useState(['', '', '', '']);
    const [newCorrectAnswer, setNewCorrectAnswer] = useState('');
    const [newQuestionType, setNewQuestionType] = useState('MCQ');

    useEffect(() => {
        getquestions()
    }, [quizId]);

    function getquestions() {
        fetch(`${API_URL}/api/quizzes/${quizId}`)
            .then(response => response.json())
            .then(data => setQuiz(data))
            .catch(error => console.error('Error fetching quiz:', error));
    }

    const handleAddQuestion = () => {
        const newQuestionData = {
            type: newQuestionType,
            text: newQuestion,
            options: newOptions,
            correctAnswer: newCorrectAnswer,
        };
        const updatedQuestions = [...quiz.questions, newQuestionData];
        setQuiz({ ...quiz, questions: updatedQuestions });

        // Send the updated quiz to the backend
        fetch(`${API_URL}/api/quizzes/${quizId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...quiz, questions: updatedQuestions }),
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                fetch(`${API_URL}/api/quizzes/${quizId}`)
                    .then(response => response.json())
                    .then(data => setQuiz(data))
                    .catch(error => console.error('Error fetching quiz:', error));
            })
            .catch(error => console.error('Error updating quiz:', error));

        // Reset new question fields
        setNewQuestion('');
        setNewOptions(['', '', '', '']);
        setNewCorrectAnswer('');
    };

    const startEditing = (index) => {
        setEditingIndex(index);
        const question = quiz?.questions[index];
        setEditedQuestion(question.text);
        setEditedQuestionType(question?.type)
        setEditedOptions([...question.options]);
        setEditedCorrectAnswer(question.correctAnswer);
    };

    const saveEdit = () => {
        const updatedQuestions = [...quiz.questions];
        updatedQuestions[editingIndex] = {
            type: editedQuestionType,
            text: editedQuestion,
            options: editedOptions,
            correctAnswer: editedCorrectAnswer,
        };
        setQuiz({ ...quiz, questions: updatedQuestions });

        // Send the updated quiz to the backend
        fetch(`${API_URL}/api/quizzes/${quizId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...quiz, questions: updatedQuestions }),
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                getquestions()
            })
            .catch(error => console.error('Error updating quiz:', error));

        setEditingIndex(null);
    };

    const deleteQuestion = (index) => {
        const updatedQuestions = quiz.filter((_, idx) => idx !== index);
        setQuiz({ ...quiz, questions: updatedQuestions });

        // Send updated questions to the backend
        fetch(`${API_URL}/api/quizzes/${quizId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...quiz, questions: updatedQuestions }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Question deleted successfully:', data);
                getquestions();
            })
            .catch(error => console.error('Error deleting question:', error));
    };


    return (
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg my-4">
            {quiz ? (
                <>
                    {!editingIndex ? (<h2 className="text-3xl font-bold text-blue-600 mb-6">Update Quiz: {quiz.title}</h2>) :
                        <input type='text' value={quiz?.title} name='title' />}
                    {/* Existing questions display */}
                    <ul className="space-y-6">
                        {quiz?.questions?.length > 0 && quiz?.questions?.map((question, index) => (
                            <li key={index} className="p-4 border border-gray-200 rounded-lg relative">
                                {editingIndex === index ? (
                                    <>
                                        <select className='w-full mb-4 px-2 py-2 border-gray-300 border rounded-md bg-white' value={editedQuestionType}
                                            onChange={(e) => setEditedQuestionType(e.target.value)}>
                                            <option value=''>select type</option>
                                            <option value='mcq'>MCQ</option>
                                            <option value='coding'>Coding</option>
                                        </select>
                                        <div className="mb-4">
                                            <input
                                                type="text"
                                                value={editedQuestion}
                                                onChange={(e) => setEditedQuestion(e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                                                placeholder="Question"
                                            />
                                        </div>
                                        {editedOptions.map((option, idx) => (
                                            <div className="mb-2" key={idx}>
                                                <input
                                                    type="text"
                                                    value={option}
                                                    onChange={(e) => {
                                                        const updatedOptions = [...editedOptions];
                                                        updatedOptions[idx] = e.target.value;
                                                        setEditedOptions(updatedOptions);
                                                    }}
                                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                                                    placeholder={`Option ${idx + 1}`}
                                                />
                                            </div>
                                        ))}
                                        <div className="mb-4">
                                            <input
                                                type="text"
                                                value={editedCorrectAnswer}
                                                onChange={(e) => setEditedCorrectAnswer(e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                                                placeholder="Correct Answer"
                                            />
                                        </div>
                                        <div className="flex space-x-4">
                                            <button
                                                onClick={saveEdit}
                                                className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-all"
                                            >
                                                Save Changes
                                            </button>
                                            <button
                                                onClick={() => setEditingIndex(null)}
                                                className="bg-gray-300 text-black py-2 px-6 rounded-lg hover:bg-gray-400 transition-all"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex justify-between">
                                            <p className="font-semibold text-gray-800">{question.text}</p>
                                            <div className="space-x-2">
                                                <button
                                                    onClick={() => startEditing(index)}
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => deleteQuestion(index)}
                                                    className="text-red-500 hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                        <ul className="list-inside ml-4 space-y-2">
                                            {question.options.map((option, idx) => (
                                                <li
                                                    key={idx}
                                                    className={`text-gray-700 ${option === question.correctAnswer ? 'font-bold text-green-600' : ''}`}
                                                >
                                                    {option}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                    {/* Form for adding new question */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-green-400 text-white py-2 px-6 my-2 rounded-lg hover:bg-blue-600 transition-all"
                    >
                        Add New Question
                    </button>
                    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Question</h3>
                        <div className="space-y-4">
                            <select className='w-full px-2 py-2 border-gray-500 border rounded-md bg-white' value={newQuestionType}
                                onChange={(e) => setNewQuestionType(e.target.value)}>
                                <option value=''>select type</option>
                                <option value='mcq'>MCQ</option>
                                <option value='coding'>Coding</option>
                            </select>

                            <input
                                type="text"
                                placeholder="New Question"
                                value={newQuestion}
                                onChange={(e) => setNewQuestion(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                            />
                            {newOptions.map((option, idx) => (
                                <div className="space-y-2" key={idx}>
                                    <input
                                        type="text"
                                        placeholder={`Option ${idx + 1}`}
                                        value={option}
                                        onChange={(e) => {
                                            const updatedOptions = [...newOptions];
                                            updatedOptions[idx] = e.target.value;
                                            setNewOptions(updatedOptions);
                                        }}
                                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                                    />
                                </div>
                            ))}
                            <input
                                type="text"
                                placeholder="Correct Answer"
                                value={newCorrectAnswer}
                                onChange={(e) => setNewCorrectAnswer(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                            />

                        </div>
                        <button
                            onClick={handleAddQuestion}
                            className="mt-4 bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-all w-full"
                        >
                            Add Question
                        </button>
                    </Modal>
                </>
            ) : (
                <p className="text-center text-gray-500">Loading quiz details...</p>
            )}
        </div>
    );
};

export default UpdateQuizPage;