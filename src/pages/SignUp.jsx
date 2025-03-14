import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Signup.css';

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await api.post('/register', {
        email: data.email,
        password: data.password,
      });
      alert('Signup successful! Please log in.');
      navigate('/login');
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Signup</h2>
        <input
          {...register('name', { required: 'Name is required' })}
          placeholder="Name"
        />
        {errors.name && <p className="error-message">{errors.name.message}</p>}

        <input
          {...register('email', { required: 'Email is required' })}
          placeholder="Email"
        />
        {errors.email && <p className="error-message">{errors.email.message}</p>}

        <input
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 8, message: 'Password must be at least 8 characters' },
          })}
          type="password"
          placeholder="Password"
        />
        {errors.password && <p className="error-message">{errors.password.message}</p>}

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;