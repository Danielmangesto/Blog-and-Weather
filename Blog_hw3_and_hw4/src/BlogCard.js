import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const BlogCard = (props) => {
  const { id, title, content, image_path, published } = props;

  return (
     <Link to={`/Posts/${id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia sx={{ height: 140 }} id={id} image={image_path} title={title} published={published} />
        <CardContent sx={{ height: 150 }}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {content}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
          <Button size="small">Like</Button>
        </CardActions>
      </Card>
    </Link>
  );
};

export default BlogCard;
