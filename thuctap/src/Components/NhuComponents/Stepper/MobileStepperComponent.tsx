import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
interface MobileStepperComponentProps {
    variant?: 'dots' | 'progress' | 'text'
    steps: number
    position?: 'bottom'
    | 'static'
    | 'top'
}
const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        flexGrow: 1,
    },
});

const MobileStepperComponent: React.FC<MobileStepperComponentProps> = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <MobileStepper
            variant={props.variant || 'progress'}
            steps={props.steps}
            position={props.position || 'static'}
            activeStep={activeStep}
            className={classes.root}
            nextButton={
                <Button size="small" onClick={handleNext} disabled={activeStep === props.steps - 1}>
                    Next
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
            }
            backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                    Back
                </Button>
            }
        />
    );
}
export default MobileStepperComponent;