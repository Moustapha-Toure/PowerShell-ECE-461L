import '@/styles/globals.css'
import { StateContext } from '@/context/StateContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function App({ Component, pageProps }) {

  return (
    <StateContext>
      <Component {...pageProps} />
      <div id='toastNotification'>
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </StateContext>
  )
}
