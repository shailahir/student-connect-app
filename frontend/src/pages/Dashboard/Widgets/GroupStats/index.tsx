import { ArrowForward, Diversity2 } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import AppContext from "../../../../AppContext";
import { useNavigate } from "react-router-dom";
import { blue } from "@mui/material/colors";

const GroupStats = () => {
  const { groupsApi } = useContext(AppContext);
  const [data, setData] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    groupsApi
      ?.getAllGroups()
      .then((res) => {
        setData(res?.data);
      })
      .catch(() => {
        setData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onClickView = () => {
    navigate("/groups");
  };

  return (
    <Card sx={{ background: blue[100] }}>
      <CardHeader title="Groups"></CardHeader>
      <CardContent>
        {loading && <LinearProgress />}
        <List>
          <ListItem>
            <ListItemIcon>
              <Diversity2 />
            </ListItemIcon>
            <ListItemText
              primary="Total # of groups"
              secondary={data ? data?.length : "0"}
            />
          </ListItem>
        </List>
      </CardContent>
      <CardActions>
        <Button
          endIcon={<ArrowForward />}
          variant="outlined"
          onClick={onClickView}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
};
export default GroupStats;
