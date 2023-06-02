import 'katex/dist/katex.min.css';
import Layout from './components/Layout';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import CardBody from './components/CardBody';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <CardBody/>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
