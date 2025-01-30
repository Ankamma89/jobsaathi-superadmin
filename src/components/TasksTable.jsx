import React, { useState } from 'react';
import Pagination from './Pagination';

const TasksTable = ({ tasks, handleTaskDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(tasks.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const paginatedTasks = tasks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    console.log(tasks.length, 'tasks')
    return (
        <div>
            <table className='w-full text-gray-800 border-collapse border border-gray-300'>
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="border border-gray-300 px-4 py-2">Task Title</th>
                        <th className="border border-gray-300 px-4 py-2">Budget</th>
                        <th className="border border-gray-300 px-4 py-2">Posted Date</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedTasks.map(task => (
                        <tr key={task.task_id} className='bg-white text-left'>
                            <td className="border border-gray-300 px-4 py-2">{task.task_title}</td>
                            <td className="border border-gray-300 px-4 py-2">{task.budget}</td>
                            <td className="border border-gray-300 px-4 py-2">{task.created_on}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button className="bg-red-500 text-white px-2 py-1 rounded-md" onClick={() => handleTaskDelete(task?.task_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <Pagination
                    currentPage={currentPage}
                    totalItems={tasks?.length}
                    itemsPerPage={itemsPerPage}
                    setCurrentPage={setCurrentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default TasksTable;