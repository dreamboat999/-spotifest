import React, { useEffect } from 'react';
import { Model, AppState, DispatchProps } from "../redux/types";
import { connect } from "react-redux";
import { createStyles, CssBaseline, MuiThemeProvider, Theme } from "@material-ui/core";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import AppBarView from "./parts/AppBarView";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import deepOrange from "@material-ui/core/colors/deepOrange";
import indigo from "@material-ui/core/colors/indigo";
import { setLoggedIn, setLoggedOff } from "../redux/actions";
import 'react-circular-progressbar/dist/styles.css';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			padding: theme.spacing(0, 4, 0, 4),
			justifyContent: 'center',
			alignItems: 'center',
			width: '100%'
		},
		progressBar: {
			position: 'fixed',
			top: '50%',
			left: '50%',
			marginTop: '-50px',
			marginLeft: '-50px'
		},
	}),
);

interface StoreProps {
	model: Model;
}

type Props = DispatchProps & StoreProps;

export const authEndpoint = 'https://accounts.spotify.com/authorize';

const clientId = '***REMOVED***';
const redirectUri = 'http://localhost:3000';
const scopes = [
	'user-read-private',
	'user-top-read',
	'user-read-email',
	'user-read-playback-state'
];


const LoginScreen: React.FC<Props> = (props: Props) => {

	useEffect(() => {
		props.dispatch(setLoggedOff());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const loaderOn = props.model.loaderOn;
	const muiTheme = createMuiTheme({
		palette: {
			primary: {
				light: indigo[300],
				main: indigo[500],
				dark: indigo[700]
			},
			secondary: {
				light: deepOrange[300],
				main: deepOrange[500],
				dark: deepOrange[700]
			},
			type: props.model.thememode
		}
	});

	const classes = useStyles();

	return (
		//<SplashScreen>
		<MuiThemeProvider theme={muiTheme}>
			<CssBaseline />
			<AppBarView />
			<div className={classes.root}>
				<a href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token`}
					onClick={() => props.dispatch(setLoggedIn())}>
					Login to Spotify to check your recommended festivals!!!
				</a>
			</div>

			<div hidden={!loaderOn} className={classes.progressBar}>
				<CircularProgress size={100} thickness={3} disableShrink color={'secondary'} />
			</div>

		</MuiThemeProvider>
		//</SplashScreen>
	);
};

const mapStateToProps = (state: AppState) => ({
	model: state.model
});

const mapDispatchToProps = (dispatch: any) => {
	return {
		dispatch
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginScreen);
