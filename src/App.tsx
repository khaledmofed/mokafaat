import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "@constants/AppRoutes";
import Layout from "@components/Layout";
import { InquiryModalProvider } from "@context";
import { InquiryModal } from "@components";
import AuthApiBootstrap from "@components/AuthApiBootstrap";

function App() {
  const layoutRoutes = routes.filter((route) => route.inLayout);
  const noLayoutRoutes = routes.filter((route) => !route.inLayout);

  return (
    <InquiryModalProvider>
      <AuthApiBootstrap />
      <Router>
        <Routes>
          {/* Routes that use Layout */}
          <Route element={<Layout />}>
            {layoutRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.element />}
              />
            ))}
          </Route>

          {/* Routes that do NOT use Layout */}
          {noLayoutRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
        </Routes>
      </Router>
      <InquiryModal />
    </InquiryModalProvider>
  );
}

export default App;
