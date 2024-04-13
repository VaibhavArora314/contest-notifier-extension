import './App.css'
import axios from 'axios'
import ContestList from './components/ContestList';

// axios.defaults.baseURL = "http://localhost:3000/api";
axios.defaults.baseURL = "https://cp-list.vercel.app/api";

function App() {
  // const [contests,setContests] = ;

  return (
    <div className='min-h-[100vh] p-4 bg-gray-100'>
      <div className='container mx-auto h-full'>
        <div className='flex flex-col items-center min-h-[60vh] justify-between'>
          <h1 className='font-semibold text-2xl'>Upcoming Contests</h1>

          <ContestList/>
        </div>
      </div>
    </div>
  )
}

export default App
