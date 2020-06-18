import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';

export default function Home() {
  const [products, setProducts] = useState([]);
  const amount = useSelector((state) =>
    state.cart.reduce((sumAmount, product) => {
      // If amount doens't exists set to 0
      sumAmount[product.id] = product.amount;

      return sumAmount;
    }, {})
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('products');

      // Se colocar direto no <span>{product.price}<span> toda vez que recarregar o render
      // vai executar a função. Dessa forma fica mais otimizado
      const data = response.data.map((product) => ({
        ...product,
        priceFormated: formatPrice(product.price),
      }));

      setProducts(data);
    }

    loadProducts();
    // [] - array vazio para executar somente uma vez, quando o componente for montado
  }, []);

  // Como não precisa utilizar o useCallback pois não depende de nenhuma outra info
  // somente o id que ela recebe
  function handleAddProduct(id) {
    // Triggers Redux actions
    dispatch(CartActions.addToCartRequest(id));
  }

  return (
    <ProductList>
      {products.map((product) => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormated}</span>

          <button type="button" onClick={() => handleAddProduct(product.id)}>
            <div>
              <MdAddShoppingCart size={16} color="#fff" />{' '}
              {amount[product.id] || 0}
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}
