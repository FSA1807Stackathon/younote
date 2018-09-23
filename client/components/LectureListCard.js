import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { Link } from 'react-router-dom'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
  },
});

const LectureListCard = props => {
  const { classes } = props;
  const { id, title } = props.lecture
  console.log("THIS IS PROPS LECTURE", props.lecture)
  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem button component={ Link } to={`/lectures/${id}`}>
          <ListItemText primary={title} />
        </ListItem>
      </List>
    </div>
  );
}


LectureListCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LectureListCard);
