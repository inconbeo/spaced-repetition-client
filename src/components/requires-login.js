import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

export default () => Component => {
    function RequiresLogin(props) {
        const {authenticating, loggedIn, error, ...passThroughProps} = props;
        const styles = {'textAlign' : 'center'}
        if (authenticating) {
            return <div className='loading' style = {styles}>
            <ClipLoader
              color={'#0D8FA7'}
              loading={authenticating} 
            />
          </div>
        } else if (!loggedIn || error) {
            return <Redirect to="/" />;
        }

        return <Component {...passThroughProps} />;
    }

    const displayName = Component.displayName || Component.name || 'Component';
    RequiresLogin.displayName = `RequiresLogin(${displayName})`;

    const mapStateToProps = (state, props) => ({
        authenticating: state.auth.loading,
        loggedIn: state.auth.currentUser !== null,
        error: state.auth.error
    });

    return connect(mapStateToProps)(RequiresLogin);
};
