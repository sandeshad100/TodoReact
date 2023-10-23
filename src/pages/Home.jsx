import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { server } from "../main";
import toast from "react-hot-toast";
import TodoItem from "../components/TodoItem";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTask] = useState([]);

  const updateHandler = (id) => {
    // toast.success(id);
    try {
      const { data } = axios.put(
        `${server}/task/${id}`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const deleteHandler = (id) => {
    // toast.error(id);
    try {
      const { data } = axios.put(
        `${server}/task/${id}`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/task/new`,
        { title, description },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setTitle("");
      setDescription("");
      toast.success(data.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/task/my`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.tasks);
        setTask(res.data.tasks);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, []);
  return (
    <>
      <Header />
      <div className="container">
        <div className="login">
          <section>
            <form onSubmit={submitHandler}>
              <h2>Add Task</h2>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              <button type="submit">Add Task</button>
            </form>
          </section>
        </div>
        <section className="todosContainer">
          {tasks.map((i) => (
            <TodoItem
              key={i._id}
              title={i.title}
              description={i.description}
              isCompleted={i.isCompleted}
              updateHandler={updateHandler}
              deleteHandler={deleteHandler}
              id={i._id}
            />
          ))}
        </section>
      </div>
    </>
  );
};

export default Home;
