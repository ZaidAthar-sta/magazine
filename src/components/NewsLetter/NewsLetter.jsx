import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "") return;

    // Simulate API call or logic
    console.log(`Subscribed with: ${email}`);
    setSubmitted(true);
    setEmail("");
  };

  return (
    <>
      <div className="newsletter-container py-4" style={styles.newsLetterContainer}>
        <div className="container text-center" style={styles.container}>
          <h2 style={styles.title}>Subscribe to our Newsletter</h2>
          <p style={styles.description}>
            Get the latest updates, news, and exclusive offers delivered
            straight to your inbox.
          </p>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
            <button type="submit" style={styles.button}>
              Subscribe
            </button>
          </form>
          {submitted && (
            <p style={styles.success}>Thank you for subscribing!</p>
          )}
        </div>
      </div>
    </>
  );
};

// Basic inline styles
const styles = {
  newsLetterContainer: {
    backgroundColor: "#f9f9f9",
  },
  container: {
    padding: "2rem",
    maxWidth: "700px",
    // margin: '0 auto',
    // textAlign: 'center',
    // border: '1px solid #ddd',
    borderRadius: "8px",
  },
  title: {
    marginBottom: "1rem",
    fontSize: "20px",
    fontWeight: "500",
  },
  description: {
    marginBottom: "1.5rem",
    color: "#555",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "80%",
    minWidth: "200px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "0px",
  },
  success: {
    marginTop: "1rem",
    color: "green",
    fontWeight: "bold",
  },
};

export default NewsLetter;
