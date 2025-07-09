import TodoPage from "../pages/TodoPage";
import LoginPage from "../pages/LoginPage";

function App() {
  const isAuth = false;

  return (
    <div className="todo-main-container">
      {isAuth ? <TodoPage /> : <LoginPage />}
    </div>
  );
}

export default App;
