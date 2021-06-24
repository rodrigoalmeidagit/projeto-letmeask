// Import Routes
import { useHistory } from 'react-router';

// Import React
import { useState } from 'react';
import { FormEvent } from 'react';

// Import Firebase
import { dataBase } from '../services/firebase';

// Import Auth
import { useAuth } from '../hooks/useAuth';

// Import Assets
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import illustrationImg from '../assets/images/illustration.svg';

// Import Button Component
import { Button } from '../components/Button';

// Import CSS Style
import '../styles/auth.scss';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [ roomCode, setRoomCode ] = useState('');

  async function handleCreateRoom() {
    if( !user ) {
      await signInWithGoogle();
    }

    history.push( '/rooms/new' );
  }
  
  async function handleJoinRoom( event: FormEvent ) {
    event.preventDefault();

    if( roomCode.trim() === '' ) {
      return;
    }

    const roomRef = await dataBase.ref( `rooms/${ roomCode }` ).get();

    if( !roomRef.exists() ) {
      alert( 'Room does not exist!' );
      return;
    }

    history.push( `/rooms/${ roomCode }`);    
  }

  return (
    <div className="page-auth">
      <aside>
        <img 
          src={ illustrationImg } 
          alt="Ilustração simbolizando perguntas e respostas" 
        />
        <strong>Toda pergunta tem <br />uma resposta.</strong>
        <p>Aprenda e compartilhe conhecimento <br />com outras pessoas</p>
      </aside>

      <main>
        <div className="main-content">
          <img 
            src={ logoImg } 
            alt="Logo Letmeask" 
          />
          <button onClick={ handleCreateRoom } className="create-room">
            <img 
              src={ googleIconImg } 
              alt="Logo do Google" 
            />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={ handleJoinRoom }>
            <input 
              type="text"
              placeholder="Digite o código da sala"
              onChange={ event => setRoomCode( event.target.value ) }
              value={ roomCode }
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