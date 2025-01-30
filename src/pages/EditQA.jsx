import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../constants';

const EditQA = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [qa, setQA] = useState({ title: '', description: '', questions: [] });

  useEffect(() => {
    axios.get(`${API_URL}/api/get-interview-qa/${id}`)
      .then(response => {
        setQA(response.data);
      })
      .catch(error => {
        console.error('Error fetching QA:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQA(prevQA => ({ ...prevQA, [name]: value }));
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...qa.questions];
    updatedQuestions[index][field] = value;
    setQA(prevQA => ({ ...prevQA, questions: updatedQuestions }));
  };

  const handleAddQuestion = () => {
    setQA(prevQA => ({
      ...prevQA,
      questions: [...prevQA?.qa, { question: '', answer: '' }]
    }));
  };

  const handleRemoveQuestion = (index) => {
    setQA(prevQA => ({
      ...prevQA,
      questions: prevQA.questions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_URL}/api/qa/${id}`, qa)
      .then(() => {
        history('/qalist');
      })
      .catch(error => {
        console.error('Error updating QA:', error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Interview QA</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={qa.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={qa.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          ></textarea>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Questions & Answers</h3>
          {qa?.qa?.map((q, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-700">Question</label>
              <input
                type="text"
                value={q.question}
                onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                className="w-full px-4 py-2 border rounded mb-2"
              />
              <label className="block text-gray-700">Answer</label>
              <textarea
                value={q.answer}
                onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                className="w-full px-4 py-2 border rounded"
              ></textarea>
              <button
                type="button"
                onClick={() => handleRemoveQuestion(index)}
                className="text-red-500 mt-2"
              >
                Remove Question
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddQuestion}
            className="text-blue-500 mt-4"
          >
            Add Question
          </button>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded mt-4">
          Update QA
        </button>
      </form>
    </div>
  );
};

export default EditQA;