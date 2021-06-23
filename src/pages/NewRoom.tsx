// Import Routes
import { Link } from 'react-router-dom';

// Import Assets
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import illustrationImg from '../assets/images/illustration.svg';

// Import Button Component
import { Button } from '../components/Button';

// Import CSS Style
import '../styles/auth.scss';

export function NewRoom() {
  return (
    <div className="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Toda pergunta tem <br />uma resposta.</strong>
        <p>Aprenda e compartilhe conhecimento <br />com outras pessoas</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="Logo Letmeask" />
          <h2>Crie uma nova sala</h2>
          <form>
            <input 
              type="text"
              placeholder="Nome da sala"
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
        </div>
      </main>
    </div>
  )
}