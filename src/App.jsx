import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
const [menuItems, setMenuItems] = useState([]);


useEffect(() => {
  fetch("http://localhost:5001/api/menu")
    .then(res => res.json())
    .then(data => setMenuItems(data));
}, []);

  const [cart, setCart] = useState([]);

function addToCart(item) {
  setCart(prev => {
    const existing = prev.find(i => i.name === item.name);

    if (existing) {
      return prev.map(i =>
        i.name === item.name
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
    }
    return [...prev, { ...item, quantity: 1 }];
  });
}
  function removeFromCart(name) {
  setCart(prev =>
    prev
      .map(item =>
        item.name === name
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0)
  );
}

function placeOrder() {
  fetch("http://localhost:5001/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      items: cart,
      total: total
    })
  })
    .then(res => res.json())
    .then(() => {
      alert("Order placed!");
      setCart([]);
    });
}

const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return (
    <div className="container">

      {/* HERO */}
      <section className="hero">
        <h1>La Bella Bistro</h1>
      </section>

      {/* MENU */}
      <section>
        <h2>Menu</h2>

        <div className="menu">
          {menuItems.map((item, i) => (
            <div className="card" key={i}>
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <button onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section>
        <h2>Gallery</h2>
        <div className="gallery">
          <img src="/food1.jpg" />
          <img src="/food2.jpg" />
          <img src="/food3.jpg" />
          <img src="/food4.jpg" />
          <img src="/food5.jpg" />
          <img src="/food6.jpg" />
        </div>
      </section>

      {/* ABOUT */}
      <section className="about">
        <h2>About</h2>
        <p>
          A cozy Italian-inspired restaurant focused on fresh ingredients,
          handmade pasta, and traditional recipes with a modern twist.
        </p>
      </section>

      {/* CONTACT */}
      <section>
        <h2>Contact</h2>

        <iframe
          src="https://www.google.com/maps?q=860+Fulton+Street+Brooklyn&output=embed"
          width="100%"
          height="300"
        />

        <form className="contact-form">
          <input placeholder="Name" />
          <input placeholder="Email" />
          <textarea placeholder="Message" />
          <button>Send</button>
        </form>
      </section>

<section className="cart">
  <h2>Cart</h2>

  {cart.map((item) => (
    <div key={item.name}>
      <p>
        {item.name} x {item.quantity} - ${item.price * item.quantity}
      </p>

      <button onClick={() => removeFromCart(item.name)}>
        Remove
      </button>
    </div>
  ))}

  <h3>
    Total: ${cart.reduce((sum, i) => sum + i.price * i.quantity, 0)}
  </h3>

  {cart.length > 0 && (
    <button onClick={placeOrder}>
      Place Order
    </button>
  )}
</section>
      {/* FOOTER */}
      <footer>
        <p>Instagram | Facebook | Hours: 10am - 10pm</p>
      </footer>

    </div>
  );
}