import NewsService from "../../services/news.service";
import React, { useState } from "react";
import { makeStyles, createStyles } from '@material-ui/styles';
import Card from "../card/Card";
import News from "../../model/News";
import { useHistory } from "react-router-dom";
// import CircularProgress from '@material-ui/core/CircularProgress';
// import { Button, Paper } from "@material-ui/core";
import RegisterApiModel from "../../model/RegisterApiModel";
import AuthService from "../../services/auth.service";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            marginTop: 80,
        },
        paper: {
            // padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 1200,
          },
        flexContainer:
        {
            display: "flex",
            flexDirection: "column",
            justifyContent: "left",
            marginBottom: 300,
            paddingLeft: 5,
            paddingRight: 5
        }
    }))


export default function Dashboard(props: any) {
    const newsService = new NewsService();
    const history = useHistory();
    const classes = useStyles();
    const [news, setNews] = useState<News[]>([]);
    const [filterModel, setFilterModel] = useState();
    const [user,setUser]=useState<RegisterApiModel>();
    const token = localStorage.getItem("token");

    if (props.filtermodel !== undefined && props.filtermodel !== filterModel) {
        setFilterModel(props.filtermodel)
    }
    if(user===undefined||user===null)
    {
        var newsApi=new AuthService().getUser();
        newsApi.then((data1) => {
          if (data1.status !== undefined && data1.status !== 201 && data1.status !== 200) {
            console.error(data1.statusText);
          }
          else
          {
            setUser(data1);
          }
        });
    }
    // console.info(props);
    if (token === undefined || token === null) {
        history.push('/login');
    }
    let newsDataList: any;
    // useEffect(()=>{
    newsService.getNews("everything", props.filtermodel)//.getAllNews()
        .then((res) => {    
            // console.info(res);
            return res;            
        }).then((data) => {
           
            let newsData = [...data];
            // setNews({ "news": "newsData" });
            if (news.length === 0 && newsData.length > 0) {
                setNews(newsData);
                // console.info(localStorage.getItem("token"));
            }
        });

        
    // console.info(news.length);
    newsDataList = news.map((element => {        
        return <Card key={Math.random()} currentNews={element} user={user}>No News found for this user</Card>
    }));
    if(news.length===0)
        {
            newsDataList.push(<h3 key={Math.random()}>No news fetched</h3>);
            // newsDataList.push(<CircularProgress style={{margin:80}} key={Math.random()} disableShrink />);            
        }
    
    // console.info(news);

    //<Card newsList={news}></Card>
    return (<div className={classes.root}>
                <div className={classes.flexContainer}>
                    {/* <div style={{paddingBottom:5}}>
                        <Paper className={classes.paper} elevation={0}>
                            <Button variant="contained" color="secondary" style={{float:"left"}} href="/createnews">Create News</Button>
                        </Paper>
                    </div> */}
                    <div>
                        {newsDataList}
                    </div>
                </div>
            </div>
                
                );
};



