import { useState } from 'react';
import './App.css';

function App() {
  const [todo, setTodo] = useState(JSON.parse(window.localStorage.getItem("todos")) || [])
  return (
    <>

    <h1 className='heading'>To Do List</h1>
    
    <input
    className='todoInput'
    onKeyPress={(e) =>{
      if(e.code === "Enter"){

        let newTodo = {
          id: new Date().getTime(),
          content: e.target.value,
          isCompleted: false
        }

        setTodo([newTodo, ...todo])

        window.localStorage.setItem("todos", JSON.stringify([newTodo, ...todo]))

                e.target.value = ""

      }
    }}
    
    placeholder={"Malumot kiriting..."}/>

    <ul>
      {
        todo.map(item =>{
          return(
            <li 
            className='items'
              style={{textDecoration: item.isCompleted ? "line-through" : "none"}}
            key={item.id}>


              {/* //! CHECKBOX COMPLETED */}
              <input 
              defaultChecked={item.isCompleted}
              
              onChange={(e) => {
                const todoId = e.target.dataset.id;
                const findTodo = todo.find(i => i.id === Number(todoId));
                findTodo.isCompleted = !findTodo.isCompleted
                setTodo([...todo]);

                window.localStorage.setItem("todos", JSON.stringify([...todo]))
              }}


              data-id = {item.id}
              type={"checkbox"}/>

              {item.content}


              <div className='wrap-btns'>


                {/* //! EDIT BUTTON */}
                <button onClick={(e) =>{
                  let newValue = prompt("ToDo ni o'zgartiring", item.content)

                  setTodo((item) =>{
                    return item.map((el) =>{
                      if (el.id === item.id) {
                        el.content = newValue
                      }
                      return el
                    })
                  })
                  window.localStorage.setItem("todos", JSON.stringify(newValue))
                }}


                >Edit</button>


                {/* //! DELETE BUTTON */}
                <button onClick={(e) =>{
                  let filteredTodo = todo.filter(i => i.id !== Number(item.id));

                  setTodo(filteredTodo)

                  window.localStorage.setItem("todos", JSON.stringify(filteredTodo))

                }}>Delete</button>
              </div>

            </li>
          )
        })
      }
    </ul>

    </>
  );
}

export default App;
