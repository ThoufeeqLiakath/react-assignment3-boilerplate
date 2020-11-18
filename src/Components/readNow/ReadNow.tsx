import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import NewsService from '../../services/news.service';
import DisplayCard from '../displayCard/DisplayCard';
import {useHistory} from "react-router-dom";
import NewsApiModel from '../../model/NewsApiModel';
import RegisterApiModel from '../../model/RegisterApiModel';
import AuthService from '../../services/auth.service';
import ReminderSchdeule from '../../model/ReminderSchdeule';

const useStyles = makeStyles(() => 
createStyles({
    marginForReadNow:
                {
                    marginTop:80,
                    marginLeft:5,
                    marginRight:5,
                    marginBottom: 300,
                }
}))

export default function ReadNow()
{
    const history=useHistory();    
    const classes=useStyles();
    const [readNow,setReadNow]=useState<NewsApiModel[]>([]);
    const [user,setUser]=useState<RegisterApiModel>();
    const [allReminders,setAllReminders]=useState<ReminderSchdeule[]>([]);
    const newsService=new NewsService();    
    const token=localStorage.getItem("token");
    
    if(token===undefined||token===null)
    {
        history.push('/login');
    }    
    if(user===undefined||user===null||user)
    {
        var newsApi=new AuthService().getUser();
        newsApi.then((data1) => {
          if (data1.status !== undefined && data1.status !== 201 && data1.status !== 200) {
            console.error(data1.statusText);
          }
          else
          {
            if(user===undefined)
            {
              setUser(data1);
            }            
          }
        });
    }
    let getReadNow =newsService.getAllNews();
    let getAllReminders=newsService.getAllReminders();
    getReadNow.then((data)=>{
      //console.log(data);
        if(readNow.length===0&&data.length>0)
       {
            setReadNow(data);
            //console.info(readNow);
            getAllReminders.then((data1)=>{
              //console.log(data1);
              // console.info('b',allReminders.length===0);
              if(allReminders.length===0&&data1.length>0)
              {
                  //  console.info('a',data1);
                   setAllReminders(data1);
                   
              } 
            });
       }     
              
    });

    let list=readNow.map((element:any)=>{
      // console.info(element);
      // console.info(allReminders);      
      var currentRem=allReminders.find(x=>x.newsId===element.newsId);
      // console.log(currentRem);
      if(currentRem===undefined)
      {
        return <DisplayCard readNow={element} user={user}></DisplayCard>
      }
      else{
        return <DisplayCard readNow={element} user={user} reminder={currentRem}></DisplayCard>
      }
        
    })
    
    return <div className={classes.marginForReadNow}>
            {list}
    </div>;
}