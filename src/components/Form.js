import axios from 'axios'
import { useEffect, useState } from 'react'

const baseURL = "https://jsonplaceholder.typicode.com/users";

const endpoint = "https://discord.com/api/webhooks/872169896262393946/FXHySMbfqWVqAum7PS_2m8VGY0KW9Q7gqy8ZAsx0Bhbv-1oX7U2SUoVw3GhBAMorV9Kv";

function Form() {
  const [addressee, setAddressee] = useState([]);
  const [topic, setTopic] = useState("");
  const [selected, setSelected] = useState("");
  const [contents, setContents] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setAddressee(response.data);
    });
  }, []);

  if (!addressee) return [];

  function changeAddressee(e) {
    setSelected(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(!isLoading)

   axios.post(endpoint, {
    content: "Destinatário: " + selected +", Assunto: " + topic + ", Conteúdo: " + contents,
   })
    .then(setTimeout( setIsLoading(!isLoading) , 3000))
     .catch((err) => {
       console.error(err);
     });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Assunto:</label>
          <input
            type="text"
            name="assunto"
            id="assunto"
            onChange={(e) => setTopic(e.target.value)}
          />
        <label>Destinatário:</label>
        <select
          onChange={changeAddressee}
          name="destinatario"
          id="destinatario"
          defaultValue="selecione"
        >
          <option disabled value="selecione" key="selecione">
            Selecione
          </option>
          {addressee.map((user) => {
            return <option 
              key={user.id} 
              value={user.name}
            >
              Nome: {user.name} | Email: {user.email}
            </option>
          })}
        </select>

        <label>Texto: </label>
        <textarea name="text" onChange={(e) => setContents(e.target.value)}/>

        <button 
          onClick={handleSubmit}
          disabled={topic.length < 5 || !selected || contents.length < 20}
        >
          Enviar
        </button>
      </form>

      <div>
        {isLoading ? (<h1>Carregando ...</h1>) : (<h1>Não Carregando</h1>)}
      </div>
    </div>
  )
}

export default Form
