import { RiShutDownLine } from 'react-icons/ri';
import { useAuth } from '../../hooks/auth';



import { Container, Profile, Logout } from './styles';

export function Header() {

    const { signOut } = useAuth();

    return (

        <Container>
            <Profile to="/profile">
                <img src="https://github.com/guipradocardoso.png" alt="Imagem do Usuário" />

                <div>
                    <span>Bem-Vindo</span>
                    <strong>Guilherme Prado</strong>
                </div>
            </Profile>

            <Logout onClick={signOut}>
                <RiShutDownLine />
            </Logout>

        </Container>
    )
}
