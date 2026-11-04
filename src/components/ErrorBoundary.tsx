import { Component, type ReactNode, type ErrorInfo } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6 select-none">
          <div className="max-w-md w-full bg-neutral-900/90 border border-white/10 rounded-3xl p-8 text-center shadow-2xl backdrop-blur-xl">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
              <AlertTriangle size={32} />
            </div>

            <h1 className="text-2xl font-bold tracking-tight mb-2">
              Something went wrong
            </h1>
            <p className="text-sm text-neutral-400 mb-4 leading-relaxed">
              An unexpected error occurred while rendering this page.
            </p>

            {this.state.error && (
              <div className="mb-6 p-4 rounded-2xl bg-black/60 border border-red-500/20 text-left overflow-auto max-h-44 text-xs font-mono">
                <div className="text-red-400 font-bold mb-1">
                  {this.state.error.name}: {this.state.error.message}
                </div>
                {this.state.error.stack && (
                  <pre className="text-[11px] text-neutral-500 whitespace-pre-wrap leading-tight">
                    {this.state.error.stack.split('\n').slice(0, 5).join('\n')}
                  </pre>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={this.handleReload}
                style={{ color: '#000000' }}
                className="px-5 py-3 rounded-full bg-white font-bold text-xs tracking-wider uppercase hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <RotateCcw size={14} />
                <span>Reload Page</span>
              </button>

              <button
                type="button"
                onClick={this.handleHome}
                className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 border border-white/10"
              >
                <Home size={14} />
                <span>Go to Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

