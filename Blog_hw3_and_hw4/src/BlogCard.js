import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const BlogCard = (props) => {
  const { id, title, content, image_path, published } = props;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
          sx={{ height: 140 }}
          id={id}
          title={title}
          published={published}
      />
        <CardMedia
        component="img"
        alt="Blog Image"
        height="140"
        image={image_path}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
        <Button size="small">Like</Button>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
