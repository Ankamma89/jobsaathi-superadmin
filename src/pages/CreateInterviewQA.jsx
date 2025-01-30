import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';
import Sidebar from '../components/Sidebar';

function CreateInterviewSection() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [qa, setQa] = useState([{ question: '', answer: '' }]);

    const [data, setData] = useState([
        { id: 1, title: 'HR Interview', description: 'Prepare for HR interviews with FAQs and tips.' },
        { id: 2, title: 'Technical Interview', description: 'Get ready for technical interviews with problem-solving strategies.' },
    ]);

    const [editingIndex, setEditingIndex] = useState(null);
    const [editingData, setEditingData] = useState({ title: '', description: '' });

    useEffect(() => {
        fetch(`${API_URL}/api/get-interview-qas`)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching quizzes:', error));
    }, []);

    const handleChange = (e) => {
        setQa({
            ...qa,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newQa = {
            title,
            description,
            qa
        };
        try {
            const response = await axios.post(`${API_URL}/api/create-interview-qa`, newQa);
            if (response.status === 200) {
                setData([...data, response.data]);
                setTitle('');
                setDescription('');
                setQa([{ question: '', answer: '' }]);
            } else {
                console.error('Failed to create QA');
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
                    <h2 className="text-2xl font-semibold text-blue-600 mb-4">Create Interview QA</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg bg-transparent"
                                required
                                placeholder="Title"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Description</label>
                            <textarea
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg bg-transparent"
                                required
                                placeholder="Description"
                            ></textarea>
                        </div>
                        {qa.map((item, index) => (
                            <div key={index} className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Question</label>
                                <input
                                    type="text"
                                    name="question"
                                    value={item.question}
                                    onChange={(e) => {
                                        const newQa = [...qa];
                                        newQa[index].question = e.target.value;
                                        setQa(newQa);
                                    }}
                                    className="w-full p-2 border border-gray-300 rounded-lg bg-transparent"
                                    required
                                    placeholder="Question"
                                />
                                <label className="block text-gray-700 font-medium mb-2">Answer</label>
                                <textarea
                                    name="answer"
                                    value={item.answer}
                                    onChange={(e) => {
                                        const newQa = [...qa];
                                        newQa[index].answer = e.target.value;
                                        setQa(newQa);
                                    }}
                                    className="w-full p-2 border border-gray-300 rounded-lg bg-transparent"
                                    required
                                    placeholder="Answer"
                                ></textarea>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => setQa([...qa, { question: '', answer: '' }])}
                            className="bg-blue-500 text-white p-2 rounded-lg mb-4 mr-2 hover:bg-blue-600"
                        >
                            Add Another QA
                        </button>
                        <button
                            type="submit"
                            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                        >
                            Submit QA
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateInterviewSection;
