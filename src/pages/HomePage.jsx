import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav.jsx";
import Button from "../components/Button.jsx";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <Button
          type="primary"
          onClick={() => {
            navigate("app");
          }}
        >
          Start Travelling
        </Button>
      </section>
    </main>
  );
}
