import { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik';
import Alerta from '../../components/Alerta';
import Element from './Element';
import { getDate, formatMoney } from '../../funtions/funtions';


const Sales = ({ sales, auxSales, setAuxSales }) => {
  const getTotal = () => {

  }
  const [selectDate, setSelectDate] = useState(getDate());
  const [mensaje, setMensaje] = useState('');
  const [total, setTotal] = useState();

  const getSalesDate = date => {
    const aux = sales.filter(e => e.status === 1 && e.created_at.includes(date));
    let a = 0;
    aux.forEach(e => a += e.total);
    setTotal(a);
    setAuxSales(aux);
  }

  useEffect(() => {//mostrar las ventas de hoy
    getSalesDate(getDate());
  }, []);



  const handleSubmit = ({ date }) => {//mostrar ventas for fecha ingresada
    if (date !== '') {
      setMensaje('');
      getSalesDate(date);
    } else {
      setMensaje('Seleccione una fecha válida');//verificar la fecha
    }

  }

  return (
    <>
      <div className="flex mb-5">
        <div className='w-1/4'>
          <h1 className='font-black text-4xl text-blue-800'>Ventas</h1>
          <p className="mt-3">Administra tus Ventas</p>
        </div>
        <div className="w-3/4 mt-1 text-right">
          {total !== 0 &&
            <p className="text-6xl font-black text-blue-800">Total:
              <span className='text-black font-bold'> {formatMoney(total)}</span></p>
          }
        </div>
      </div>
      <Formik
        initialValues={{ date: selectDate }}
        onSubmit={(values) =>
          handleSubmit(values)
        }
      >
        {() => {

          return (
            <Form className='mt-2 mb-2 '>
              <div className=" grid grid-cols-3 gap-5">

                <label htmlFor="id" className='p-3 text-bold text-gray-800 text-lg text-right'>Filtar Ventas:</label>
                <Field
                  id="date" type="date" name="date"
                  className="block w-full p-3 bg-gray-100 text-lg text-center"
                />

                <input
                  type="submit" value='Filtar Ventas'
                  className=" w-full bg-blue-800 hover:bg-blue-600 cursor-pointer p-3 text-white uppercase font-bold text-lg"
                />

              </div>

              {mensaje !== '' && <Alerta>{mensaje}</Alerta>/*Mensaje si la fecha no es válida*/}

            </Form>
          )
        }}
      </Formik>
      {total ?
        <table className="w-full mt-5 table-auto shadow bg-white">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Código</th>
              <th className="p-2">Hora</th>
              <th className="p-2">Total</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="">
            {auxSales.map((sale) =>
              <Element
                key={sale.id}
                sale={sale}
              />
            )}
          </tbody>
        </table>
        :
        <Alerta>No Hay Ventas Registradas en esta fecha</Alerta>
      }

    </>
  )
}

export default Sales