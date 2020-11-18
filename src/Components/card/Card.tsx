import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Button, TextField, Popper } from '@material-ui/core';
import News from '../../model/News';
import Reminder from '../../model/Reminder';
import NewsService from '../../services/news.service';
import ReminderSchdeule from '../../model/ReminderSchdeule';
import NewsApiModel from '../../model/NewsApiModel';
import NewsReminder from '../../model/NewsReminder';
import { Alert } from '@material-ui/lab';
const useStyles = makeStyles(theme => ({
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
  paper1: {
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
  image: {
    width: 128,
    height: 150,
  },
  img: {
    width: 128,
    height: 128,
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));
export default function Card(props: any) {
  const classes = useStyles();
  const [reminder, setReminder] = useState('');
  const [displayReminder, setdisplayReminder] = useState(false);
  const [alertText, setAlertText] = useState('');

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setdisplayReminder(false);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleSave = (e: any, currentNews: any) => {
    e.preventDefault();
    if (reminder !== '') {
      // console.info(reminder);
      setdisplayReminder(false);      
      handleReadLaterOnClick(e, currentNews);
    }
  };

  const OnChangeDateTime = (e: any) => {
    e.preventDefault();
    if (e.target.name === "reminder") {
      setReminder(e.target.value);
    }

  }
  console.info(localStorage.getItem("token"));


  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;
  // const newService = new NewsService();
  // console.info(props.currentNews);
  // console.info(props.user);
  let user = props.user;


  const createReminder = (e: any, newsId: number, schedule: string) => {
    e.preventDefault();
    setReminder('');
    setAlertText('');
    var reminderSchObj = new ReminderSchdeule(newsId, schedule);
    var listRem: ReminderSchdeule[] = [];
    listRem.push(reminderSchObj);
    var reminderObj = new Reminder(user.userId, user.email, listRem);
    // console.info(reminderObj);
    var newsApi = new NewsService().createReminder(reminderObj);
    newsApi.then((data1) => {
      if (data1.status !== undefined && data1.status !== 201 && data1.status !== 200) {
        setAlertText(data1.statusText);
      }
      else {
        window.location.replace('/readnow');
      }
    });
  }

  // let displayDescription: Boolean = true;
  const handleReadLaterOnClick = (e: any, currentNews: News) => {
    e.preventDefault();
    setAlertText('');
    var newsObj = new NewsApiModel(0, currentNews.title, currentNews.content, currentNews.publishedAt, currentNews.url, currentNews.urlToImage, new NewsReminder(null));
    var newsApi = new NewsService().createNews(newsObj, false);
    newsApi.then((data1) => {
      // console.info(data1);
      if (data1.status !== undefined && data1.status !== 201 && data1.status !== 200) {
        setAlertText(data1.statusText);
        handleClick(e);
      }
      else {
        handleClick(e);
        if (reminder !== '') {
          createReminder(e, data1, reminder);
        }
        else {
          window.location.replace('/readnow');
        }

      }
    });
  }

  // let newsList: News[] = [];
  if (props !== undefined) {
    let prop = props.currentNews;
    // newsList =
    //     prop.map((element: News) => {
    //         // <div>element</div>
    //         if (element !== undefined) {
    let currentNews = prop;


    // let displayAlert=false;
    return <div className={classes.root} style={{ paddingBottom: 5 }}>
      <Paper className={classes.paper} elevation={7}>

        <Grid container spacing={1}>
          {alertText === '' ? null :
            <Grid item xs={12}>
              <Alert severity="error">
                {alertText}
          </Alert>
            </Grid>
          }
          <Grid item>
            {/* <ButtonBase className={classes.image}> */}
            <img className={classes.img} alt="complex" src={currentNews.urlToImage} />
            {/* </ButtonBase> */}
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={0}>
              <Typography variant="body2" gutterBottom>
                {currentNews.title}
              </Typography>

              <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  <Button variant="outlined" style={{ color: "red", float: "left" }} onClick={(e) => { handleClick(e) }}>READ LATER</Button>
                  {/* handleReadLaterOnClick(e, currentNews)  */}
                  <Popper id={id} open={open} anchorEl={anchorEl}
                    // placement="top"
                    style={{width:"80%",position:"relative"}}
                    disablePortal={false}
                    modifiers={{
                      flip: {
                        enabled: true,
                      },
                      preventOverflow: {
                        enabled: true,
                        boundariesElement: 'window',
                      },
                      arrow: {
                        enabled: true,
                        // element: arrowRef,
                      },
                    }}>
                    <div className={classes.paper1}>
                      <Grid container spacing={1}>
                        <Grid item>
                          <Typography>
                            Do you want to add reminder to the news?
                            </Typography>
                        </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item>
                            <Button variant="outlined" style={{ color: "red", float: "left" }} onClick={(e) => { setdisplayReminder(true); }}>Yes</Button>
                          </Grid>
                          <Grid item>
                            <Button variant="outlined" style={{ color: "red", float: "left" }} onClick={(e) => { setdisplayReminder(false); setReminder(''); handleReadLaterOnClick(e, currentNews); }}>No</Button>
                          </Grid>
                          <Grid item>
                            <Button variant="outlined" style={{ color: "red", float: "left" }} onClick={(e) => { setdisplayReminder(false); setReminder(''); handleClick(e);}}>Cancel</Button>
                          </Grid>
                        </Grid>
                        {displayReminder ? <Grid container><Grid item>
                          <Typography variant="body2" style={{ cursor: 'pointer' }}>

                            <TextField
                              id="datetime-local"
                              label="Reminder Schedule"
                              type="datetime-local"
                              name="reminder"
                              style={{width:190}}
                              // value={reminder}
                              defaultValue={reminder}//"2017-05-24T10:30"
                              onChange={OnChangeDateTime}
                              className={classes.textField}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                            
                          </Typography>
                        </Grid> <Grid item><Button variant="outlined" style={{ color: "red", float: "left" }} onClick={(e) => { handleSave(e, currentNews) }}>Save</Button></Grid></Grid> : null}

                        
                    </div>
                  </Popper>
                </Typography>
              </Grid>
            </Grid>

          </Grid>
        </Grid>
      </Paper>
    </div>;

  }
  else {
    return <div> "News Card component not working!!"</div>;

  }
  //         });
  // }

  // return <div className={classes.flexContainer}>{newsList}</div>;
}