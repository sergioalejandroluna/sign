import React from 'react'
import NotFound from '../img/404.png';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.error(error);
    console.error(info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h1>Algo salio mal</h1>
          <img src={NotFound} alt="404" className='' />
        </div>
      )
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
