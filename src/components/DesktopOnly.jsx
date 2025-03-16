import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import '../styles/desktopOnly.css';

const DesktopOnly = ({children}) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 1024);
        }

        // Check on initial load
        checkScreenSize();

        // Add event listener for window resize
        window.addEventListener('resize', checkScreenSize);

        // Clean up event listener
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    if (isMobile) {
        return (
        <div className="desktop-only-message">
            <div className="desktop-only-content">
            <h2 className="desktop-only-heading">Desktop Only</h2>
            <p className="desktop-only-text">
                This application is optimized for desktop use only.
            </p>
            <p className="desktop-only-text">
                Please access this application on a device with a screen width of at least 1024px.
            </p>
            </div>
        </div>
        );
    }

    return <>{children}</>;
};

DesktopOnly.propTypes = {
    children: PropTypes.node.isRequired
};

export default DesktopOnly;
