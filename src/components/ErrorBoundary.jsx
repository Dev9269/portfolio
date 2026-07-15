import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] items-center justify-center px-5 py-28">
          <div className="mx-auto max-w-lg text-center">
            <div className="mb-6 text-6xl">⚠️</div>
            <h2 className="text-2xl font-semibold text-white">Something went wrong</h2>
            <p className="mt-3 text-text-secondary">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <Link
              to="/"
              onClick={() => this.setState({ hasError: false, error: null })}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-text-primary"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
