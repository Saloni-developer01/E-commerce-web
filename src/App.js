import React, { useState, useEffect, createContext, useContext } from 'react';
import './App.css';
import Footer from './components/Footer';
import PromoBanner from './components/PromoBanner';

// Tailwind CSS CDN ko load karne ke liye
const tailwindScript = document.createElement('script');
tailwindScript.src = 'https://cdn.tailwindcss.com';
document.head.appendChild(tailwindScript);

// User Auth aur Cart ke liye context 
const UserContext = createContext(null);
const CartContext = createContext(null);

const PRODUCTS_DATA = [
  { id: 1, name: "Cool T-shirt", category: "Apparel", price: 250, imageUrl: "CoolTShirt.webp" },
  { id: 2, name: "Stylish Jeans", category: "Apparel", price: 600, imageUrl: "stylishJeans.avif" },
  { id: 3, name: "Wireless Headphones", category: "Electronics", price: 550, imageUrl: "wirelessHeadphones.avif" },
  { id: 4, name: "Smart Watch", category: "Electronics", price: 200, imageUrl: "smartWatch.avif" },
  { id: 5, name: "Gaming Mouse", category: "Electronics", price: 475, imageUrl: "gamingMouse.avif" },
  { id: 6, name: "Running Shoes", category: "Footwear", price: 250, imageUrl: "shoes.avif" },
  { id: 8, name: "Classic Camera", category: "Electronics", price: 900, imageUrl: "classicCamera.avif" },
  { id: 9, name: "Sunglasses", category: "Accessories", price: 150, imageUrl: "sunglasses.avif" },
  { id: 10, name: "Hoodie", category: "Apparel", price: 400, imageUrl: "hoddies.avif" },
  { id: 11, name: "Leather Backpack", category: "Apparel", price: 450, imageUrl: "leatherBackpack.avif" },
  { id: 12, name: "Formal Shoes", category: "Footwear", price: 550, imageUrl: "formalShoes.avif" },
  { id: 13, name: "Belt", category: "Accessories", price: 300, imageUrl: "belt.avif" },
];

const ProductCard = ({ product }) => {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useContext(UserContext);

  const handleAddToCart = () => {
    if (!user) {
      alert("Please log in to add items to the cart.");
      return;
    }
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
      <p className="text-gray-500 text-sm">{product.category}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-xl font-bold price">&#8377;{product.price}</span>
        <button
          onClick={handleAddToCart}
          className="addToCard text-white px-4 py-2 rounded-md shadow-lg transition duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};


const ProductListingPage = () => {
  const [items, setItems] = useState(PRODUCTS_DATA);
  const [filters, setFilters] = useState({ category: "All", minPrice: "", maxPrice: "" });

  const categories = ["All", ...new Set(PRODUCTS_DATA.map(p => p.category))];

  useEffect(() => {
    let filteredItems = PRODUCTS_DATA;

    // Category filter
    if (filters.category !== "All") {
      filteredItems = filteredItems.filter(item => item.category === filters.category);
    }

    // Price range filter
    const min = parseFloat(filters.minPrice);
    const max = parseFloat(filters.maxPrice);

    if (!isNaN(min)) {
      filteredItems = filteredItems.filter(item => item.price >= min);
    }
    if (!isNaN(max)) {
      filteredItems = filteredItems.filter(item => item.price <= max);
    }
    
    setItems(filteredItems);
  }, [filters]);

 

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      {/* <div className="banner-container">
        <div className="banner-content">
        <span className="banner-icon">🛒</span>
        <h2>TRENDING PRODUCTS</h2>
        <p>Discover the Latest Deals</p>
        <span className="banner-icon">⭐</span>
        </div>
      </div> */}


     <div className="summer-banner-container">
    <div className="summer-banner-content">
        <div className="summer-banner-text-wrapper">
            <h2>SUMMER COLLECTION 2025</h2>
            <p>Step into the New Season</p>
            <a href="#" className="summer-shop-now-btn">Shop Now</a>
        </div>
        <div className="summer-banner-image">
            <img src="banner.jpg" alt="Summer Collection Models"/>
        </div>
    </div>
</div>


      {/* <h2 className="text-4xl font-extrabold text-center text-gray-800 my-8 tracking-tight">Product Listing</h2> */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4 bg-white p-6 rounded-lg shadow-md border border-gray-200 h-fit">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Filters</h3>
          
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Categories</h4>
            <ul className="space-y-2">
              {categories.map(category => (
                <li key={category}>
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, category }))}
                    className={`w-full text-left py-2 px-4 rounded-md transition-colors duration-200 ${
                      filters.category === category
                        ? 'filters text-white font-medium shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Price Sort</h4>
            <div className="flex space-x-2">
              <button
                onClick={() => setItems([...items].sort((a, b) => a.price - b.price))}
                className="w-1/2 bg-gray-100 text-gray-700 py-2 rounded-md transition duration-200 price"
              >
                Low to High
              </button>
              <button
                onClick={() => setItems([...items].sort((a, b) => b.price - a.price))}
                className="w-1/2 bg-gray-100 text-gray-700 py-2 rounded-md transition duration-200 price"
              >
                High to Low
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {items.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

const CartPage = () => {
  const { cart, setCart } = useContext(CartContext);
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleRemoveItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 my-8 tracking-tight">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <div className="bg-white rounded-lg shadow-xl p-6">
          <ul className="divide-y divide-gray-200">
            {cart.map(item => (
              <li key={item.id} className="py-4 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-500">&#8377;{item.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      -
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 transition duration-300"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-between items-center border-t border-gray-200 pt-6">
            <span className="text-xl font-bold text-gray-800">Total:</span>
            <span className="text-2xl font-bold price">&#8377;{total.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const SignupPage = ({ onNavigate }) => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    // Yahan hum fake authentication logic use kar rahe hain
    // Real app mein, yeh backend API ko call karega
    const newUser = { email };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify("userInfo"));
    alert('Signup successful!');
    onNavigate('products');
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full login text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition duration-300"
        >
          Sign Up
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a onClick={() => onNavigate('login')} className="signupText hover:underline cursor-pointer">
            Log In
          </a>
        </p>
      </form>
    </div>
  );
};

const LoginPage = ({ onNavigate }) => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Yahan bhi hum fake login logic use kar rahe hain
    const mockUser = { email };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify("userInfo"));
    alert('Login successful!');
    onNavigate('products');
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Log In</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full login text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition duration-300"
        >
          Log In
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a onClick={() => onNavigate('signup')} className="signupText hover:underline cursor-pointer">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

const Header = ({ onNavigate }) => {
  const { user, setUser } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    setUser(null);
    alert('Logged out successfully!');
    onNavigate('login');
  };

  return (
    <header className="bg-white p-7 shadow-md">
      <div className="container mx-auto flex justify-between items-center max-w-7xl">
        <h1 className="text-4xl font-bold cursor-pointer logo" onClick={() => onNavigate('products')}><span>Dash</span>Deals.</h1>
        <nav className="flex items-center space-x-6">
          <a onClick={() => onNavigate('products')} className=" cursor-pointer transition-colors duration-200 items">Products</a>
          <a onClick={() => onNavigate('cart')} className="relative cursor-pointer transition-colors duration-200 items">
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 addToCard text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </a>
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="size-6 rounded-full cursor-pointer"><img src='avatar.png'/></span>
              <button
                onClick={handleLogout}
                className="addToCard text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-2">
              <button
                onClick={() => onNavigate('login')}
                className=" text-white px-3 py-1 rounded-md hover:bg-pink-700 transition duration-300 login"
              >
                Login
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};




// Main application component
export default function App() {
  const [currentPage, setCurrentPage] = useState('products');
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  // Check for persistent user and cart data on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      // Logged-in user ke liye, cart data load 
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    }
  }, []);

  // Cart state change hone par localStorage update 
  useEffect(() => {
    if (user) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, user]);

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'signup':
        return <SignupPage onNavigate={navigateTo} />;
      case 'login':
        return <LoginPage onNavigate={navigateTo} />;
      case 'cart':
        return <CartPage />;
      case 'products':
      default:
        return <ProductListingPage />;
    }
  };

  return (
    <div className="main min-h-screen font-sans antialiased">
      <UserContext.Provider value={{ user, setUser }}>
        <CartContext.Provider value={{ cart, setCart }}>
          <Header onNavigate={navigateTo} />
          <main className="py-8">
            {renderPage()}
            {/* <PromoBanner/> */}
          </main>
            <Footer/>
        </CartContext.Provider>
      </UserContext.Provider>
    </div>
  );
}


