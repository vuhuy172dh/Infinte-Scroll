import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { queryClientConfig } from './lib/queryClient/index.ts';
import HomePage from './pages/HomePage.tsx';

const queryClient = new QueryClient(queryClientConfig);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HomePage />
    </QueryClientProvider>
  );
};

export default App;
