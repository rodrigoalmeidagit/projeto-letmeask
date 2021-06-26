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
}

export function Question( { content, author, children }: QuestionsProps ) {
  return (
    <div className="question">
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