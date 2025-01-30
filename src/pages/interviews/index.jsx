import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { API_URL } from '../../constants';
import Sidebar from '../../components/Sidebar';

const localizer = momentLocalizer(moment);

const InterviewScheduler = () => {
    const token = localStorage.getItem('token');
    const [view, setView] = useState('table');
    const [filter, setFilter] = useState('upcoming');
    const [interviews, setInterviews] = useState([]);
    const [filteredInterviews, setFilteredInterviews] = useState([]);

    useEffect(() => {
        fetchInterviews();
    }, []);

    useEffect(() => {
        if (filter) {
            const list = filterInterviews()
            setFilteredInterviews([...list]);
        }
        else {
            setFilteredInterviews([...interviews])
        }
    }, [interviews, filter]);

    const fetchInterviews = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/all-interviews`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = response.data.map((interview) => {
                const [hours, minutes] = interview.time.split(':').map(Number);
                const startDate = new Date(interview.date);
                startDate.setHours(hours, minutes);
                const endDate = new Date(startDate);
                endDate.setHours(hours + 1); // Assuming 1-hour duration

                return {
                    ...interview,
                    start: startDate,
                    end: endDate,
                    title: interview.topic
                };
            });
            setInterviews(data);
        } catch (error) {
            console.error('Error fetching interviews:', error);
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'scheduled':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'completed':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'delayed':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const filterInterviews = () => {
        if (filter) {
            const now = new Date();
            return interviews.filter((interview) =>
                filter == 'all' ? interview.date : filter === 'past' ? new Date(interview.date) < now : new Date(interview.date) >= now
            );
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 p-6 bg-gray-100 overflow-auto">
                <div className="container mx-auto p-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-indigo-600">Interview Scheduler</h2>
                        <div className='text-gray-800 ml-2'>
                            <button
                                className={`py-2 px-4 rounded-lg mr-2 ${filter === 'upcoming' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                                onClick={() => setFilter('upcoming')}
                            >
                                Upcoming Events
                            </button>
                            <button
                                className={`py-2 px-4 rounded-lg mr-2 ${filter === 'past' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                                onClick={() => setFilter('past')}
                            >
                                Past Events
                            </button>
                            <button
                                className={`py-2 px-4 rounded-lg ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                                onClick={() => setFilter('all')}
                            >
                                All Events
                            </button>
                        </div>
                        <div className='ml-2'>
                            <button
                                className={`py-2 px-4 rounded-lg mr-2 ${view === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                                onClick={() => setView('table')}
                            >
                                Table View
                            </button>
                            <button
                                className={`py-2 px-4 rounded-lg ${view === 'calendar' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                                onClick={() => setView('calendar')}
                            >
                                Calendar View
                            </button>
                        </div>
                    </div>

                    {view === 'table' ? (
                        <table className="w-full bg-white rounded-lg shadow-lg text-gray-800">
                            <thead>
                                <tr className="bg-gray-100 text-left">
                                    <th className="py-3 px-4 border border-gray-300">Title</th>
                                    <th className="py-3 px-4 border border-gray-300">Date</th>
                                    <th className="py-3 px-4 border border-gray-300">Time</th>
                                    <th className="py-3 px-4 border border-gray-300">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredInterviews.map((interview) => (
                                    <tr key={interview.id} className="hover:bg-gray-50">
                                        <td className="py-3 px-4 border border-gray-300 capitalize text-left">{interview.topic}</td>
                                        <td className="py-3 px-4 border border-gray-300 text-left">{interview.date}</td>
                                        <td className="py-3 px-4 border border-gray-300 text-left">{interview.time}</td>
                                        <td className={`py-3 px-4 border border-gray-300 capitalize ${getStatusClass(interview?.status)} text-left`}>{interview.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <Calendar
                            localizer={localizer}
                            events={interviews}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 500 }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default InterviewScheduler;