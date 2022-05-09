import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('2. Teste o componente <About.js />', () => {
  test('2a - Teste se a página contém as informações sobre a Pokédex', () => {
    render(<About />);
    const aboutHeader = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    const aboutFirstParagraph = screen
    .getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémons');
    const aboutSecondParagraph = screen
    .getByText('One can filter Pokémons by type, and see more details for each one of them');
    const aboutImage = screen.getByRole('img', { name: 'Pokédex' });
    
    const paragraphLenght = [];
    
    if (aboutFirstParagraph) {
      paragraphLenght.push(1);
    }

    if (aboutSecondParagraph) {
      paragraphLenght.push(1);
    }

    expect(aboutHeader).toBeInTheDocument();
    expect(aboutFirstParagraph).toBeInTheDocument();
    expect(aboutSecondParagraph).toBeInTheDocument();
    expect(paragraphLenght).toHaveLength(2);
    expect(aboutImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
