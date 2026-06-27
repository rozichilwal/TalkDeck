import { useAuth } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import PageLoader from "./components/PageLoader";

const AuthPage = lazy(() => import("./pages/AuthPage"));
const CallPage = lazy(() => import("./pages/CallPage"));
const HomePage = lazy(() => import("./pages/HomePage"));

import * as Sentry from "@sentry/react";

const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);

const App = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;

  return (
    <Suspense fallback={<PageLoader />}>
      <SentryRoutes>
      <Route path="/" element={isSignedIn ? <HomePage /> : <Navigate to={"/auth"} replace />} />
      <Route path="/auth" element={!isSignedIn ? <AuthPage /> : <Navigate to={"/"} replace />} />

      <Route
        path="/call/:id"
        element={isSignedIn ? <CallPage /> : <Navigate to={"/auth"} replace />}
      />

      <Route
        path="*"
        element={isSignedIn ? <Navigate to={"/"} replace /> : <Navigate to={"/auth"} replace />}
      />
    </SentryRoutes>
    </Suspense>
  );
};

export default App;

// first version of routing:
// return (
//   <>
//     <SignedIn>
//       <SentryRoutes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/auth" element={<Navigate to={"/"} replace />} />
//       </SentryRoutes>
//     </SignedIn>

//     <SignedOut>
//       <SentryRoutes>
//         <Route path="/auth" element={<AuthPage />} />
//         <Route path="*" element={<Navigate to={"/auth"} replace />} />
//       </SentryRoutes>
//     </SignedOut>
//   </>
// );