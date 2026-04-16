import { Provider } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import { store } from "./redux/app/store";
import { AuthProvider } from "./context/AuthContext";


function App() {
  return (
    <>
      <Provider store={store}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Provider>
    </>
  );
}

export default App;