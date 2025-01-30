import { useState } from 'react'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import SuperAdminHome from './pages/HomePage'
import AdminDashboard from './pages/AdminPage'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import CreateQuizPage from './pages/CreateQuiz'
import QuizListPage from './pages/QuizList'
import CreateCourse from './pages/CreateCourse'
import CourseManagement from './pages/CourseList'
import InterviewScheduler from './pages/interviews'
import CreateInterviewSection from './pages/CreateInterviewQA'
import QAList from './pages/InterviewQuestionsList'
import EditQA from './pages/EditQA'
import UpdateQuizPage from './pages/UpdateQuiz'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path='/' element={<AdminDashboard />} />
        <Route path='/admin' element={<SuperAdminHome />} />
        <Route path='/create-quiz' element={<CreateQuizPage />} />
        <Route path='/update-quiz/:id' element={<UpdateQuizPage />} />
        <Route path='/quizlist' element={<QuizListPage />} />
        <Route path='/create-course' element={<CreateCourse />} />
        <Route path='/courses' element={<CourseManagement />} />
        <Route path='/interview-calendar' element={<InterviewScheduler />} />
        <Route path='/create-qa' element={<CreateInterviewSection />} />
        <Route path='/qalist' element={<QAList />} />
        <Route path='/edit-qa/:id' element={<EditQA />} />
      </Routes>
    </Router>
  )
}

export default App
