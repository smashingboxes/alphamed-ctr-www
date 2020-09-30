import React, {useState, useEffect} from 'react';
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
import CloseIcon from '@material-ui/icons/Close';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './style.css';

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

const AdverseDraggableTable = ({ items, onItemRemove, onItemChange }) => {

  const [adverseItems, setAdverseItems] = useState([]);

  useEffect(() => {
    if(items){
      setAdverseItems(items);
    }
  }, [items])

  const onDragEnd = (result) => {

    if (!result.destination) {
      return;
    }

    const items = reorder(
      adverseItems,
      result.source.index,
      result.destination.index
    );

    setAdverseItems(items);
  }

  return (
    <div style = {{ marginBottom: "50px", marginTop: "10px" }}>
       <Table>
          <TableHead style = {{ backgroundColor: "rgba(88, 40, 95, 0.6)" }}>
            <TableRow className = "table-row">
              <TableCell className = "t-header">Name</TableCell>
              <TableCell className = "t-header">NC/NA</TableCell>
              <TableCell className = "t-header">1</TableCell>
              <TableCell className = "t-header">2</TableCell>
              <TableCell className = "t-header">3</TableCell>
              <TableCell className = "t-header">4</TableCell>
              <TableCell className = "t-header">5</TableCell>
              <TableCell className = "t-header">All Grades</TableCell>
              <TableCell className = "t-header">N</TableCell>
              <TableCell className = "t-header">Provide Table?</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody component={DroppableComponent(onDragEnd)}>
            {adverseItems.map((item, index) => (
              <TableRow
                component={DraggableComponent(item.id, index)}
                key={item.id}
              >
                <TableCell scope='col'><DragIndicatorIcon /> <span>{item.name}</span></TableCell>
                <TableCell scope='col'><input type = "number" name = "nc_na" onChange = { (e) => onItemChange(item.id, e.target)} value = {item.nc_na} style = {{width: 32}} /></TableCell>
                <TableCell scope='col'><input type = "number" name = "field_1" onChange = { (e) => onItemChange(item.id, e.target)} value = {item.field_1} style = {{width: 32}} /></TableCell>
                <TableCell scope='col'><input type = "number" name = "field_2" onChange = { (e) => onItemChange(item.id, e.target)} value = {item.field_2} style = {{width: 32}} /></TableCell>
                <TableCell scope='col'><input type = "number" name = "field_3" onChange = { (e) => onItemChange(item.id, e.target)} value = {item.field_3} style = {{width: 32}} /></TableCell>
                <TableCell scope='col'><input type = "number" name = "field_4" onChange = { (e) => onItemChange(item.id, e.target)} value = {item.field_4} style = {{width: 32}} /></TableCell>
                <TableCell scope='col'><input type = "number" name = "field_5" onChange = { (e) => onItemChange(item.id, e.target)} value = {item.field_5} style = {{width: 32}} /></TableCell>
            <TableCell scope='col'>{item.all_grades}</TableCell>
            <TableCell scope='col'>{item.field_n}</TableCell>
                <TableCell scope='col'><input name = "isProvideTable" onChange = { (e) => onItemChange(item.id, e.target)} type = "checkbox" style = {{width: 32}} checked={item.isProvideTable}/></TableCell>
                <TableCell>
                  <IconButton
                    color='primary'
                    aria-label='add to shopping cart'
                    onClick={() => onItemRemove(item.id) }
                  >
                    <CloseIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </div>
  );
};

export default AdverseDraggableTable;
