import React, { useReducer, useState } from "react";
import axios from "axios";
import { Button, TextField, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Message from "./Message";


/**
 * Component to delete an entry
 * @param {*} props: Props for the DOM 
 * @returns 
 */
export function DeleteEntry(props) {
  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1)
    },
    root: {
      padding: theme.spacing(3, 2)
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 400
    }
  }));

  const [formInput, setFormInput] = useReducer((state, newState) => ({ ...state, ...newState }), {
    username: ""
  });

  const [result, setResult] = useState(null);

  /**
   * Handle submission
   * @param {*} evt Event triggered
   */
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let data = { ...formInput };

    setResult(null);

    evt.preventDefault();

    let url = "http://127.0.0.1:8000/delete";
    const headers = {
      "Content-Type": "application/json"
    };

    let outputData = null;

    const response = await axios.delete((url = url), {
      headers: headers,
      data: data
    }).catch(function (error) {
      outputData = {
        isError: true,
        error: error.message,
        message: ""
      };
    });

    if (outputData === null) {
      outputData = {
        isError: response.data.status !== 200,
        error: response.data.error !== null ? response.data.error + " : " + response.data.message : "",
        message: response.data.message
      };
    }

    setResult([outputData]);

  };

  /**
   * Handle input change in the textboxes
   * @param {*} evt Event
   */
  const handleInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };

  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} direction="column" justifyContent="flex-start" alignItems="center" className={classes.root}>
        <Grid item>
          <TextField
            label="Username"
            id="del_user"
            name="username"
            defaultValue={formInput.username}
            className={classes.textField}
            helperText="Valid Username is alpha numeric"
            onChange={handleInput}
          />
        </Grid>
        <Grid item>
          <Button id="del_btn" type="submit" variant="contained" color="primary" className={classes.button}>
            Delete
          </Button>
          <Button
            id="gosearch_btn"
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() => props.unset()}
            style ={{marginLeft: 10}}
          >
            Search Again
          </Button>
        </Grid>
        <Grid item md={6}>
          {result &&
            result.map((r, index) => {
              return <Message key={index} response={r} />;
            })}
        </Grid>
      </Grid>
    </form>
  );
}
