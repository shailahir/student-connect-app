import { ArrowForward, Message, School } from "@mui/icons-material";
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
import { indigo } from "@mui/material/colors";

const MessageStats = () => {
  const { messagesApi } = useContext(AppContext);
  const [data, setData] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    messagesApi
      ?.getAllMessages()
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
    navigate("/messages");
  };

  return (
    <Card sx={{ background: indigo[100] }}>
      <CardHeader title="Messages"></CardHeader>
      <CardContent>
        {loading && <LinearProgress />}
        <List>
          <ListItem>
            <ListItemIcon>
              <Message />
            </ListItemIcon>
            <ListItemText
              primary="Total # of messages"
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
export default MessageStats;
