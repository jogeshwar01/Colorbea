import React from "react";
import { withStyles } from "@material-ui/styles";

const styles = {
    main: {
        backgroundColor: "purple",
        border: "3px solid teal"
    },
    secondary: {
        backgroundColor: "pink",
        "& h1": {
            color: "white",
            "& span": {
                backgroundColor: "yellow"
            }
        }
    }
};

function MiniPalette(props) {
    const { classes } = props;      //as this is a function component,its just props rather than this.props
    console.log(classes);

    return (
        <div className={classes.main}>
            <h1>Mini Palette</h1>
            <section className={classes.secondary}>
                <h1>
                    Mini Palette <span>ajskhd</span>
                </h1>
                <span>ajskhd</span>
            </section>
        </div>
    );
}

export default withStyles(styles)(MiniPalette);