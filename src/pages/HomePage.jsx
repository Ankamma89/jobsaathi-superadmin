import React, { useEffect, useState } from "react";
import { Users, Briefcase, CheckCircle, Activity } from "lucide-react";
import axios from "axios";
import { API_URL } from "../constants";
import Pagination from "../components/Pagination";
import JobsTable from "../components/JobsTable";
import TasksTable from "../components/TasksTable";
import HirersTable from "../components/HirersTable";
import JobseekersTable from "../components/JobseekersTable";

const SuperAdminHome = () => {
    const [hirers, setHirers] = useState([])
    const [jobSeekers, setJobSeekers] = useState([])
    const [tasks, setTasks] = useState([])
    const [jobs, setJobs] = useState([])
    const jobsPerPage = 5; // Number of jobs per page

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
    const [careerAdvancements, setCareerAdvancements] = useState([])

    async function getCareerAdvancements() {
        const response = await axios.get(`${API_URL}/career-advancements`)
        setCareerAdvancements(response.data)
    }

    useEffect(() => {
        getCareerAdvancements()
    }, [])

    const careerAdvancementData = [
        { title: "Courses", count: careerAdvancements.courses, icon: <Briefcase className="text-blue-500" /> },
        { title: "Assessments", count: careerAdvancements.assessments, icon: <CheckCircle className="text-green-500" /> },
        { title: "Mock Interviews", count: careerAdvancements.mockInterviews, icon: <Activity className="text-indigo-500" /> },
    ];
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

            {/* Link to Career Advancement Page */}
            

            {/* Hirers and Jobseekers Management */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Hirers Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Manage Hirers</h2>
                    <HirersTable hirers={hirers} />
                </div>
                {/* Jobseekers Section */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Manage Jobseekers</h2>
                    <JobseekersTable jobSeekers={jobSeekers} />
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Manage Jobs</h2>
                <JobsTable jobs={jobs} onDelete={handleJobDelete} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Manage Tasks</h2>
                <TasksTable tasks={tasks} onDelete={handleTaskDelete} />
            </div>
        </div>
    );
};

export default SuperAdminHome;
