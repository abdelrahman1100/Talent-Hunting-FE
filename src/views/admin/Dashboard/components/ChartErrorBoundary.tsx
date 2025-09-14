import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
    children: ReactNode
    fallback?: ReactNode
}

interface State {
    hasError: boolean
    error?: Error
}

class ChartErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Chart Error Boundary caught an error:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback || (
                    <div className="text-center py-8">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                            <h4 className="text-lg font-semibold mb-2">
                                Chart Unavailable
                            </h4>
                            <p className="text-gray-600 mb-4">
                                The chart could not be loaded. Please try
                                refreshing the page.
                            </p>
                            {process.env.NODE_ENV === 'development' &&
                                this.state.error && (
                                    <details className="text-left text-xs text-gray-500">
                                        <summary className="cursor-pointer">
                                            Error Details
                                        </summary>
                                        <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto">
                                            {this.state.error.message}
                                        </pre>
                                    </details>
                                )}
                        </div>
                    </div>
                )
            )
        }

        return this.props.children
    }
}

export default ChartErrorBoundary
