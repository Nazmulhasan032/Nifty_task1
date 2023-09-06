import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [card, setCard] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("Card.json")
      .then((res) => res.json())
      .then((data) => setCard(data));
  }, []);

  const addToCart = (item) => {
    const existingCartItemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);

    if (existingCartItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingCartItemIndex].quantity += 1;
      setCart(updatedCart);
      localStorage.setItem('shoppingCart', JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cart, { ...item, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem('shoppingCart', JSON.stringify(updatedCart));
    }
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
    localStorage.setItem('shoppingCart', JSON.stringify(updatedCart));
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('shoppingCart'));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <>
      <div className="navbar bg-base-100 container mx-auto">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Shopping Cart</a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <span className="badge badge-sm indicator-item">{cart.length}</span>
              </div>
            </label>
            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-full md:w-80 bg-base-100 shadow">
              <div className="card-body">
                <span className="font-bold text-lg">Total Items: {cart.length}</span>
                  {cart.map((cartItem) => (
                    <div key={cartItem.id} className="flex justify-between items-center mb-2">
                      <p className="flex-grow">
                        {cartItem.name} (Quantity: {cartItem.quantity})
                      </p>
                      <p className="ml-2">
                        ${cartItem.price.toFixed(2)}
                      </p>
                      <button onClick={() => removeFromCart(cartItem.id)} className="text-red-500 ml-2">
                        Remove
                      </button>
                    </div>
                  ))}
    
                  <p className="font-bold mt-4">Total: ${getTotalPrice().toFixed(2)}</p>
                </div>
              </div>
          </div>
        </div>
      </div>

      {/* card icon */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 container mx-auto">
        {card.map((item) => (
          <div key={item.id} className="card card-compact bg-base-100 shadow-xl">
            <figure><img src={item.image} alt="image" /></figure>
            <div className="card-body">
              <h2 className="card-title">Name: {item.name}</h2>
              <p className="text-left">Price: ${item.price}</p>
              <div className="card-actions justify-end">
                <button onClick={() => addToCart(item)} className="btn btn-primary">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
