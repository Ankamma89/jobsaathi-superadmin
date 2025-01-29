import React, { useEffect, useState } from "react";
import { Users, Briefcase, CheckCircle, Activity } from "lucide-react";
import axios from "axios";
import { API_URL } from "../constants";
const SuperAdminHome = () => {
    const [hirers, setHirers] = useState([])
    const [jobSeekers, setJobSeekers] = useState([])
    const [tasks, setTasks] = useState([])
    const [jobs, setJobs] = useState([])
    useEffect(() => {
        getHirers()
    }, [])

    async function getHirers() {
        const response = await axios.get(`${API_URL}/admin-dashboard`)
        setHirers(response.data.companies)
        setJobSeekers(response.data.jobseekers)
        setTasks(response.data.tasks)
        setJobs(response.data.jobs)
    }

    async function handleTaskDelete(id) {
        //const response = await axios.get('http://127.0.0.1:5000/admin-dashboard')
        const response = await axios.get(`${API_URL}/delete/task/${id}`)
        getHirers()
    }

    async function handleJobDelete(id) {
        //const response = await axios.get('http://127.0.0.1:5000/admin-dashboard')
        const response = await axios.get(`${API_URL}/admin-delete/job/${id}`)
        getHirers()
    }

    const overviewData = [
        { title: "Total Hirers", count: 120, icon: <Briefcase className="text-blue-500" /> },
        { title: "Total Jobseekers", count: 450, icon: <Users className="text-green-500" /> },
        { title: "Active Jobs", count: 80, icon: <Activity className="text-indigo-500" /> },
        { title: "Completed Jobs", count: 200, icon: <CheckCircle className="text-yellow-500" /> },
    ];

    return (
        <div className="p-6 space-y-6">
            {/* Overview Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {overviewData.map((data, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
                        <div className="p-2 bg-gray-100 rounded-full">{data.icon}</div>
                        <div>
                            <h3 className="text-gray-600 font-medium">{data.title}</h3>
                            <p className="text-xl font-bold text-gray-800">{data.count}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Hirers and Jobseekers Management */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Hirers Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Manage Hirers</h2>
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
                            {/* Sample data */}
                            {hirers?.map((hirer) =>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2 max-w-28 overflow-hidden text-ellipsis">{hirer?.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{hirer?.profile_details[0]?.company_name}</td>
                                    <td className="border border-gray-300 px-4 py-2">5</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button className="bg-red-500 text-white px-2 py-1 rounded-md">Ban</button>
                                    </td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>

                {/* Jobseekers Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Manage Jobseekers</h2>
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
                            {/* Sample data */}
                            {jobSeekers?.map((jobseeker) =>
                                <tr className="bg-gray-100 text-left">
                                    <td className="border border-gray-300 px-4 py-2">{jobseeker?.user_details[0]?.name}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 max-w-28 overflow-hidden text-ellipsis">{jobseeker?.user_details[0]?.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{jobseeker?.user_details[0]?.skills}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button className="bg-red-500 text-white px-2 py-1 rounded-md">Ban</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Manage Jobs</h2>
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
                        {/* Sample data */}
                        {jobs?.map((job) =>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 max-w-28 overflow-hidden text-ellipsis">{job?.job_title}</td>
                                <td className="border border-gray-300 px-4 py-2">{job?.created_on}</td>
                                <td className="border border-gray-300 px-4 py-2">{job?.budget}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button className="bg-red-500 text-white px-2 py-1 rounded-md" onClick={() => handleJobDelete(job?.job_id)}>Delete</button>
                                </td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Manage Tasks</h2>
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
                        {/* Sample data */}
                        {tasks?.map((task) =>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 max-w-28 overflow-hidden text-ellipsis">{task?.task_title}</td>
                                <td className="border border-gray-300 px-4 py-2">{task?.created_on}</td>
                                <td className="border border-gray-300 px-4 py-2">{task?.budget}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button className="bg-red-500 text-white px-2 py-1 rounded-md" onClick={() => handleTaskDelete(task?.task_id)}>Delete</button>
                                </td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SuperAdminHome;
