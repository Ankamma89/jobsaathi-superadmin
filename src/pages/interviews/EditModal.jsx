import { X } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';

function EditModal({ isOpen, onClose, interview, onSave }) {
    const [formData, setFormData] = useState({ 'topic': '', 'date': '', 'time': '' });
    const modalRef = useRef();

    React.useEffect(() => {
        if (interview) {
            setFormData({ 'topic': interview?.topic, 'date': interview?.date, 'time': interview?.time });
        }
    }, [interview]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose(); // Close the modal if clicked outside
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(interview?._id, formData);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md" ref={modalRef}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Edit Interview</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                        aria-label="Close"
                    >
                        <X />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="topic" className="block text-sm font-medium">Topic</label>
                        <input
                            type="text"
                            id="topic"
                            name="topic"
                            value={formData.topic}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="date" className="block text-sm font-medium">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="time" className="block text-sm font-medium">Time</label>
                        <input
                            type="time"
                            id="time"
                            name="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditModal;
