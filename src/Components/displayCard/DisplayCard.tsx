import React, { useState } from 'react';
import { makeStyles, createStyles, Link, Grid, Button, TextField } from '@material-ui/core';
import NewsService from '../../services/news.service';
import Reminder from '../../model/Reminder';
import ReminderSchdeule from '../../model/ReminderSchdeule';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles(theme =>
  createStyles(
    {
      root: {
        flexGrow: 5,
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 250,
      },
      paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 1200,
      },
      flexContainer:
      {
        display: "flex",
        flexDirection: "column",
        justifyContent: "left",
        marginBottom: 200,
        paddingLeft: 75,
        paddingRight: 75
      },
      flexContainerCard:
      {
        display: "flex",
        flexDirection: "row",
        justifyContent: "left",
        margin: 5,
        padding: 20
      },
      imageSize:
      {
        width: 200,
        height: 130
      }
    }
  ));
export default function DisplayCard(props: any) {
  const classes = useStyles();
  const readNow = props.readNow;
  const [reminder, setReminder] = useState("");
  const [displayDeleteNews,setDisplayDeleteNews]=useState(false);
  //const [displayReminder, setDisplayReminder] = useState(false);
  let user = props.user;
  //  console.info(localStorage.getItem("token"));

  if (reminder === '') {
    if (props.reminder !== undefined && props.reminder.schedule !== undefined) {
      // console.info(props.reminder.schedule.replace(':00Z',''));
      setReminder(props.reminder.schedule.replace(':00Z', ''));
      setDisplayDeleteNews(true);
    }
  }

  let handleUpdateReminder = (event: any, currentNews: any) => {
    event.preventDefault();
    // console.log(currentNews);
    var remSced = new ReminderSchdeule(currentNews.newsId, reminder);
    var newsApi = new NewsService().updateReminder(remSced);
    newsApi.then((data1) => {
      if (data1.status !== undefined && data1.status !== 201 && data1.status !== 200) {
        console.error(data1.statusText);
        if (data1.status === 404) {
          var reminderSchObj = new ReminderSchdeule(currentNews.newsId, reminder);
          var listRem: ReminderSchdeule[] = [];
          listRem.push(reminderSchObj);
          var reminderObj = new Reminder(user.userId, user.email, listRem);

          var newsApi = new NewsService().createReminder(reminderObj);
          newsApi.then((data1) => {
            if (data1.status !== undefined && data1.status !== 201 && data1.status !== 200) {
              console.error(data1.statusText);
            }
            else {
              window.location.replace('/readnow');
            }
          });
        }
      }
      else {
        window.location.replace('/readnow');
      }
    });

  }

  let handleDeleteReminder = (event: any, currentNews: any) => {
    // console.log(currentNews);
    var newsApi = new NewsService().deleteReminder(currentNews.newsId);
    newsApi.then((data1) => {
      if (data1.status !== undefined && data1.status !== 201 && data1.status !== 200) {
        console.error(data1.statusText);
      }
      else {
        console.log('deleted', data1);
        window.location.replace('/readnow');
      }
    });

  }

  let handleDeleteNews = (event: any, currentNews: any) => {
    event.preventDefault();
    // console.log(currentNews);
    var newsApi = new NewsService().deleteNews(currentNews.newsId);
    newsApi.then((data1) => {
      if (data1.status !== undefined && data1.status !== 201 && data1.status !== 200) {
        console.error(data1.statusText);
      }
      else {
        console.log('deleted', data1);
        if (data1) {
          window.location.replace('/readnow');
        }

      }
    });

  }

  const OnChangeDateTime = (e: any) => {
    e.preventDefault();
    if (e.target.name === "reminder") {
      setReminder(e.target.value);
    }

  }
  let prop = props.readNow;
  let currentNews = prop;
  // console.info('reminderValue',reminder);

  // console.info(props);
  console.info('remin', reminder);
  return <div className={classes.root} style={{ marginBottom: 5 }}>
    <Grid container style={{padding:5,border:"ridge",borderColor:"aliceblue"}}>    
    <Grid item xs={12}>

        <Button variant="outlined" color="secondary" style={{ float: "right" }} onClick={(e) => { handleDeleteNews(e, currentNews) }}><DeleteForeverIcon/></Button>
      </Grid>
      <Grid item xs={12}>
        {readNow.content}
      </Grid>
      <Grid item xs={12}>
        <Link style={{overflowWrap:"break-word"}} href={readNow.url} target="_blank">{readNow.url}</Link>
      </Grid>

      <Grid item xs={12}>

        <TextField
          id="datetime-local"
          label="Reminder Schedule"
          type="datetime-local"
          name="reminder"
          value={reminder}
          defaultValue={reminder}//"2017-05-24T10:30"
          onChange={OnChangeDateTime}
          className={classes.textField}
          style={{width:190}}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <Button variant="outlined" style={{ color: "red", float: "left" }} onClick={(e) => { handleUpdateReminder(e, currentNews) }}>Update Reminder</Button>
      </Grid>
      <Grid item xs={6}>
        {displayDeleteNews?<Button variant="outlined" style={{ color: "red", float: "left" }} onClick={(e) => { handleDeleteReminder(e, currentNews) }} >Delete Reminder</Button>:null}        
      </Grid>
      

    </Grid>          
  </div >;
}