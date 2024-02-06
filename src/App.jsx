import './App.css';
import { Saludo } from './components/Saludo.jsx';
import { AppProvider } from './context/listTask';
import TaskList from './components/TaskList';
function App() {
  return (
    <>
      <header>
        <Saludo></Saludo>
      </header>
      <main>
          <AppProvider>
            <div className="App">
              <TaskList />
            </div>
          </AppProvider>
      </main>
      </>
  );
}

export default App;
