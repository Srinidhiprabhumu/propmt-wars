import axios from 'axios';
import { Problem } from '../data/dsaProblems';

const API_URL = 'http://localhost:5000/api';

// Get all problems
export const fetchProblems = async (): Promise<Problem[]> => {
  try {
    const { data } = await axios.get(`${API_URL}/problems`);
    return data.map((problem: any) => ({
      id: problem.id,
      title: problem.title,
      description: problem.description,
      difficulty: problem.difficulty,
      sampleTests: problem.sampleTests,
      hiddenTests: problem.hiddenTests,
      starterCode: problem.starterCode,
      suggestedApproach: problem.suggestedApproach
    }));
  } catch (error) {
    console.error('Error fetching problems:', error);
    throw error;
  }
};

// Get problem by ID
export const fetchProblemById = async (id: string): Promise<Problem> => {
  try {
    const { data } = await axios.get(`${API_URL}/problems/${id}`);
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      difficulty: data.difficulty,
      sampleTests: data.sampleTests,
      hiddenTests: data.hiddenTests,
      starterCode: data.starterCode,
      suggestedApproach: data.suggestedApproach
    };
  } catch (error) {
    console.error(`Error fetching problem ${id}:`, error);
    throw error;
  }
};

// For admin use - create problem
export const createProblem = async (problem: Problem, token: string): Promise<Problem> => {
  try {
    const { data } = await axios.post(
      `${API_URL}/problems`,
      problem,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return data;
  } catch (error) {
    console.error('Error creating problem:', error);
    throw error;
  }
};

// For admin use - update problem
export const updateProblem = async (id: string, problem: Problem, token: string): Promise<Problem> => {
  try {
    const { data } = await axios.put(
      `${API_URL}/problems/${id}`,
      problem,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return data;
  } catch (error) {
    console.error(`Error updating problem ${id}:`, error);
    throw error;
  }
};

// For admin use - delete problem
export const deleteProblem = async (id: string, token: string): Promise<void> => {
  try {
    await axios.delete(
      `${API_URL}/problems/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  } catch (error) {
    console.error(`Error deleting problem ${id}:`, error);
    throw error;
  }
}; 