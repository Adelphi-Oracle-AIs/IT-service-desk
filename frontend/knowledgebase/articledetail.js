import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
  },
}));

const ArticleDetail = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      const response = await axios.get(`/api/kb/${id}`);
      setArticle(response.data);
    } catch (error) {
      console.error('Error fetching article:', error);
    }
  };

  if (!article) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="h4" gutterBottom>
          {article.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Category: {article.category}
        </Typography>
        <Typography variant="body1" paragraph>
          {article.content}
        </Typography>
        <Typography variant="caption">
          Last updated: {new Date(article.updated_at).toLocaleString()}
        </Typography>
      </Paper>
    </Container>
  );
};

export default ArticleDetail;
