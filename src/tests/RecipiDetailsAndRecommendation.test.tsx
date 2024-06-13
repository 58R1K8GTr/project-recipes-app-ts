// import React from 'react';
// import { render, screen, waitFor } from '@testing-library/react';
// import { vi } from 'vitest';
// import RecipeDetails from '../components/RecipeDetails';

// describe('Testar o RecipeDetails.', () => {
//   it('Verifica se o carregando é renderizado', async () => {
//     vi.spyOn(global, 'fetch');
//     render(<RecipeDetails />);
//     const carregando = await screen.findByText(/Loading.../i);
//     expect(carregando).toBeInTheDocument();
//   });

//   it('Verifica se os detalhes da receita são renderizados corretamente', async () => {
//     vi.spyOn(global, 'fetch').mockResolvedValue({
//       ok: true,
//       json: async () => ({
//         meals: [{
//           idMeal: '52977',
//           strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
//           strMeal: 'Corba',
//           strCategory: 'Side',
//           strInstructions: 'Pick through your lentils...',
//           strYoutube: 'https://www.youtube.com/watch?v=VVnZd8A84z4',
//           strIngredient1: 'Lentils',
//           strMeasure1: '1 cup',
//         }],
//       }),
//     } as Response);

//     render(<RecipeDetails />);

//     // await waitFor(() => expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument());

//     const recipeTitle = await screen.findByTestId('recipe-title');
//     const recipeCategory = await screen.findByTestId('recipe-category');
//     const instructions = await screen.findByTestId('instructions');
//     const video = await screen.findByTestId('video');

//     expect(recipeTitle).toHaveTextContent('Corba');
//     expect(recipeCategory).toHaveTextContent('Side');
//     expect(instructions).toHaveTextContent('Pick through your lentils...');
//     expect(video).toHaveAttribute('src', 'https://www.youtube.com/embed/VVnZd8A84z4');
//   });

//   it('Verifica se as recomendações são renderizadas corretamente', async () => {
//     vi.spyOn(global, 'fetch').mockResolvedValueOnce({
//       ok: true,
//       json: async () => ({
//         drinks: [
//           { idDrink: '1', strDrink: 'Recommendation 1' },
//           { idDrink: '2', strDrink: 'Recommendation 2' },
//         ],
//       }),
//     } as Response);

//     render(<RecipeDetails />);

//     await waitFor(() => expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument());

//     const recommendation1 = await screen.findByText('Recommendation 1');
//     const recommendation2 = await screen.findByText('Recommendation 2');

//     expect(recommendation1).toBeInTheDocument();
//     expect(recommendation2).toBeInTheDocument();
//   });
// });
