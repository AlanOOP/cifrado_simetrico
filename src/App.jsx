import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Alerta from './components/Alerta'

import CryptoJS from 'crypto-js'

function App() {
  const [count, setCount] = useState(0)

  const [opcion, setOpcion] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [mensajeCifrado, setMensajeCifrado] = useState('')

  const [alerta, setAlerta] = useState({})


  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(opcion)
    console.log(mensaje)
    
    //cifrado del mensaje crypto-js
    if(opcion === '1'){
      
      const text = CryptoJS.AES.encrypt(JSON.stringify(mensaje), 'secret key 123').toString(); 
      setMensajeCifrado(text)
    }else if(opcion === '2'){
      
      try{
        const bytes  = CryptoJS.AES.decrypt(mensaje, 'secret key 123');
        const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
        setMensajeCifrado(decryptedString)
      }catch(e){
        console.log(e)
        setAlerta({
          msg: 'El mensaje no se puede descifrar',
          error: true
        })
        setTimeout(() => {
          setAlerta({})
        }, 3000);
      }
    }

  }

  const { msg } = alerta

  return (
    <>

    <main className='container mx-auto mt-5 md:mt-10 p-5 md:flex md:justify-center'>

      <div className='md:w-2/3 lg:w-2/5'>

        <h1 className="text-sky-600 font-black text-6xl capitalize text-center">Cifrado {''}
              <span className="text-slate-700">Simetrico</span>
          </h1>

          {msg && <Alerta alerta={alerta } />}
      
          <form 
              className="my-10 bg-white shadow rounded-lg p-10"
              onSubmit={handleSubmit}
          >   
              <div className='my-5'>
                  <label htmlFor="opcion" className='uppercase text-gray-600 block text-xl font-bold'>
                      Eliga una opcion:  
                  </label>        
                  <select 
                      className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                      id='opcion'
                      value={opcion}
                      onChange={(e) => setOpcion(e.target.value)}
                  >
                      <option value="">--Seleccione--</option>
                      <option value="1" className='mt-3 p-3 border rounded-xl bg-gray-50'>Cifrar</option>
                      <option value="2" className='mt-3 p-3 border rounded-xl bg-gray-50'>Descifrar</option>
                  </select>
              </div>
              <div className="my-5">
                  <label 
                      className="uppercase text-gray-600 block text-xl font-bold"
                      htmlFor="text"
                  >Ingrese su mensaje: </label>
                  <textarea
                      id="text"
                      type="textarea"
                      placeholder="Mensaje "
                      className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                      value={mensaje}
                      onChange={(e) => setMensaje(e.target.value)}
                  />
              </div>


              <input 
                  type="submit"
                  value="Aceptar"
                  className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
              />

              
          </form>

          <div className='my-5'>
            <label htmlFor="" className=''>
              Resultado:
            </label>

            <p>
              {mensajeCifrado}
            </p>
          </div>
      </div>

      </main>
    </>
  )
}

export default App
