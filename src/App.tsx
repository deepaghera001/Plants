import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import PlantsPage from './pages/PlantsPage';
import PlantDetailPage from './pages/PlantDetailPage';
import CommunityPage from './pages/CommunityPage';
import PostDetailPage from './pages/PostDetailPage';
import ProfilePage from './pages/ProfilePage';
import AddPlantPage from './pages/AddPlantPage';
import CreatePostPage from './pages/CreatePostPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/plants" element={<PlantsPage />} />
          <Route path="/plants/:id" element={<PlantDetailPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/community/post/:id" element={<PostDetailPage />} />
          <Route path="/community/create" element={<CreatePostPage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/add-plant" element={<AddPlantPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;