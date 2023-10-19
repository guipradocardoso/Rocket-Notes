import { FiMail, FiLock } from 'react-icons/fi'
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { Container, Form, Background } from './styles';

export function SignIn() {

   const data = useAuth();
   console.log("Meu Contexto =>", data);
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
            />

            <Input
               type="password"
               placeholder="Senha"
               icon={FiLock}
            />

            <Button title="Entrar" />

            <Link to="/register">
               Criar conta
            </Link>
         </Form>

         <Background />
      </Container>
   );
}