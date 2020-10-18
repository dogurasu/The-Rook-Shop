import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
    <Header />
    {/* py-3 gives u spacing at the top */}
    <main className="py-3">
      <Container>
        <h1>Welcome to Ecommerce Shop</h1>
      </Container>
    </main>
    <Footer />
    </>
  );
}

export default App;
