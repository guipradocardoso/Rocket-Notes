import { RiShutDownLine } from 'react-icons/ri'



import { Container, Profile, Logout } from './styles';

export function Header() {

    return (

        <Container>
            <Profile>
                <img src="https://github.com/guipradocardoso.png" alt="Imagem do Usuário" />

                <div>
                    <span>Bem-Vindo</span>
                    <strong>Guilherme Prado</strong>
                </div>
            </Profile>

            <Logout>
                <RiShutDownLine />
            </Logout>

        </Container>
    )
}
