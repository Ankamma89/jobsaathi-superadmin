import React, { useState } from 'react';
import Pagination from './Pagination';

const JobseekersTable = ({ jobSeekers }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const jobSeekersPerPage = 8;

    // Calculate the indices for the current page
    const indexOfLastJobSeeker = currentPage * jobSeekersPerPage;
    const indexOfFirstJobSeeker = indexOfLastJobSeeker - jobSeekersPerPage;
    const currentJobSeekers = jobSeekers.slice(indexOfFirstJobSeeker, indexOfLastJobSeeker);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <table className="w-full border-collapse border text-gray-800 border-gray-300">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Skills</th>
                        <th className="border border-gray-300 px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentJobSeekers.map((jobseeker, index) => (
                        <tr key={index} className="bg-gray-100 text-left">
                            <td className="border border-gray-300 px-4 py-2">{jobseeker?.user_details[0]?.name}</td>
                            <td className="border border-gray-300 px-4 py-2 max-w-28 overflow-hidden text-ellipsis">{jobseeker?.user_details[0]?.email}</td>
                            <td className="border border-gray-300 px-4 py-2">{jobseeker?.user_details[0]?.skills}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button className="bg-red-500 text-white px-2 py-1 rounded-md">Ban</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                itemsPerPage={jobSeekersPerPage}
                totalItems={jobSeekers.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
};

export default JobseekersTable;