import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
} from "@mui/material";
import {
  ListAlt as ListIcon,
  Today as TodayIcon,
  Star as StarIcon,
  DateRange as DateRangeIcon,
  Person as PersonIcon,
  Add as AddIcon,
  Info as InfoIcon,
} from "@mui/icons-material";

function Sidebar({ tasks = [] }) {
  const menuItems = [
    { text: "All Tasks", icon: <ListIcon />, count: tasks.length || 11 },
    { text: "Today", icon: <TodayIcon />, count: 5 },
    { text: "Important", icon: <StarIcon />, count: 3 },
    { text: "Planned", icon: <DateRangeIcon />, count: 7 },
    { text: "Assigned to me", icon: <PersonIcon />, count: 2 },
  ];

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 360 : 0;

  return (
    <Box
      sx={{
        height: "100%",
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
        p: 2,
      }}
    >
      {/* Profile Section */}
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 2,
          mb: 2,
          textAlign: "center",
        }}
      >
        <Avatar
          src="/path-to-profile-image.jpg"
          sx={{
            width: 80,
            height: 80,
            margin: "0 auto",
            mb: 1,
            border: (theme) => `4px solid ${theme.palette.background.default}`,
          }}
        />
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 500,
            color: "text.primary",
          }}
        >
          Hey, Abhinav
        </Typography>
      </Box>

      {/* Menu Items */}
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: 2,
          mb: 2,
          overflow: "hidden",
        }}
      >
        <List sx={{ p: 0 }}>
          {menuItems.map((item, index) => (
            <ListItem
              key={item.text}
              button
              sx={{
                py: 1.5,
                px: 2,
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: index === 1 ? "success.main" : "text.secondary",
                  minWidth: 35,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  "& .MuiListItemText-primary": {
                    color: index === 1 ? "text.primary" : "text.primary",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Add List Button */}
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: 2,
          mb: 2,
        }}
      >
        <ListItem
          button
          sx={{
            py: 1.5,
            px: 2,
          }}
        >
          <ListItemIcon sx={{ color: "#757575", minWidth: 35 }}>
            <AddIcon />
          </ListItemIcon>
          <ListItemText
            primary="Add list"
            sx={{
              "& .MuiListItemText-primary": {
                color: "#2c2c2c",
                fontSize: "0.95rem",
                fontWeight: 500,
              },
            }}
          />
        </ListItem>
      </Box>

      {/* Stats Card */}
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 2,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{ color: "text.primary", fontWeight: 500 }}
          >
            Today Tasks
          </Typography>
          <InfoIcon sx={{ fontSize: 18, color: "text.secondary" }} />
        </Box>

        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: 600,
            color: "text.primary",
          }}
        >
          {totalTasks}
        </Typography>

        {/* Donut Chart */}
        <Box sx={{ width: "100%", mb: 2 }}>
          <Box
            sx={{
              position: "relative",
              width: 150,
              height: 150,
              margin: "0 auto",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background: `conic-gradient(
                  #2E7D32 0deg,
                  #2E7D32 ${progress}deg,
                  #4CAF50 ${progress}deg,
                  #4CAF50 360deg
                )`,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: "15%",
                left: "15%",
                right: "15%",
                bottom: "15%",
                borderRadius: "50%",
                bgcolor: "background.paper",
              }}
            />
          </Box>
        </Box>

        {/* Legend */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "#4CAF50",
              }}
            />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Pending
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "#2E7D32",
              }}
            />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Done
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Sidebar;
