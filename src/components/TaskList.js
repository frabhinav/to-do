import React, { useState } from "react";
import {
  Box,
  Checkbox,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Drawer,
  Card,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import {
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  NotificationsNoneOutlined as BellIcon,
  RotateLeftOutlined as RecycleIcon,
  CalendarTodayOutlined as CalendarIcon,
  GridView,
  ViewList,
} from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function TaskList({
  tasks,
  addTask,
  toggleTask,
  toggleImportant,
  updateTask,
  layoutMode,
  setLayoutMode,
}) {
  const [newTaskText, setNewTaskText] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      addTask({
        id: Date.now(),
        text: newTaskText,
        completed: false,
        important: false,
        dueDate: null,
      });
      setNewTaskText("");
    }
  };

  const handleTaskClick = (task, e) => {
    if (
      !e.target.closest(".MuiCheckbox-root") &&
      !e.target.closest(".star-button")
    ) {
      setSelectedTask(task);
      setDetailsOpen(true);
    }
  };

  // Separate tasks into active and completed
  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  const TaskItem = ({ task }) => (
    <ListItem
      onClick={(e) => handleTaskClick(task, e)}
      sx={{
        borderBottom: (theme) =>
          `1px solid ${
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.12)"
              : "#e0e0e0"
          }`,
        py: 1.5,
        "&:hover": {
          bgcolor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.08)" // Darker hover for dark theme
              : "#f6f8f6",
        },
        cursor: "pointer",
      }}
    >
      <ListItemIcon>
        <Checkbox
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          sx={{
            color: "#757575",
            "&.Mui-checked": {
              color: "#4CAF50",
            },
          }}
        />
      </ListItemIcon>
      <ListItemText
        primary={task.text}
        secondary={
          task.dueDate ? dayjs(task.dueDate).format("MM/DD/YYYY") : null
        }
        sx={{
          textDecoration: task.completed ? "line-through" : "none",
          color: task.completed ? "#757575" : "inherit",
          "& .MuiTypography-root": {
            fontSize: "0.95rem",
          },
        }}
      />
      <IconButton
        className="star-button"
        onClick={(e) => {
          e.stopPropagation();
          toggleImportant(task.id);
        }}
        sx={{
          color: task.important ? "#4CAF50" : "#757575",
        }}
      >
        {task.important ? <StarIcon /> : <StarBorderIcon />}
      </IconButton>
    </ListItem>
  );

  const TaskDetailsPanel = () => {
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);

    const handleDateChange = (newValue) => {
      if (selectedTask) {
        const updatedTask = {
          ...selectedTask,
          dueDate: newValue ? newValue.toISOString() : null,
        };
        updateTask(updatedTask);
        setIsCalendarVisible(false);
      }
    };

    return (
      <Drawer
        anchor="right"
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 300,
            p: 2,
          },
        }}
      >
        {selectedTask && (
          <Box sx={{ height: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Checkbox
                checked={selectedTask.completed}
                onChange={() => toggleTask(selectedTask.id)}
              />
              <Typography variant="body1">{selectedTask.text}</Typography>
            </Box>

            <List sx={{ p: 0 }}>
              <ListItem button onClick={() => toggleImportant(selectedTask.id)}>
                <ListItemIcon>
                  {selectedTask.important ? (
                    <StarIcon color="primary" />
                  ) : (
                    <StarBorderIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary="Mark as important" />
              </ListItem>

              <ListItem button>
                <ListItemIcon>
                  <BellIcon />
                </ListItemIcon>
                <ListItemText primary="Set Reminder" />
              </ListItem>

              <ListItem
                sx={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  p: 0,
                }}
              >
                <Box
                  onClick={() => setIsCalendarVisible(!isCalendarVisible)}
                  sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    p: 2,
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  <ListItemIcon>
                    <CalendarIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add due date" />
                </Box>

                {isCalendarVisible && (
                  <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        open={true}
                        value={
                          selectedTask.dueDate
                            ? dayjs(selectedTask.dueDate)
                            : null
                        }
                        onChange={handleDateChange}
                        onClose={() => setIsCalendarVisible(false)}
                        sx={{
                          width: "100%",
                          "& .MuiPickersLayout-root": {
                            bgcolor: "background.paper",
                            color: "text.primary",
                          },
                          "& .MuiTextField-root": { display: "none" },
                        }}
                      />
                    </LocalizationProvider>
                  </Box>
                )}
              </ListItem>

              <ListItem button>
                <ListItemIcon>
                  <RecycleIcon />
                </ListItemIcon>
                <ListItemText primary="Repeat" />
              </ListItem>
            </List>

            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Add note"
              variant="outlined"
              sx={{ mt: 2 }}
            />
          </Box>
        )}
      </Drawer>
    );
  };

  return (
    <Box sx={{ flex: 1, p: 3 }}>
      <Box
        component="form"
        onSubmit={handleAddTask}
        sx={{
          p: 2,
          mb: 3,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(76, 175, 80, 0.08)" // Dark mode green background
              : "#f0faf0", // Light mode green background
          borderRadius: 1,
        }}
      >
        <TextField
          fullWidth
          placeholder="Add A Task"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          variant="standard"
          sx={{
            mb: 2,
            "& .MuiInput-root": {
              "&:before, &:after": {
                display: "none",
              },
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton size="small" sx={{ color: "text.secondary" }}>
              <BellIcon />
            </IconButton>
            <IconButton size="small" sx={{ color: "text.secondary" }}>
              <CalendarIcon />
            </IconButton>
            <IconButton size="small" sx={{ color: "text.secondary" }}>
              <RecycleIcon />
            </IconButton>
          </Box>
          <Button
            variant="contained"
            type="submit"
            sx={{
              bgcolor: "#4CAF50",
              color: "white",
              "&:hover": {
                bgcolor: "#388E3C",
              },
              textTransform: "none",
              px: 3,
            }}
          >
            ADD TASK
          </Button>
        </Box>
      </Box>

      {/* Toggle between List and Card View */}
      <Box sx={{ mb: 2 }}>
        <IconButton
          onClick={() =>
            setLayoutMode((prev) => (prev === "list" ? "card" : "list"))
          }
        >
          {layoutMode === "list" ? <GridView /> : <ViewList />}
        </IconButton>
      </Box>

      {layoutMode === "list" ? (
        <List sx={{ mb: 4 }}>
          {activeTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </List>
      ) : (
        <Grid container spacing={2}>
          {activeTasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <Card
                sx={{
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  boxShadow: 2,
                  "&:hover": {
                    boxShadow: 4,
                  },
                }}
                onClick={(e) => handleTaskClick(task, e)}
              >
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Checkbox
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      sx={{
                        color: "#757575",
                        "&.Mui-checked": {
                          color: "#4CAF50",
                        },
                      }}
                    />
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                      {task.text}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {task.dueDate
                      ? dayjs(task.dueDate).format("MM/DD/YYYY")
                      : null}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton onClick={() => toggleImportant(task.id)}>
                    {task.important ? <StarIcon /> : <StarBorderIcon />}
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {completedTasks.length > 0 && (
        <>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#757575",
              fontWeight: 500,
              mb: 1,
            }}
          >
            Completed
          </Typography>
          <List>
            {completedTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </List>
        </>
      )}

      <TaskDetailsPanel />
    </Box>
  );
}

export default TaskList;
