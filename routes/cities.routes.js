import { useContext, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { useNavigate } from "react-router-dom";

const NewSkillPage = () => {
  const navigate = useNavigate();
  const { token } = useContext(SessionContext);

  const [skillName, setSkillName] = useState("");
  const [username, setUsername] = useState(""); // Changed from "user" to "username"
  const [city, setCity] = useState("");
  const [error, setError] = useState(null); // Added state for error messages

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Clear previous errors

    try {
      const [userResponse, cityResponse] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/api/users?username=${username}`),
        fetch(`${import.meta.env.VITE_API_URL}/api/cities?city=${city}`)
      ]);

      if (!userResponse.ok) throw new Error("User not found");
      
      let cityData;
      if (cityResponse.ok) {
        cityData = await cityResponse.json();
      } else {
        // City not found, so create it
        const cityCreateResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/cities`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Optional if needed for authentication
          },
          body: JSON.stringify({ name: city }),
        });

        if (!cityCreateResponse.ok) throw new Error("Failed to create city");
        cityData = await cityCreateResponse.json();
      }

      const userData = await userResponse.json();

      if (!userData?._id || !cityData?._id) {
        setError("Invalid user or city.");
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/skills`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          skill: skillName,
          user: userData._id,
          city: cityData._id,
        }),
      });

      if (response.status === 201) {
        navigate("/skills");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to add skill.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <h1>New Skill</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Skill Name
          <input
            type="text"
            required
            value={skillName}
            onChange={(event) => setSkillName(event.target.value)}
          />
        </label>
        <label>
          Username
          <input
            type="text"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label>
          City
          <input
            type="text"
            required
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </label>
        <button type="submit">Add Skill</button>
      </form>
    </>
  );
};

export default NewSkillPage;
