import React, { useState } from 'react';
import Pagination from './Pagination';

const JobsTable = ({ jobs, handleJobDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const totalPages = Math.ceil(jobs.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const paginatedJobs = jobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


    console.log(jobs.length, 'jobs')
    return (
        <div>
            <table className='w-full text-gray-800 border-collapse border border-gray-300'>
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="border border-gray-300 px-4 py-2">Job Title</th>
                        <th className="border border-gray-300 px-4 py-2">Location</th>
                        <th className="border border-gray-300 px-4 py-2">Posted Date</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedJobs.map(job => (
                        <tr key={job.job_id} className='bg-white text-left'>
                            <td className="border border-gray-300 px-4 py-2">{job.job_title}</td>
                            <td className="border border-gray-300 px-4 py-2">{job.job_location}</td>
                            <td className="border border-gray-300 px-4 py-2">{job.created_on}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button className="bg-red-500 text-white px-2 py-1 rounded-md" onClick={() => handleJobDelete(job?.job_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <Pagination
                    currentPage={currentPage}
                    totalItems={jobs?.length}
                    itemsPerPage={itemsPerPage}
                    setCurrentPage={setCurrentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default JobsTable;