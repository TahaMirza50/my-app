import { useEffect, useState } from "react";
import "./component.css";

export default function Profile() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      // .then((response) => {
      const jsonResponse = await response.json();
      setData(jsonResponse);
      // })
    };

    getData();
  }, []);

  async function handleDelete(id) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "DELETE",
      }
    );
    const jsonResponse = await response.json();
    setData(data.filter((d) => d.id !== id));
    console.log(jsonResponse);
  }

  async function handleCreate() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: body,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const jsonResponse = await response.json();
    console.log(jsonResponse);
  }

  return (
    <div>
      <label> Title </label>
      <input
        maxLength={20}
        type="text"
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <label>Body</label>
      <input
        maxLength={50}
        type="text"
        onChange={(e) => setBody(e.target.value)}
      ></input>
      <button onClick={handleCreate}>Submit</button>
      <table>
          <thead>
            <tr>
              <th className="id">Id</th>
              <th className="title">Title</th>
              <th className="delete">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data) => {
              return (
                <tr key={data.id}>
                  <td>ID: {data.id}</td>
                  <td className="title-parah">title: {data.title}</td>
                  <td>
                    <button onClick={() => handleDelete(data.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
      </table>
    </div>
  );
}
