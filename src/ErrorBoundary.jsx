// mostly code from reactjs.org/docs/error-boundaries.html
import { Component } from "react";
import { Link } from "@tanstack/react-router";

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Ah, não!</h2>
          <p>
            Ocorreu um erro com esta listagem. <Link to="/">Clique aqui</Link>{" "}
            para voltar à página inicial.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
