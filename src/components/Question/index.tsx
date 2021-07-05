// Import React
import { ReactNode } from 'react';

// Import CSS Style
import './style.scss'

// TypeScript
type QuestionsProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children?: ReactNode;
  isAnswered?: boolean;
  isHighLighter?: boolean;
}

export function Question( 
  { content, 
    author, 
    children,
    isAnswered = false,
    isHighLighter = false,
  }: QuestionsProps ) {
  return (
    <div className={`question 
      ${isAnswered ? 'answered' : ''} 
      ${isHighLighter ? 'highlighted' : ''} 
    `}>
      <p>{ content }</p>
      <footer>
        <div className="user-info">
          <img src={ author.avatar } alt="{ author.avatar }" />
          <span>{ author.name }</span>
        </div>
        <div>{ children }</div>
      </footer>
    </div>
  );
}