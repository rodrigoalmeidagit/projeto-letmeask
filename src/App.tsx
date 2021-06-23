// Import Routes
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Import Pages
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

// Import Context
import { AuthContextProvider } from './contexts/AuthContext';

function App() {  
  return (
    <BrowserRouter> 
      <AuthContextProvider>
        <Route path="/" exact component={ Home } />
        <Route path="/rooms/new" component={ NewRoom } />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;

