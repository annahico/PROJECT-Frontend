import DeleteIcon from '@mui/icons-material/Delete';
import { CardContent, IconButton, Card as MuiCard, Typography } from '@mui/material';

// Card Component
export const Card = ({ name, description, clickFunction }) => {
  return (
    <MuiCard sx={{ margin: 1, cursor: 'pointer' }} onClick={clickFunction}>
      <CardContent>
        <Typography variant="h6" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </MuiCard>
  );
};

// UserCard Component
export const UserCard = ({ firstName, lastName, email, isDeletable, onDelete }) => {
  return (
    <MuiCard sx={{ margin: 1, padding: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {firstName} {lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {email}
        </Typography>
        {isDeletable && (
          <IconButton
            aria-label="delete"
            onClick={(event) => {
              event.stopPropagation(); // Prevent triggering card's onClick
              onDelete();
            }}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </CardContent>
    </MuiCard>
  );
};

// ServiceCard Component
export const ServiceCard = ({ service, appointmentDate, onDelete }) => {
  return (
    <MuiCard sx={{ margin: 1, padding: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {service}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {appointmentDate}
        </Typography>
        <IconButton
          aria-label="delete"
          onClick={(event) => {
            event.stopPropagation(); // Prevent triggering card's onClick
            onDelete();
          }}
        >
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </MuiCard>
  );
};
