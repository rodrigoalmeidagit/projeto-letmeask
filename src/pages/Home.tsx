// Import Routes
import { useHistory } from 'react-router';

// Import Assets
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import illustrationImg from '../assets/images/illustration.svg';

// Import Button Component
import { Button } from '../components/Button';

// Import CSS Style
import '../styles/auth.scss';

export function Home() {
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
          <button className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input 
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button type="submit">
              Entrar na Sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}