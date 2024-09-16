import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes";
import AuthProvaider from "./contexts/auth";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <BrowserRouter>
    <AuthProvaider>
      <ToastContainer autoClose={3000}></ToastContainer>
    <RoutesApp>

    </RoutesApp>
    </AuthProvaider>
    </BrowserRouter>

    
  );
}

export default App;
