import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        setError(data.message || "An error occurred");
        setLoading(false);
        return;
      }

      console.log(data);
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
      navigate('/');
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input 
          type="email" 
          placeholder='Email' 
          className='border p-3 rounded-lg' 
          id='email' 
          onChange={handleChange}
          required 
        />
        <input 
          type="password" 
          placeholder='Password' 
          className='border p-3 rounded-lg' 
          id='password' 
          onChange={handleChange}
          required 
        />
        <button 
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign In"}
        </button>
        {error && <div className="text-red-500">{error}</div>}
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
    </div>
  );
}
