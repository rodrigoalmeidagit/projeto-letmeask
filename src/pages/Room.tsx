// Import Firebase
import { dataBase } from '../services/firebase';

// Import Hook
import { useAuth } from '../hooks/useAuth';

// Import React
import { FormEvent, useState } from 'react';

// Import React Router
import { useParams } from 'react-router';

// Import Components
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';

// Import Img
import logoImg from '../assets/images/logo.svg';

// Import CSS Style
import '../styles/room.scss';

// TypeScript
type RoomParams = {
  id: string;
}

export function Room() {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [ newQuestion, setNewQuestion ] = useState('');
  const { user } = useAuth();

  async function handleSendQuestion( event: FormEvent) {    
    event.preventDefault();
    if( newQuestion.trim() === '' ) {
      return;
    }
    
    if( !user ) {
      throw new Error('You must be logged in!')
    }
    
    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighLighter: false,
      isAnswered: false
    };

    await dataBase.ref( `rooms/${ roomId }/questions` ).push( question )

    setNewQuestion('');
  }

  return(
    <div className="page-room">      
      <header>
        <div className="content">
          <img src={ logoImg } alt="Logo Letmeask" />
          <RoomCode code={ roomId } />
        </div>
      </header>

      <main>      
        <div className="room-title">
          <h1>Sala React</h1>
          <span>4 perguntas</span>
        </div>

        <form onSubmit={ handleSendQuestion }>
          <textarea 
            placeholder="O que você quer perguntar?"
            onChange={ event => setNewQuestion( event.target.value )}
            value={ newQuestion }
          />

          <div className="form-footer">
            { user ? (
              <div className="user-info">
                <img src={ user.avatar } alt={ user.name } />
                <span>{ user.name }</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
            ) }

            
            <Button type="submit" disabled={ !user }>Enviar pergunta</Button>
          </div>          
        </form>
      </main>
    </div>
  );
}