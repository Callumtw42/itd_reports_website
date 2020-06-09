import './style.scss';

import AppBar from '@material-ui/core/AppBar';
import React, { HTMLAttributes, ReactHTMLElement, ReactNode } from 'react';

export default function HeaderBar(props: { children: ReactNode }) {

    return <div className="HeaderBar"><AppBar >{props.children}</AppBar></div>

}
