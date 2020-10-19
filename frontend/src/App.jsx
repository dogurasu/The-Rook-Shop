import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; // uses HTML5 History API - uses push state, replace state, Hash Router uses hash portion of the URL
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

const App = () => {
  return (
    <Router>
      <Header />
      {/* py-3 gives u spacing at the top */}
      <main className="py-3">
        <Container>
          {/* // path prop is path, component prop is what component we want to render at that route, exact means we HAVE to have the exact '/' path to render a HomeScreen component */}
          <Route path='/' component={HomeScreen} exact />
          <Route path='/product/:id' component={ProductScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
