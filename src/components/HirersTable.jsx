import React, { useState } from 'react';
import Pagination from './Pagination';

const HirersTable = ({ hirers }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const hirersPerPage = 8;

    const indexOfLastHirer = currentPage * hirersPerPage;
    const indexOfFirstHirer = indexOfLastHirer - hirersPerPage;
    const currentHirers = hirers.slice(indexOfFirstHirer, indexOfLastHirer);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="bg-white rounded-lg">
            <table className="w-full text-gray-800 border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Company</th>
                        <th className="border border-gray-300 px-4 py-2">Jobs</th>
                        <th className="border border-gray-300 px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentHirers.map((hirer, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 px-4 py-2 max-w-28 overflow-hidden text-ellipsis">{hirer?.email}</td>
                            <td className="border border-gray-300 px-4 py-2">{hirer?.profile_details[0]?.company_name}</td>
                            <td className="border border-gray-300 px-4 py-2">5</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button className="bg-red-500 text-white px-2 py-1 rounded-md">Ban</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                itemsPerPage={hirersPerPage}
                totalItems={hirers.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
};

export default HirersTable;