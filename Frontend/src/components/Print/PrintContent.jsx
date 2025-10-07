import React from 'react';

const PrintContent = React.forwardRef((props, ref) => (
    <div ref={ref}>
        <h1>Printable Content</h1>
        <p>This content will be printed when the button is clicked.</p>
    </div>
));
export default PrintContent;