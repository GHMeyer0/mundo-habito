// pages/GoalsPage.tsx
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Container, IconButton, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import { useState } from "react";
import useGoalsStore from "../hooks/useGoalsStore";

type Props = {}

const GoalsPage = (props: Props) => {
  const { addGoal, removeGoal, goals } = useGoalsStore();
  const [newGoal, setNewGoal] = useState('');

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Lista de Metas
      </Typography>

      <Box display="flex" gap={2} mb={2}>
        <TextField
          variant="outlined"
          label="Nova Task"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (!newGoal.trim()) return;
              addGoal(newGoal.trim());
              setNewGoal('');
            }
          }}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            if (!newGoal.trim()) return;
            addGoal(newGoal.trim());
            setNewGoal('');
          }}
        >
          Adicionar
        </Button>
      </Box>

      <List>
        {goals.map((task) => (
          <ListItem
            key={task.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeGoal(task.id)}
              >
                <DeleteIcon color="error" />
              </IconButton>
            }
          >
            <ListItemText primary={task.text} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default GoalsPage;
