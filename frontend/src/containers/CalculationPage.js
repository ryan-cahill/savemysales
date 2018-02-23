import React, {Component} from 'react'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import {CircularProgress} from 'material-ui/Progress'
import {calculatePrimeFactors} from '../utilities/DataFetcherUtility'
import { createMuiTheme } from 'material-ui/styles'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#FF4081',
            main: '#F50057',
            dark: '#C51162',
            contrastText: '#fff'
        },
        secondary: {
            light: '#2196F3',
            main: '#1976D2',
            dark: '#0D47A1',
            contrastText: '#000'
        }
    }
});

class AdminPage extends Component {
    state = {
        isProcessing: false,
        value1: '',
        value2: '',
        factors: null
    };

    componentDidMount() {

    }

    submitChanges(e) {
        this.setState({
            isProcessing: true
        });
        calculatePrimeFactors().then(data => {
            this.setState({
                isProcessing: false
            });
            if (data.body && data.body.values) {
                this.setState({
                    value1: data.body.values[0],
                    value2: data.body.values[1],
                    factors: data.body.factors
                });
            }
        });
    }

    renderResults() {
        return (
            <div style={{paddingTop: 16}}>
                <Typography variant="body1" component="h4" style={{paddingTop: 16}}>
                    {(this.state.value1 && this.state.value2) ? `Added values: ` + this.state.value1.toString() + ', ' + this.state.value2.toString() : ''}
                </Typography>
                <Typography variant="body1" component="h4" style={{paddingTop: 16}}>
                    {this.state.factors ? `Factors: ` + this.state.factors.toString() : ''}
                </Typography>
            </div>
        )
    }

    renderSpinner() {
        return (
            <div style={{paddingTop: 16}}>
                <Typography variant="body1" component="h4" style={{paddingTop: 16}}>
                    Please be patient, we haven't optimized yet.
                </Typography>
                <CircularProgress style={{paddingTop: 16}}/>
            </div>
        )
    }

    render() {
        return (
            <div style={{paddingTop: 16}}>
                <MuiThemeProvider theme={theme}>
                    <Paper elevation={4} style={{paddingTop: 16, paddingBottom: 32, width: '100%'}}>
                        <Typography variant="headline" component="h3">
                            {`Press the button to find the prime factors of two random numbers.`}
                        </Typography>
                        <div style={{paddingTop: 16}}>
                            <Button variant='raised' color='primary' onClick={(e) => this.submitChanges(e)}>calculate</Button>
                        </div>
                        {(this.state.isProcessing) ? this.renderSpinner() : this.renderResults()}
                    </Paper>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default AdminPage;