import { useEffect, useState } from "react";


function App() {
  const [candidates, setCandidates] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5500');
        const data = await res.json();
        setCandidates(data.candidates);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <>
    {candidates.map((candidate) => (
      <div key={candidate.id}>
        <h2>{candidate.name}</h2>
        <p>{candidate.email}</p>
      </div>
    ))}
    </>
  );
}

export default App;