import React, { Component } from 'react';
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
  Paper,
  Checkbox,
  IconButton
} from '@material-ui/core';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import EditIcon from '@material-ui/icons/Edit';

import { AuthorTableContainer } from './co-author-table.styles';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  ...draggableStyle,

  ...(isDragging && {
    background: 'rgb(235,235,235)'
  })
});

const DraggableComponent = (id, index) => (props) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <TableRow
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
          {...props}
        >
          {props.children}
        </TableRow>
      )}
    </Draggable>
  );
};

const DroppableComponent = (onDragEnd) => (props) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={'1'} direction='vertical'>
        {(provided) => {
          return (
            <TableBody
              ref={provided.innerRef}
              {...provided.droppableProps}
              {...props}
            >
              {props.children}
              {provided.placeholder}
            </TableBody>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

class CoAuthorTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };

    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    const { ctrResult } = this.props;

    if (ctrResult === null) return;
    if (ctrResult.length === 0) return;

    const { coauthors } = ctrResult[0];

    return this.setState({
      items: coauthors
    });
  }

  onDragEnd(result) {
    let { coAuthorArray } = this.props;

    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState(
      {
        items
      },
      () => {
        coAuthorArray = this.state.items.slice(0);
      }
    );
  }

  render() {
    const { handleOpen } = this.props;

    return (
      <AuthorTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell>Author(s)</TableCell>
              <TableCell>PI?</TableCell>
              <TableCell>CA?</TableCell>
              <TableCell>Edit?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody component={DroppableComponent(this.onDragEnd)}>
            {this.state.items.map((item, index) => (
              <TableRow
                component={DraggableComponent(item.id, index)}
                key={item.id}
              >
                <TableCell scope='row'>{index + 1}</TableCell>
                <TableCell>{item.first_name + ' ' + item.last_name}</TableCell>
                <TableCell>
                  {item.pi ? (
                    <Checkbox
                      disabled
                      checked
                      inputProps={{ 'aria-label': 'disabled checkbox' }}
                    />
                  ) : (
                    <Checkbox
                      disabled
                      inputProps={{ 'aria-label': 'disabled checked checkbox' }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  {item.ca ? (
                    <Checkbox
                      disabled
                      checked
                      inputProps={{ 'aria-label': 'disabled checkbox' }}
                    />
                  ) : (
                    <Checkbox
                      disabled
                      inputProps={{ 'aria-label': 'disabled checked checkbox' }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    color='primary'
                    aria-label='add to shopping cart'
                    onClick={() => handleOpen(item)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AuthorTableContainer>
    );
  }
}

export default CoAuthorTable;
