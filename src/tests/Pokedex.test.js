import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('5. Teste o componente <Pokedex.js />', () => {
  test('5a - contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const pokedexHeader = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(pokedexHeader).toBeInTheDocument();
  });

  test('5b - exibido o próximo pokémon quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
    const nextPokeButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPokeButton);
    expect(pikachu.textContent).toBe('Charmander');
  });

  test('5c - se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    const imgPokemon = screen.getAllByRole('img');
    expect(imgPokemon).toHaveLength(1);
  });

  test('5d - se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: /all/i });
    const electricButton = screen.getByRole('button', { name: /electric/i });
    const fireButton = screen.getByRole('button', { name: /fire/i });
    const bugButton = screen.getByRole('button', { name: /bug/i });
    const poisonButton = screen.getByRole('button', { name: /poison/i });
    const psychicButton = screen.getByRole('button', { name: /psychic/i });
    const normalButton = screen.getByRole('button', { name: /normal/i });
    const dragonButton = screen.getByRole('button', { name: /dragon/i });
    expect(allButton).toBeInTheDocument();
    expect(electricButton).toBeInTheDocument();
    expect(fireButton).toBeInTheDocument();
    expect(bugButton).toBeInTheDocument();
    expect(poisonButton).toBeInTheDocument();
    expect(psychicButton).toBeInTheDocument();
    expect(normalButton).toBeInTheDocument();
    expect(dragonButton).toBeInTheDocument();
  });
});
