import * as React from 'react';
import { useEffect, useState } from 'react';

const TemplateComponent = (props: TemplateComponentProps) => {
    const [] = useState();
    useEffect(() => {}, []);

    return (
        <div>
            <h1 className="display-1 text-center mt-5">Bottomtext Lmao</h1>
        </div>
    );
}

interface TemplateComponentProps {}

export default TemplateComponent;