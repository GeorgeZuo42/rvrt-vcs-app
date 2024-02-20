// src/App.jsx
import React, { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { open } from '@tauri-apps/api/dialog';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const loadedProjects = await invoke('list_projects');
      setProjects(loadedProjects);
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
  };

  const addProject = async () => {
    try {
      const selectedPaths = await open({
        directory: true,
        multiple: false
      });

      if (selectedPaths) {
        await invoke('add_project', { path: selectedPaths });
        // 重新加载项目列表...
      }
    } catch (error) {
      console.error('Failed to add project:', error);
    }
  };

  return (
    <div>
      <button onClick={addProject}>Add from Disk</button>
      <ul>
        {projects.map((project, index) => (
          <li key={index}>{project.name} ({project.vcs})</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
