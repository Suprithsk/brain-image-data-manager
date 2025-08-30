import { Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import ProjectList from "./components/ProjectList"
import HomePage from "./pages/HomePage"
import DatasetDetails from "./pages/DatasetDetails"
import Files from "./pages/Files"
import { Analytics } from '@vercel/analytics/react';

function App() {
  
  return (
    <main className="min-h-screen bg-gray-100 font-display">
      <Analytics />
      <Header />
      <Routes>
        <Route path="/" element={<ProjectList />} />
        <Route path='/datasets' element={<HomePage />} />
        <Route path="/dataset/:datasetId" element={<DatasetDetails />} />
        <Route path="/files/:dataset" element={<Files />} />
      </Routes>
    </main>
  )
}

export default App

