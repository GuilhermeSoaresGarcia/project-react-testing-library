import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('4. Teste o componente <NotFound.js />', () => {
  test('4a - a página contém Page requested not found', () => {
    render(<NotFound />);
    const textNotFound = screen.getByRole('heading', {
      name: /page requested not found/i,
    });

    expect(textNotFound).toBeInTheDocument();
  });

  test('4b - se a página mostra a imagem de pikachu chorando', () => {
    render(<NotFound />);
    const imgNotFound = screen.getByRole('img', { name: /pikachu crying/i });

    expect(imgNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
