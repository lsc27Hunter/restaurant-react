import { useState } from "react";
import "./App.css";

export default function App() {
  const menuItems = [
    { name: "Bruschetta", price: 13 },
    { name: "Margherita Pizza", price: 18 },
    { name: "Spaghetti Pomodoro", price: 16 },
    { name: "Grilled Tagliata", price: 22 },
    { name: "Tiramisu", price: 8 }
  ];

  const [cart, setCart] = useState([]);

  function addToCart(item) {
    setCart([...cart, item]);
  }

  const total = cart.reduce((sum, i) => sum + i.price, 0);

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
          <img src="public/food1.jpg" />
          <img src="public/food2.jpg" />
          <img src="public/food3.jpg" />
          <img src="public/food4.jpg" />
          <img src="public/food5.jpg" />
          <img src="public/food6.jpg" />
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

      {/* CART */}
      <section className="cart">
        <h2>Cart</h2>

        {cart.map((item, i) => (
          <p key={i}>
            {item.name} - ${item.price}
          </p>
        ))}

        <h3>Total: ${total}</h3>
      </section>

      {/* FOOTER */}
      <footer>
        <p>Instagram | Facebook | Hours: 10am - 10pm</p>
      </footer>

    </div>
  );
}