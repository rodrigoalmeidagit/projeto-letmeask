// Import Firebase
import { dataBase } from '../services/firebase';

// Import Hook
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';

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
import { Question } from '../components/Question';

// TypeScript
type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [ newQuestion, setNewQuestion ] = useState('');
  const { user } = useAuth();
  const { questions, title } = useRoom( roomId );

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
          <div>
            <RoomCode code={ roomId } />
            <Button isOutlined>Encerrar sala</Button>  
          </div>
        </div>
      </header>

      <main>      
        <div className="room-title">
          <h1>Sala { title }</h1>
          { questions.length > 0 && <span>{ questions.length } pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map( question => {
          return (
            <Question
              // Consultar doc - algoritmo de reconciliação
              key={ question.id } 
              content={ question.content }
              author={ question.author }            
            />
          );
        } ) }
        </div>
      </main>
    </div>
  );
}