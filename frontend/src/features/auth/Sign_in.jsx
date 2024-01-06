
import { useSigninMutation } from './authApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentails } from './authSlice';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form'
import { object, string} from 'yup';
import GoogleAuth from '../../firebase/GoogleAuth';



const Sign_in = () => {
    const location = useLocation();

    const from = location.state?.from?.pathname || "/profile";

    // yup validation
    const userValidatorSchema = object().shape({
        email:string().email().required('email is required'),
        password: string().min(5, 'password must be at least 5').required()
    });

    // connecting yup with react-hook

    const {
        register, formState:{errors}, handleSubmit, reset 
    } = useForm({
        resolver: yupResolver(userValidatorSchema),
        reValidateMode: 'onChange',
        criteriaMode: 'all',
        mode: 'onBlur'
    });



    const navigate = useNavigate();

    const dispatch =  useDispatch();
    const [ signIn, {isLoading}] = useSigninMutation();


    const onSubmit = async( data) => {
        const email = data.email;
        try {
            const  userData= await signIn(data).unwrap();
            const username = userData.user
            dispatch(setCredentails({...userData, email, username  }))
            toast.success(userData.message)
           reset()
            navigate(from, {replace: true})
            
        } catch (err) {
            toast.error(`${err.data.message}`)
        }
    };

   
  return (
    <section className='flexContainer'>
        { isLoading? <p>Loading ...</p> : 
        <div >
            <h2 className='text-center my-4 capitalize'> welcome to noble's estate</h2>
            <h3 className='text-center my-4 capitalize text-blue-800'>Sign in here...</h3>
      
            <form onSubmit={handleSubmit(onSubmit)}  > 

                <label htmlFor='email'> Email: <br/>
                    <input type='email' placeholder='Enter Your Email' id='email'  
                     {...register('email')} />
                     {errors.email?.message && <p className='errMsg'>{errors.email?.message}</p>}
                </label> 

                <label htmlFor='password'> Password: <br/>
                    <input type='password' placeholder='Enter Your password' id='password' autoComplete='off'
                     {...register('password')}
                    />
                    {errors.password?.message && <p className='errMsg'>{errors.password?.message}</p>}
                </label>

                <p className='text-red-500 '>
                    NOTE: your email must be verified before trying to login
                </p>
                
                <button  className='btn btn-prim w-full'>
                    Sign in
                </button>
                <p>Don't have an account? <Link className='text-blue-600' to={'/signup'}>Sign_Up</Link></p>
            </form>
        </div>
        }
          <GoogleAuth />
        <ToastContainer 
            autoClose={1500}
            draggable
            theme='dark'
        />
</section>
  )
}

export default Sign_in
