import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { useEffect } from 'react';
import { fetchCustomers } from './asyncActions/customer';

function App() {
  // Меняем состояние
  const dispatch = useDispatch()
  // Получаем состояние
  const cash = useSelector(state => state.cash.cash)
  const customers = useSelector(state => state.customers.customers)


  function addCash(cash) {
    dispatch({type: 'ADD_CASH', payload: cash})
  }

  function getCash(cash) {
    dispatch({type: 'GET_CASH', payload: cash})
  }

  function addCustomer(name) {
    const customer = {
      name: name,
      id: Date.now()
    }
    dispatch({type: 'ADD_CUSTOMER', payload: customer})
  }

  function removeCustomer(name) {
    dispatch({type: 'REMOVE_CUSTOMERS', payload: name})
  }


  // function fetchCustomers(){
  //     fetch('https://jsonplaceholder.typicode.com/users')
  //       .then(response => response.json())
  //       .then(json => dispatch({type: 'ADD_MANY_CUSTOMERS', payload: json}))
  // }

  
  return (
    <div className="App">
      <h1>{cash}</h1>
      <button onClick={ ()=>addCash( +prompt() ) }>Пополнить счет</button>
      <button onClick={ ()=>getCash( +prompt() ) }>Снять со счета</button>
      <button onClick={ ()=>addCustomer( prompt() ) }>Добавить клиента</button>
      <button onClick={ ()=>removeCustomer( prompt() ) }>Удалить клиента</button>

      {/* два варианта запроса на сервер */}
      {/* <button onClick={ ()=>fetchCustomers() }>Получить клиентов из базы</button> */}
      <button onClick={ ()=> dispatch( fetchCustomers() ) }>Получить клиентов из базы</button>

      {
        customers.length > 0 
        ?
        <div>
          {
            customers.map((customer)=>
              <div key={customer.id}>
                <h2>{customer.name}</h2>
              </div>
            )
          }
        </div>
        :
        <div>
          <h1>Клиенты отсутствуют!</h1>
        </div>
      }

    </div>
  );
}

export default App;
