import React from "react";
import { useState } from "react";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

import { AddEntry } from "./AddEntry";
import { UpdateEntry } from "./UpdateEntry";
import { DeleteEntry } from "./DeleteEntry";
import Message from "./Message";

import ContactPhoneIcon from "@mui/icons-material/ContactPhone";

/**
 * Styling of Material UI
 */
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    minWidth: 300
  },
  child: {
    margin: theme.spacing(2)
  },
  button: {
    minWidth: 300
  }
}));

/**
 * Home page component. All heavy lifting
 * @returns
 */
export default function Home() {
  const classes = useStyles();
  const [searchText, setSearchText] = useState();
  const [addEntry, setAddEntry] = useState(false);
  const [updateEntry, setUpdateEntry] = useState(false);
  const [deleteEntry, setDeleteEntry] = useState(false);

  const [result, setResult] = useState(null);

  /**
   * Handle submission to retrieve result
   * @param {*} evt Event
   */
  const handleSubmit = async (evt) => {
    setResult(null);

    evt.preventDefault();
    let url = "http://127.0.0.1:8000/?name=" + searchText;

    let data = null;

    const response = await axios.get(url).catch(function (error) {
      data = {
        isError: true,
        error: error.message,
        message: ""
      };
    });

    console.log(response);

    if (data === null) {
      data = {
        isError: response.data.status !== 200,
        error: response.data.error !== null ? response.data.error + " : " + response.data.message : "",
        message: response.data.message
      };
    }

    setResult([data]);
  };

  /**
   * State Assignment once the operation is done
   */
  const unSet = () => {
    setAddEntry(false);
    setUpdateEntry(false);
    setDeleteEntry(false);
  };

  return (
    <Grid
      container
      spacing={4}
      className={classes.root}
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Grid item md={6} className={classes.child} style={{ marginTop: 100 }}>
        <Typography variant="h2" component="h2" color="primary">
          <ContactPhoneIcon sx={{ fontSize: 48 }} /> PhoneBook
        </Typography>
      </Grid>
      {!addEntry && !updateEntry && !deleteEntry && (
        <Grid item md={6} className={classes.child}>
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.pos} color="textSecondary">
                Search for a phone number?
              </Typography>
              <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  id="searchText"
                  placeholder="Name of the person"
                  onChange={(event) => {
                    setSearchText(event.target.value);
                  }}
                />
                <IconButton sx={{ p: "10px" }} aria-label="search" onClick={handleSubmit}>
                  <SearchIcon />
                </IconButton>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      )}
      <Grid item md={6} className={classes.child}>
        {result &&
          result.map((r, index) => {
            return <Message response={r} />;
          })}
      </Grid>
      {!addEntry && (
        <Grid item md={6} className={classes.child}>
          <Button
            variant="contained"
            onClick={() => {
              setAddEntry(!addEntry);
              setUpdateEntry(false);
              setDeleteEntry(false);
            }}
            style={{ minWidth: 300 }}
          >
            Add a new phone number
          </Button>
        </Grid>
      )}

      {addEntry && (
        <Grid item md={6} className={classes.child}>
          <AddEntry unset={unSet} />
        </Grid>
      )}

      {!updateEntry && (
        <Grid item md={6} className={classes.child}>
          <Button
            variant="contained"
            onClick={() => {
              setUpdateEntry(!updateEntry);
              setAddEntry(false);
              setDeleteEntry(false);
            }}
            style={{ minWidth: 300 }}
          >
            Update an existing number
          </Button>
        </Grid>
      )}
      {updateEntry && (
        <Grid item md={6} className={classes.child}>
          <UpdateEntry unset={unSet} />
        </Grid>
      )}

      {!deleteEntry && (
        <Grid item md={6} className={classes.child}>
          <Button
            variant="contained"
            onClick={() => {
              setDeleteEntry(!deleteEntry);
              setAddEntry(false);
              setUpdateEntry(false);
            }}
            style={{ minWidth: 300 }}
          >
            Delete a phone number
          </Button>
        </Grid>
      )}
      {deleteEntry && (
        <Grid item md={6} className={classes.child}>
          <DeleteEntry unset={unSet} />
        </Grid>
      )}
    </Grid>
  );
}
