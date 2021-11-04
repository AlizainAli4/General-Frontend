// import React, { useEffect, useState } from "react";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActions } from '@mui/material';
import './posts.css';
import Grid from '@mui/material/Grid';


const Posts = ({refresh, setRefresh}) => {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    getPosts();
  }, [refresh]);

  const getPosts = async () => {
    const resp = await fetch(
      'https://my-app.alizainamirali.workers.dev/posts', {method: 'GET'}
    );
    const postsResp = await resp.json();
    setPosts(postsResp);
    setRefresh(false);
  };
  
  return (
    <Grid container spacing={2} style = {{display: "flex"}, {margin: 10}}>
        {posts.map((post) => (
            <Card key = {post.id} sx={{ width: 290 }} className="event-card">
                <CardMedia
                    component="img"
                    height="140"
                    image={post.picture}
                    alt={post.picture}
                />
                <Typography gutterBottom variant="h5" component="div" style = {{margin: 5}}>
                    {post.title}
                </Typography>
                <CardContent >
                    <Typography variant="body2" color="textSecondary" component="span" className="card-description" style = {{height: '56px'}}>
                    {post.content}
                    </Typography>
                </CardContent>
                <CardActions>
                <Typography variant="body2" color="primary">
                    {post.username}
                </Typography>
                </CardActions>
            </Card>
        ))}
    </Grid>
  );
};

export default Posts;