import { useState } from 'react';

import { FiMail, FiLock } from 'react-icons/fi'
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { Container, Form, Background } from './styles';

export function SignIn() {

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const { signIn } = useAuth();

   function handleSignIn(event) {
      event.preventDefault()
      signIn({ email, password });
   }

   return (
      <Container>
         <Form>
            <h1>Rocket Notes</h1>
            <p>Aplicação para salvar e gerenciar seus links úteis</p>

            <h2>Faça seu login</h2>

            <Input
               type="email"
               placeholder="E-mail"
               icon={FiMail}
               onChange={event => setEmail(event.target.value)}
            />

            <Input
               type="password"
               placeholder="Senha"
               icon={FiLock}
               onChange={event => setPassword(event.target.value)}
            />

            <Button title="Entrar" onClick={handleSignIn} type="submit" />

            <Link to="/register">
               Criar conta
            </Link>
         </Form>

         <Background />
      </Container>
   );
}