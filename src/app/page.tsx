'use client'; 

import Link from 'next/link'; 

const Home = () => {
  return (
    <div>
      <h1>Bienvenido a la Página de Inicio</h1>
      <p>
        <Link href="/login">Ir a Login</Link>
      </p>
      <p>
        <Link href="/register">Registrarse</Link>
      </p>
    </div>
  );
};

export default Home;