import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Box,
  CssBaseline,
  IconButton,
  InputBase,
  Drawer,
  Collapse,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  GridView,
  ViewList,
} from "@mui/icons-material";
import Sidebar from "./components/Sidebar";
import TaskList from "./components/TaskList";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState([]); // Empty initial tasks array
  const [layoutMode, setLayoutMode] = useState("list"); // Default to list mode

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#4CAF50",
      },
      background: {
        default: darkMode ? "#121212" : "#f6f8f6",
        paper: darkMode ? "#1e1e1e" : "#ffffff",
      },
      text: {
        primary: darkMode ? "#ffffff" : "#2c2c2c",
        secondary: darkMode ? "#a0a0a0" : "#757575",
      },
      divider: darkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)",
    },
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: darkMode ? "#ffffff" : "inherit",
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: darkMode
                ? "rgba(255, 255, 255, 0.08)"
                : "#f6f8f6",
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiInputBase-root": {
              color: darkMode ? "#ffffff" : "inherit",
            },
          },
        },
      },
    },
  });

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleImportant = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, important: !task.important } : task
      )
    );
  };

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            bgcolor: "background.default",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1200,
              bgcolor: "background.paper",
              borderBottom: "1px solid",
              borderColor: "divider",
              px: 2,
              py: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Collapse in={searchOpen} orientation="horizontal">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    bgcolor: darkMode
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.05)",
                    borderRadius: 1,
                    px: 2,
                    py: 0.5,
                    mr: 1,
                  }}
                >
                  <InputBase
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{
                      width: 200,
                      color: "text.primary",
                      "& ::placeholder": {
                        color: "text.secondary",
                      },
                    }}
                    autoFocus
                  />
                </Box>
              </Collapse>

              <IconButton onClick={() => setSearchOpen(!searchOpen)}>
                <SearchIcon />
              </IconButton>

              <IconButton onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>

              <IconButton
                onClick={() =>
                  setLayoutMode((prev) => (prev === "list" ? "card" : "list"))
                }
              >
                {layoutMode === "list" ? <GridView /> : <ViewList />}
              </IconButton>
            </Box>
          </Box>

          {/* Sidebar Drawer */}
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              "& .MuiDrawer-paper": {
                width: 280,
                boxSizing: "border-box",
                bgcolor: "background.paper",
              },
            }}
          >
            <Box sx={{ mt: 8 }}>
              <Sidebar tasks={tasks} darkMode={darkMode} />
            </Box>
          </Drawer>

          {/* Main Content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              mt: 8,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <TaskList
              tasks={filteredTasks}
              addTask={addTask}
              toggleTask={toggleTask}
              toggleImportant={toggleImportant}
              updateTask={updateTask}
              layoutMode={layoutMode}
              setLayoutMode={setLayoutMode}
            />
          </Box>
        </Box>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
