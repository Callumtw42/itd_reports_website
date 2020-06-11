import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Copyright() {
    return (<div className="copyright">
        <Typography variant="body2" color="textSecondary" >
            {'Copyright © '}
            <Link color="inherit" to="http://itdsoftware.com/">
                ITD Software
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    </div>
    );
}