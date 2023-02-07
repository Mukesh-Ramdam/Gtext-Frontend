import logo from './logo.svg';
import './App.css';
import ContactDetails from './pages/ContactDetails';
import { useGetAllContactsQuery } from './services/contactAPI';


function App() {
 

  return (
    <div className="App bg-zinc-900 pt-4 h-screen">
      <ContactDetails/>
    </div>
  );
}

export default App;
