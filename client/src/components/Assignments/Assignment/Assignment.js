import React from 'react';
// import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
// import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
// import DeleteIcon from '@material-ui/icons/Delete';
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
// import moment from 'moment';
// import { useDispatch } from 'react-redux';

// import { likeAssignment, deleteAssignment } from '../../../actions/assignments';
// import useStyles from './styles';

const Assignment = ({ assignment, setCurrentId }) => {
  // const dispatch = useDispatch();
  // const classes = useStyles();

  // return (
  //   <Card className={classes.card}>
  //     <CardMedia className={classes.media} image={assignment.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={assignment.title} />
  //     <div className={classes.overlay}>
  //       <Typography variant="h6">{assignment.creator}</Typography>
  //       <Typography variant="body2">{moment(assignment.createdAt).fromNow()}</Typography>
  //     </div>
  //     <div className={classes.overlay2}>
  //       <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(assignment._id)}><MoreHorizIcon fontSize="default" /></Button>
  //     </div>
  //     <div className={classes.details}>
  //       <Typography variant="body2" color="textSecondary" component="h2">{assignment.tags.map((tag) => `#${tag} `)}</Typography>
  //     </div>
  //     <Typography className={classes.title} gutterBottom variant="h5" component="h2">{assignment.title}</Typography>
  //     <CardContent>
  //       <Typography variant="body2" color="textSecondary" component="p">{assignment.message}</Typography>
  //     </CardContent>
  //     <CardActions className={classes.cardActions}>
  //       <Button size="small" color="primary" onClick={() => dispatch(likeAssignment(assignment._id))}><ThumbUpAltIcon fontSize="small" /> Like {assignment.likeCount} </Button>
  //       <Button size="small" color="primary" onClick={() => dispatch(deleteAssignment(assignment._id))}><DeleteIcon fontSize="small" /> Delete</Button>
  //     </CardActions>
  //   </Card>
  // );
  return (
    <>
      <h1>assignment</h1>
    </>
  )
};

export default Assignment;
