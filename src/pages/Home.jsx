import React from "react";
import { useDispatch } from "react-redux";
import { setNameTrainerGlobal } from "../store/slices/nameTrainer.slice";
import "./styles/Home.css";

const Home = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameTrainer = e.target.nameTrainer.value;
    dispatch(setNameTrainerGlobal(nameTrainer));
  };

  return (
    <main className="home-block">
      <section className="home-section">
        <div className="container-home-img">
          <div className="home-img">
            <img src="/images/pokedex.png" alt="" />
          </div>
        </div>
        <div className="home-info">
          <h2>Hello trainer!</h2>
          <p>Give me your name to start!</p>
          <form onSubmit={handleSubmit} className="home-start">
            <input
              id="nameTrainer"
              type="text"
              placeholder="your name..."
              required
            />
            <button>Go</button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Home;
