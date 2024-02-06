import './App.css';
import { Saludo } from './components/Saludo.jsx';
import { AppProvider } from './context/listTask';
import TaskList from './components/TaskList';
function App() {
  return (
    <>
      <header>
        <h1>To-Do App</h1>
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
