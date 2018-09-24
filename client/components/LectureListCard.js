import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Delete from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom'
import {connect} from 'react-redux';
import {deleteLecture} from '../store/courses';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: theme.palette.background.paper,
  },
});

class LectureListCard extends React.Component{

  render(){
    const props = this.props;
    const { classes } = props;
    const { id, title } = props.lecture;
    return (
      <div className={classes.root}>
        <List component="nav" className="lecture-row">
          <ListItem button component={ Link } to={`/lectures/${id}`}>
            <ListItemText primary={title} />
          </ListItem>

          <Delete onClick={() => this.props.deleteLecture(props.lecture)} />
        </List>
      </div>
    );
  }
}

LectureListCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapState = null;

const mapDispatch = (dispatch) => {
  return {
    deleteLecture: (lecture) => dispatch(deleteLecture(lecture))
  }
}

export default withStyles(styles)(
  connect(mapState, mapDispatch)(LectureListCard)
)
