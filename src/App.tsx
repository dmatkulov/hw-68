import Todos from "./containers/Todos/Todos";
import Layout from "./components/Layout/Layout";
import TodoForm from "./components/TodoForm/TodoForm";

function App() {
  return (
    <>
      <Layout>
        <TodoForm/>
        <Todos/>
      </Layout>
    </>
  );
}

export default App;
