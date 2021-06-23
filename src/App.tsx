// Import Routes
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Import Pages
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from './pages/Room';

// Import Context
import { AuthContextProvider } from './contexts/AuthContext';


function App() {  
  return (
    <BrowserRouter> 
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={ Home } />
          <Route path="/rooms/new" component={ NewRoom } />
          <Route path="/rooms/:id" component={ Room } />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;

